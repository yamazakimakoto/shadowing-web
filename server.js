import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, copyFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATA_DIR           = process.env.DATA_DIR || join(__dirname, 'data');
const PACKS_DIR          = join(DATA_DIR, 'packs');
const BUNDLED_PACKS_DIR  = join(__dirname, 'packs');
const DB_FILE            = join(DATA_DIR, 'licenses.json');
const SEC_FILE           = join(DATA_DIR, '.jwt_secret');

if (!existsSync(DATA_DIR))  mkdirSync(DATA_DIR,  { recursive: true });
if (!existsSync(PACKS_DIR)) mkdirSync(PACKS_DIR, { recursive: true });

// ── バンドルされたパックを /data/packs/ に自動コピー ──
if (existsSync(BUNDLED_PACKS_DIR)) {
  try {
    const files = readdirSync(BUNDLED_PACKS_DIR).filter(f => f.endsWith('.json'));
    for (const f of files) {
      const dest = join(PACKS_DIR, f);
      if (!existsSync(dest)) {
        copyFileSync(join(BUNDLED_PACKS_DIR, f), dest);
        console.log(`✓ パックをシード: ${f}`);
      }
    }
  } catch (e) {
    console.warn('パックのシードに失敗:', e.message);
  }
}

// JWT シークレット（初回起動時に自動生成・保存）
let JWT_SECRET;
if (existsSync(SEC_FILE)) {
  JWT_SECRET = readFileSync(SEC_FILE, 'utf8').trim();
} else {
  JWT_SECRET = crypto.randomBytes(48).toString('base64');
  writeFileSync(SEC_FILE, JWT_SECRET, { mode: 0o600 });
  console.log('✓ JWTシークレットを生成しました');
}

// ── 管理者パスワード ──
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || null;

// ── DB helpers（JSON ファイルベース）──
function loadDB() {
  try { return JSON.parse(readFileSync(DB_FILE, 'utf8')); }
  catch { return { licenses: {} }; }
}
function saveDB(db) {
  writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
function hashKey(key) {
  return crypto.createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
}
function signToken(payload, expiresIn = '365d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
}

// ── キー生成（紛らわしい文字を除外: 0/O, 1/I/L）──
function genKey() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let k = 'SHAD';
  for (let g = 0; g < 3; g++) {
    k += '-';
    for (let c = 0; c < 4; c++) {
      k += chars[crypto.randomInt(chars.length)];
    }
  }
  return k;
}

// ── レート制限（IP 単位、1時間あたり 20回）──
const ipAttempts = new Map();
function checkRate(ip) {
  const now = Date.now(), win = 3_600_000, max = 20;
  const r = ipAttempts.get(ip) || { n: 0, reset: now + win };
  if (now > r.reset) { r.n = 0; r.reset = now + win; }
  r.n++;
  ipAttempts.set(ip, r);
  return r.n <= max;
}

// ── 管理者認証ミドルウェア ──
function requireAdmin(req, res, next) {
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'ADMIN_PASSWORD が設定されていません。Render.com の Environment Variables を設定してください。' });
  }
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const payload = token ? verifyJwt(token) : null;
  if (!payload?.isAdmin) {
    return res.status(401).json({ error: '管理者認証が必要です' });
  }
  next();
}

// ── Express ──
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// ───────────────────────────────────────────────
//  管理者 API
// ───────────────────────────────────────────────

// POST /admin/api/login
app.post('/admin/api/login', (req, res) => {
  if (!ADMIN_PASSWORD) {
    return res.status(503).json({ error: 'ADMIN_PASSWORD が未設定です' });
  }
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'パスワードが違います' });
  }
  const token = jwt.sign({ isAdmin: true }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

// GET /admin/api/licenses — ライセンス一覧
app.get('/admin/api/licenses', requireAdmin, (req, res) => {
  const db = loadDB();
  const { product } = req.query;
  const entries = Object.entries(db.licenses)
    .filter(([, v]) => !product || v.product === product)
    .sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt))
    .map(([kh, v]) => ({
      hash:            kh,
      hashShort:       kh.slice(0, 8),
      key:             v.key || null,
      product:         v.product,
      maxActivations:  v.maxActivations || 5,
      activationsUsed: Object.keys(v.activations || {}).length,
      createdAt:       v.createdAt,
      note:            v.note || '',
      devices:         Object.entries(v.activations || {}).map(([did, act]) => ({
        deviceIdShort: did.slice(0, 16) + '…',
        activatedAt:   act.activatedAt,
        lastSeenAt:    act.lastSeenAt
      }))
    }));

  // 統計
  const stats = {};
  for (const e of entries) {
    if (!stats[e.product]) stats[e.product] = { total: 0, activated: 0 };
    stats[e.product].total++;
    if (e.activationsUsed > 0) stats[e.product].activated++;
  }

  res.json({ licenses: entries, stats, total: entries.length });
});

