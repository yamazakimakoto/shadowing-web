'use strict';

(function () {
  const AUTH_TOKEN_KEY  = 'shadowing_auth_token';
  const DEVICE_ID_KEY   = 'shadowing_device_id';
  const PACK_TOKENS_KEY = 'shadowing_pack_tokens';

  // ── デバイス ID（初回のみ生成し localStorage に永続保存）──
  function getDeviceId() {
    let id = localStorage.getItem(DEVICE_ID_KEY);
    if (!id) {
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      arr[6] = (arr[6] & 0x0f) | 0x40;
      arr[8] = (arr[8] & 0x3f) | 0x80;
      id = [...arr].map((b, i) =>
        ([4,6,8,10].includes(i) ? '-' : '') + b.toString(16).padStart(2, '0')
      ).join('');
      localStorage.setItem(DEVICE_ID_KEY, id);
    }
    return id;
  }

  // ── JWT をサーバー検証なしでローカルデコード（有効期限確認用）──
  function parseJwtLocally(token) {
    try {
      const [, p] = token.split('.');
      return JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/')));
    } catch { return null; }
  }

  function isExpiredLocally(token) {
    const p = parseJwtLocally(token);
    return !p || p.exp * 1000 < Date.now();
  }

  // ── ベースライセンス認証 ──
  async function activateLicense(key) {
    const deviceId = getDeviceId();
    const res  = await fetch('/api/activate', {
      method:      'POST',
      credentials: 'same-origin',  // Cookie受信
      headers:     { 'Content-Type': 'application/json' },
      body:        JSON.stringify({ key: key.trim().toUpperCase(), deviceId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || '認証に失敗しました');
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    return data;
  }

  // ── トークン検証（起動時）──
  // localStorage が消えていても、サーバー側 HttpOnly Cookie に JWT が残っていれば
  // 自動復元する（iOS Safari の ITP / 「すべてのCookieをブロック」対策）
  async function verifyToken() {
    const localToken = localStorage.getItem(AUTH_TOKEN_KEY);

    // 期限切れの明白なトークンはローカルでスキップ
    if (localToken && isExpiredLocally(localToken)) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }

    try {
      // tokenがlocalにあれば送る、なくてもCookie経由で復元できる
      const tokenForBody = localStorage.getItem(AUTH_TOKEN_KEY);
      const res = await fetch('/api/verify', {
        method:      'POST',
        credentials: 'same-origin',  // Cookie送信
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ token: tokenForBody || null })
      });
      if (!res.ok) {
        // サーバーエラー時はオフライン動作（localTokenが期限内なら許可）
        if (localToken && !isExpiredLocally(localToken)) {
          const p = parseJwtLocally(localToken);
          return p ? { valid: true, product: p.prod, offline: true } : null;
        }
        // トークンを即削除しない（一時的な401のリトライ余地を残す）
        return null;
      }
      const data = await res.json();
      // サーバーから返されたtoken/deviceIdをlocalStorageに復元保存
      // → 次回はCookie復元なしで起動できる
      if (data.token)    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      if (data.deviceId) localStorage.setItem(DEVICE_ID_KEY, data.deviceId);
      return data;
    } catch {
      // ネットワーク不通 → オフライン動作（localTokenが期限内なら許可）
      if (localToken && !isExpiredLocally(localToken)) {
        const p = parseJwtLocally(localToken);
        return p ? { valid: true, product: p.prod, offline: true } : null;
      }
      return null;
    }
  }

  // ── 追加パック認証 ──
  async function activatePack(key) {
    const token    = localStorage.getItem(AUTH_TOKEN_KEY);
    const deviceId = getDeviceId();
    const res  = await fetch('/api/pack/activate', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ key: key.trim().toUpperCase(), deviceId })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'パック認証に失敗しました');

    const tokens = getPackTokens();
    tokens[data.packId] = data.token;
    localStorage.setItem(PACK_TOKENS_KEY, JSON.stringify(tokens));
    return data;
  }

  // ── パックコンテンツ取得（サーバーから DL）──
  async function fetchPackContent(packId) {
    const tokens = getPackTokens();
    const pToken = tokens[packId];
    if (!pToken) throw new Error('このパックのライセンスが見つかりません');
    const res = await fetch(`/api/pack/${packId}`, {
      headers: { 'Authorization': `Bearer ${pToken}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'パック取得に失敗しました');
    return data;
  }

  function getPackTokens() {
    try { return JSON.parse(localStorage.getItem(PACK_TOKENS_KEY) || '{}'); }
    catch { return {}; }
  }

  function getAuthToken()   { return localStorage.getItem(AUTH_TOKEN_KEY); }
  function getLicenseInfo() {
    const t = localStorage.getItem(AUTH_TOKEN_KEY);
    return t ? parseJwtLocally(t) : null;
  }
  function logout() { localStorage.removeItem(AUTH_TOKEN_KEY); }

  window.ShadowingAuth = {
    activateLicense, verifyToken, activatePack,
    fetchPackContent, getDeviceId, getAuthToken,
    getLicenseInfo, logout
  };

  // ════════════════════════════════════════════════
  //  認証オーバーレイ UI
  // ════════════════════════════════════════════════

  function showAuthOverlay() {
    const ov = document.getElementById('auth-overlay');
    if (ov) {
      ov.classList.remove('hidden', 'fadeout');
      const inp = document.getElementById('license-key-input');
      if (inp) inp.focus();
    }
  }

  function hideAuthOverlay(info) {
    const ov = document.getElementById('auth-overlay');
    if (!ov) return;
    const succ = document.getElementById('auth-success');
    if (succ) {
      const left = info?.activationsLeft ?? '';
      succ.textContent = `✓ 認証完了！アプリを起動しています…`;
      succ.classList.remove('hidden');
    }
    ov.classList.add('fadeout');
    setTimeout(() => ov.classList.add('hidden'), 500);

    // ライセンス情報をヘッダーに反映
    if (info?.offline) {
      const offlineBadge = document.getElementById('offline-badge');
      if (offlineBadge) offlineBadge.classList.remove('hidden');
    }
  }

  // キー入力の自動フォーマット（SHAD-XXXX-XXXX-XXXX）
  function formatKeyInput(e) {
    const inp = e.target;
    let v = inp.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 16);
    const parts = [];
    if (v.length > 0)  parts.push(v.slice(0, 4));
    if (v.length > 4)  parts.push(v.slice(4, 8));
    if (v.length > 8)  parts.push(v.slice(8, 12));
    if (v.length > 12) parts.push(v.slice(12, 16));
    const formatted = parts.join('-');
    const pos = inp.selectionStart;
    inp.value = formatted;
    // カーソル位置補正
    const newPos = Math.min(pos + (formatted.length - inp.value.length + 1), formatted.length);
    try { inp.setSelectionRange(newPos, newPos); } catch { /* ignore */ }
  }

  // DOMContentLoaded 後に初期化
  document.addEventListener('DOMContentLoaded', () => {
    const inp        = document.getElementById('license-key-input');
    const btn        = document.getElementById('activate-btn');
    const errDiv     = document.getElementById('auth-error');
    const succDiv    = document.getElementById('auth-success');

    if (inp) {
      inp.addEventListener('input', formatKeyInput);
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter') btn?.click();
      });
    }

    if (btn) {
      btn.addEventListener('click', async () => {
        const key = inp?.value?.trim();
        if (!key || key.replace(/-/g, '').length < 12) {
          showAuthError('ライセンスキーを正しく入力してください（例: SHAD-XXXX-XXXX-XXXX）');
          inp?.classList.add('error');
          return;
        }
        inp?.classList.remove('error');
        clearAuthError();
        btn.disabled    = true;
        btn.textContent = '確認中…';
        try {
          const info = await activateLicense(key);
          hideAuthOverlay(info);
        } catch (err) {
          showAuthError(err.message);
          btn.disabled    = false;
          btn.textContent = '認証する';
          inp?.classList.add('error');
        }
      });
    }

    // 起動時の認証チェック
    (async () => {
      const result = await verifyToken();
      if (result?.valid) {
        hideAuthOverlay(result);
      } else {
        showAuthOverlay();
      }
    })();
  });

  function showAuthError(msg) {
    const d = document.getElementById('auth-error');
    if (d) { d.textContent = msg; d.classList.remove('hidden'); }
  }
  function clearAuthError() {
    const d = document.getElementById('auth-error');
    if (d) { d.textContent = ''; d.classList.add('hidden'); }
  }

  window.showAuthOverlay = showAuthOverlay;
  window.hideAuthOverlay = hideAuthOverlay;
})();