// POST /admin/api/generate — ライセンス生成
app.post('/admin/api/generate', requireAdmin, (req, res) => {
  const { product, count = 1, note = '', maxActivations = 5 } = req.body || {};
  if (!product) return res.status(400).json({ error: 'product は必須です' });

  const db   = loadDB();
  const keys = [];
  const cnt  = Math.min(Math.max(1, parseInt(count) || 1), 100);
  const maxA = Math.min(Math.max(1, parseInt(maxActivations) || 5), 10);

  for (let i = 0; i < cnt; i++) {
    const key = genKey();
    const kh  = hashKey(key);
    db.licenses[kh] = {
      key,
      product,
      maxActivations: maxA,
      createdAt:      new Date().toISOString(),
      note:           note || '',
      activations:    {}
    };
    keys.push(key);
  }

  saveDB(db);
  res.json({ keys, count: keys.length, product, note, maxActivations: maxA });
});

// POST /admin/api/generate-bundle — バンドル一括生成
app.post('/admin/api/generate-bundle', requireAdmin, (req, res) => {
  const BUNDLES = {
    'bundle:travel_set':  ['base', 'pack:travel_vol1', 'pack:travel_vol2'],
    'bundle:toeic_set':   ['base', 'pack:toeic'],
    'bundle:jiji_set':    ['base', 'pack:jiji_vol1', 'pack:jiji_vol2'],
    'bundle:hotel_set':   ['base', 'pack:hotel'],
    'bundle:all':         ['base', 'pack:travel_vol1', 'pack:travel_vol2', 'pack:toeic', 'pack:jiji_vol1', 'pack:jiji_vol2', 'pack:hotel']
  };
  const { bundle, note = '', maxActivations = 5 } = req.body || {};
  const products = BUNDLES[bundle];
  if (!products) {
    return res.status(400).json({ error: `不明なバンドル: ${bundle}`, available: Object.keys(BUNDLES) });
  }

  const db   = loadDB();
  const maxA = Math.min(Math.max(1, parseInt(maxActivations) || 5), 10);
  const result = {};

  for (const product of products) {
    const key = genKey();
    const kh  = hashKey(key);
    db.licenses[kh] = {
      key,
      product,
      maxActivations: maxA,
      createdAt:      new Date().toISOString(),
      note:           note || '',
      activations:    {}
    };
    result[product] = key;
  }

  saveDB(db);
  res.json({ bundle, keys: result, note });
});

// POST /admin/api/revoke — 全デバイス認証取り消し
app.post('/admin/api/revoke', requireAdmin, (req, res) => {
  const { hash } = req.body || {};
  if (!hash) return res.status(400).json({ error: 'hash は必須です' });
  const db  = loadDB();
  const lic = db.licenses[hash];
  if (!lic) return res.status(404).json({ error: 'ライセンスが見つかりません' });
  const count = Object.keys(lic.activations || {}).length;
  lic.activations = {};
  db.licenses[hash] = lic;
  saveDB(db);
  res.json({ ok: true, revokedCount: count });
});

// POST /admin/api/revoke-device — 特定デバイス取り消し
app.post('/admin/api/revoke-device', requireAdmin, (req, res) => {
  const { hash, deviceIdShort } = req.body || {};
  if (!hash || !deviceIdShort) return res.status(400).json({ error: 'hash と deviceIdShort は必須です' });
  const db  = loadDB();
  const lic = db.licenses[hash];
  if (!lic) return res.status(404).json({ error: 'ライセンスが見つかりません' });
  // 前方一致で検索
  const fullId = Object.keys(lic.activations || {}).find(d => d.startsWith(deviceIdShort.replace('…', '')));
  if (!fullId) return res.status(404).json({ error: 'デバイスが見つかりません' });
  delete lic.activations[fullId];
  db.licenses[hash] = lic;
  saveDB(db);
  res.json({ ok: true });
});

// PATCH /admin/api/license — メモ更新
app.patch('/admin/api/license', requireAdmin, (req, res) => {
  const { hash, note } = req.body || {};
  if (!hash) return res.status(400).json({ error: 'hash は必須です' });
  const db  = loadDB();
  const lic = db.licenses[hash];
  if (!lic) return res.status(404).json({ error: 'ライセンスが見つかりません' });
  lic.note = (note || '').trim();
  db.licenses[hash] = lic;
  saveDB(db);
  res.json({ ok: true, note: lic.note });
});

// DELETE /admin/api/license — ライセンス削除
app.delete('/admin/api/license', requireAdmin, (req, res) => {
  const { hash } = req.body || {};
  if (!hash) return res.status(400).json({ error: 'hash は必須です' });
  const db = loadDB();
  if (!db.licenses[hash]) return res.status(404).json({ error: 'ライセンスが見つかりません' });
  delete db.licenses[hash];
  saveDB(db);
  res.json({ ok: true });
});

// GET /admin/api/backup — licenses.json をダウンロード
app.get('/admin/api/backup', requireAdmin, (req, res) => {
  const db   = loadDB();
  const date = new Date().toISOString().slice(0, 10);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename="licenses-backup-${date}.json"`);
  res.send(JSON.stringify(db, null, 2));
});

// POST /admin/api/restore — バックアップから復元（マージ）
app.post('/admin/api/restore', requireAdmin, (req, res) => {
  const body = req.body || {};
  const src  = body.licenses;
  if (!src || typeof src !== 'object') {
    return res.status(400).json({ error: 'バックアップデータの形式が正しくありません' });
  }
  const db     = loadDB();
  const before = Object.keys(db.licenses).length;
  let added = 0, skipped = 0;
  for (const [hash, lic] of Object.entries(src)) {
    if (!db.licenses[hash]) { db.licenses[hash] = lic; added++; }
    else skipped++;
  }
  saveDB(db);
  const after = Object.keys(db.licenses).length;
  res.json({ ok: true, before, added, skipped, after });
});

// GET /admin/api/packs — 利用可能パック一覧
app.get('/admin/api/packs', requireAdmin, (req, res) => {
  try {
    const files = existsSync(PACKS_DIR)
      ? readdirSync(PACKS_DIR).filter(f => f.endsWith('.json'))
      : [];
    const packs = files.map(f => {
      try {
        const data = JSON.parse(readFileSync(join(PACKS_DIR, f), 'utf8'));
        return { id: data.id, name: data.name, icon: data.icon, count: data.texts?.length || 0 };
      } catch { return { id: f.replace('.json', ''), name: f, icon: '📦', count: 0 }; }
    });
    res.json({ packs });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ── /admin にアクセス時、admin/index.html を返す ──
app.get('/admin', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'admin', 'index.html'));
});

// ───────────────────────────────────────────────
//  既存のユーザー向け API
// ───────────────────────────────────────────────

// POST /api/activate  — ベースライセンス認証
app.post('/api/activate', (req, res) => {
  const { key, deviceId } = req.body || {};
  if (!key || !deviceId)
    return res.status(400).json({ error: 'キーとデバイスIDが必要です' });
  if (!checkRate(req.ip))
    return res.status(429).json({ error: 'しばらく待ってから再試行してください' });

  const db  = loadDB();
  const kh  = hashKey(key);
  const lic = db.licenses[kh];

  if (!lic)
    return res.status(404).json({ error: 'ライセンスキーが見つかりません' });
  if (lic.product !== 'base')
    return res.status(400).json({ error: 'このキーはベースライセンスではありません' });

  const now  = new Date().toISOString();
  const acts = lic.activations || {};

  if (acts[deviceId]) {
    acts[deviceId].lastSeenAt = now;
  } else {
    const used = Object.keys(acts).length;
    const max  = lic.maxActivations || 5;
    if (used >= max) {
      return res.status(403).json({
        error: `このキーの使用上限（${max}台）に達しています。転売等でお困りの場合はサポートへご連絡ください。`,
        code: 'MAX_ACTIVATIONS'
      });
    }
    acts[deviceId] = { activatedAt: now, lastSeenAt: now };
  }

  lic.activations = acts;
  db.licenses[kh] = lic;
  saveDB(db);

  const used  = Object.keys(acts).length;
  const max   = lic.maxActivations || 5;
  const token = signToken({ kh, did: deviceId, prod: 'base' });

  res.json({ token, product: 'base', activationsUsed: used, activationsLeft: max - used });
});

// POST /api/verify  — JWT 検証（起動時・オンライン確認用）
app.post('/api/verify', (req, res) => {
  const { token, deviceId } = req.body || {};
  if (!token) return res.status(400).json({ error: 'トークンが必要です' });

  const payload = verifyJwt(token);
  if (!payload) return res.status(401).json({ error: 'トークンが無効または期限切れです' });
  if (deviceId && payload.did !== deviceId)
    return res.status(401).json({ error: 'デバイスが一致しません' });

  const db  = loadDB();
  const lic = db.licenses[payload.kh];
  if (!lic?.activations?.[payload.did])
    return res.status(401).json({ error: 'この認証は無効になりました' });

  lic.activations[payload.did].lastSeenAt = new Date().toISOString();
  db.licenses[payload.kh] = lic;
  saveDB(db);

  const used = Object.keys(lic.activations).length;
  const max  = lic.maxActivations || 5;
  res.json({ valid: true, product: payload.prod, activationsUsed: used, activationsLeft: max - used });
});

// POST /api/pack/activate  — 追加パック認証
app.post('/api/pack/activate', (req, res) => {
  const baseToken = req.headers.authorization?.split(' ')[1];
  if (!verifyJwt(baseToken))
    return res.status(401).json({ error: 'ベースライセンスの認証が必要です' });

  const { key, deviceId } = req.body || {};
  if (!key || !deviceId)
    return res.status(400).json({ error: 'キーとデバイスIDが必要です' });
  if (!checkRate(req.ip))
    return res.status(429).json({ error: 'しばらく待ってください' });

  const db  = loadDB();
  const kh  = hashKey(key);
  const lic = db.licenses[kh];

  if (!lic || !lic.product?.startsWith('pack:'))
    return res.status(404).json({ error: 'パックキーが見つかりません' });

  const packId = lic.product.replace('pack:', '');
  const now    = new Date().toISOString();
  const acts   = lic.activations || {};

  if (acts[deviceId]) {
    acts[deviceId].lastSeenAt = now;
  } else {
    const used = Object.keys(acts).length;
    const max  = lic.maxActivations || 5;
    if (used >= max) {
      return res.status(403).json({
        error: `このパックキーの使用上限（${max}台）に達しています`,
        code: 'MAX_ACTIVATIONS'
      });
    }
    acts[deviceId] = { activatedAt: now, lastSeenAt: now };
  }

  lic.activations = acts;
  db.licenses[kh] = lic;
  saveDB(db);

  const packToken = signToken({ kh, did: deviceId, prod: lic.product, packId });
  res.json({ packId, token: packToken, packName: lic.note || packId });
});

// GET /api/pack/:packId  — パックコンテンツ取得（JWT 認証必須）
app.get('/api/pack/:packId', (req, res) => {
  const packToken = req.headers.authorization?.split(' ')[1];
  const payload   = verifyJwt(packToken);

  if (!payload || payload.packId !== req.params.packId)
    return res.status(401).json({ error: 'このパックへのアクセス権がありません' });

  const db  = loadDB();
  const lic = db.licenses[payload.kh];
  if (!lic?.activations?.[payload.did])
    return res.status(401).json({ error: '認証が無効です' });

  const packFile = join(PACKS_DIR, `${req.params.packId}.json`);
  if (!existsSync(packFile))
    return res.status(404).json({ error: 'パックデータが見つかりません（サーバー管理者に連絡してください）' });

  const packData = JSON.parse(readFileSync(packFile, 'utf8'));
  res.json(packData);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`\n🎤 英会話シャドウイング Web App`);
  console.log(`   http://localhost:${PORT}`);
  console.log(`   管理画面: http://localhost:${PORT}/admin`);
  console.log(`\n   ライセンス生成コマンド:`);
  console.log(`     node tools/gen-license.mjs base 1`);
  console.log(`     node tools/gen-license.mjs pack:travel_vol1 1`);
  console.log(`     node tools/gen-license.mjs bundle:travel_set 1`);
  console.log(`\n   管理ツール:`);
  console.log(`     node tools/admin.mjs list`);
  console.log(`     node tools/admin.mjs revoke <key>\n`);
});
