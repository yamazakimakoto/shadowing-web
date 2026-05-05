'use strict';

// ==================== PACK SYSTEM ====================
const DEFAULT_PACK = {
  id:          'default',
  name:        'デフォルト100題',
  description: '日常・旅行・ビジネス・健康・文化 各20題',
  icon:        '📚',
  sourceFile:  null,
  importedAt:  null,
  categories:  CATEGORIES,
  texts:       PRACTICE_TEXTS,
  explanations: EXPLANATIONS,
  translations: typeof TRANSLATIONS !== 'undefined' ? TRANSLATIONS : {},
};

function getPackLibrary() {
  try { return JSON.parse(localStorage.getItem('shadowing_pack_library') || '[]'); }
  catch { return []; }
}
function savePackLibrary(lib) {
  localStorage.setItem('shadowing_pack_library', JSON.stringify(lib));
}

function nextIdBase() {
  const lib = getPackLibrary();
  let max = 900000;
  lib.forEach(p => (p.texts || []).forEach(t => { if (t.id > max) max = t.id; }));
  return max + 1;
}

function getAllPacks()      { return [DEFAULT_PACK, ...getPackLibrary()]; }
function getActivePack() {
  const id = localStorage.getItem('shadowing_active_pack') || 'default';
  return getAllPacks().find(p => p.id === id) || DEFAULT_PACK;
}
function getActiveTexts()        { return getActivePack().texts; }
function getActiveExplanations() { return getActivePack().explanations || {}; }
function getActiveTranslations() { return getActivePack().translations  || {}; }
function getActiveCategories()   { return getActivePack().categories; }

// ── HTMLからDATAオブジェクトを抽出 ──
function extractDataFromHtml(html) {
  const start = html.indexOf('const DATA');
  if (start === -1) return null;
  const braceStart = html.indexOf('{', start);
  if (braceStart === -1) return null;
  let depth = 0, inStr = false, strCh = '', i = braceStart;
  while (i < html.length) {
    const c = html[i];
    if (inStr) {
      if (c === '\\') i++;
      else if (c === strCh) inStr = false;
    } else {
      if (c === '"' || c === "'" || c === '`') { inStr = true; strCh = c; }
      else if (c === '{') depth++;
      else if (c === '}') {
        depth--;
        if (depth === 0) {
          try { return new Function(`return (${html.slice(braceStart, i + 1)})`)(); }
          catch { return null; }
        }
      }
    }
    i++;
  }
  return null;
}

function iconForCategory(name) {
  if (/チェックイン|フロント/.test(name))          return '🏨';
  if (/チェックアウト/.test(name))                  return '🚪';
  if (/レストラン|食事|朝食|ビュッフェ|ワイン|メニュー|会計|ルームサービス/.test(name)) return '🍽️';
  if (/コンシェルジュ|観光|モーニングコール/.test(name)) return '🗺️';
  if (/トラブル|不具合|騒音|クレーム|体調|緊急|パスポート/.test(name)) return '🆘';
  if (/設備|プール|スパ|駐車|Wi-Fi|アメニティ|客室/.test(name)) return '🛎️';
  if (/オフィス|業務|会議|ミーティング|スケジュール|メール|報告/.test(name)) return '💼';
  if (/電話|テレカン/.test(name))                   return '📞';
  if (/プレゼン|提案|交渉|契約|クライアント/.test(name)) return '📊';
  if (/採用|面接|研修/.test(name))                  return '👥';
  if (/自己紹介|挨拶/.test(name))                   return '👋';
  if (/空港|搭乗|フライト/.test(name))              return '✈️';
  if (/電車|バス|地下鉄|乗り換え/.test(name))      return '🚆';
  if (/ショッピング|買い物/.test(name))             return '🛍️';
  if (/病院|薬/.test(name))                         return '🏥';
  if (/文化|趣味|映画|音楽/.test(name))            return '🎭';
  return '💬';
}

function dataToPackTexts(data, idBase) {
  const categories = [], texts = [], explanations = {}, translations = {};
  const catSeen = new Set();
  let id = idBase;
  for (const [catName, items] of Object.entries(data)) {
    if (!catSeen.has(catName)) {
      catSeen.add(catName);
      categories.push({ id: catName, label: catName, icon: iconForCategory(catName) });
    }
    for (const item of items) {
      const textId = id++;
      const text   = item.turns.map(t => `${t.s}: ${t.en}`).join('\n');
      texts.push({ id: textId, category: catName, title: item.title, titleJa: item.title, text });
      // 日本語訳：各ターンのja フィールドから構築
      const jaLines = (item.turns || []).filter(t => t.ja).map(t => `${t.s}: ${t.ja}`);
      if (jaLines.length) translations[textId] = jaLines.join('\n');
      const exp = [];
      if (item.tip) exp.push({ phrase: '📝 学習ポイント', reading: '', meaning: item.tip, note: '' });
      (item.turns || []).slice(0, 6).forEach(t => {
        const phrase = t.en.trim().split(/\s+/).slice(0, 5).join(' ');
        exp.push({ phrase, reading: '', meaning: t.ja || '', note: '' });
      });
      if (exp.length) explanations[textId] = exp;
    }
  }
  return { categories, texts, explanations, translations };
}

function guessPackMeta(html, filename) {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const name = m ? m[1].trim() : filename.replace(/\.html?$/i, '');
  const fn = filename.toLowerCase();
  let icon = '📝';
  if (/hotel/.test(fn))      icon = '🏨';
  else if (/toeic/.test(fn)) icon = '📊';
  else if (/travel/.test(fn))icon = '✈️';
  else if (/business/.test(fn)) icon = '💼';
  else if (/medical|hospital/.test(fn)) icon = '🏥';
  else if (/restaurant/.test(fn)) icon = '🍽️';
  else if (/airport/.test(fn)) icon = '✈️';
  return { name, icon };
}

// ==================== STATE ====================
const state = {
  currentText:       '',
  words:             [],
  isPlaying:         false,
  isPaused:          false,
  isRepeating:       false,
  isRecording:       false,
  utterance:         null,
  mediaRecorder:     null,
  audioChunks:       [],
  recognition:       null,
  lastTranscript:    '',
  lastScore:         null,
  savedTexts:        JSON.parse(localStorage.getItem('shadowing_saved_model') || '[]'),
  reviewUtterance:   null,
  selectedTextId:    null,
  selectedTextTitle: '',
  currentCat:        getActiveCategories()[0].id,
  dialogueMode:      false,
  dialogueSilentRole:'B',
  dialogueFullPlay:  true,
  dialogueSegs:      [],
  dialogueStopped:   false,
  dialogueTimer:     null,
};

// ==================== ELEMENTS ====================
const $ = id => document.getElementById(id);
const el = {
  navBtns:       document.querySelectorAll('.nav-btn'),
  tabs:          document.querySelectorAll('.tab-content'),
  inputTabs:     document.querySelectorAll('.input-tab'),
  inputPanels:   document.querySelectorAll('.input-panel'),
  manualText:    $('manual-text'),
  saveManualBtn: $('save-manual-btn'),
  catTabRow:     $('cat-tab-row'),
  textCardList:  $('text-card-list'),
  textDisplay:   $('text-display'),
  playBtn:       $('play-btn'),
  stopBtn:       $('stop-btn'),
  repeatBtn:     $('repeat-btn'),
  speedSlider:   $('speed-slider'),
  speedValue:    $('speed-value'),
  voiceSelect:   $('voice-select'),
  dialogueControls: $('dialogue-controls'),
  roleBtns:         document.querySelectorAll('.role-btn'),
  roleHint:         $('role-hint'),
  roleSelector:     $('role-selector'),
  playModeBtns:     document.querySelectorAll('.play-mode-btn'),
  explainBtn:    $('explain-btn'),
  explainModal:  $('explain-modal'),
  explainSource: $('explain-source'),
  explainLoading:$('explain-loading'),
  explainList:   $('explain-list'),
  closeExplain:  $('close-explain'),
  saveTextBtn:   $('save-text-btn'),
  recordBtn:     $('record-btn'),
  recordLabel:   $('record-label'),
  recStatus:     $('rec-status'),
  audioArea:     $('audio-playback-area'),
  recordedAudio: $('recorded-audio'),
  scoreArea:     $('score-area'),
  scoreRing:     $('score-ring'),
  ringFill:      $('ring-fill'),
  scoreNum:      $('score-num'),
  scoreMsg:      $('score-msg'),
  savedList:     $('saved-list'),
  clearAllBtn:   $('clear-all-btn'),
  reviewModal:   $('review-modal'),
  reviewMeta:    $('review-meta'),
  reviewText:    $('review-text'),
  reviewTranArea:$('review-transcript-area'),
  reviewTran:    $('review-transcript'),
  reviewPlayBtn:     $('review-play-btn'),
  reviewPracticeBtn: $('review-practice-btn'),
  closeBtns:         document.querySelectorAll('.close-modal'),
};

// ==================== VOICES ====================
// serverHasTTS = true → OpenAI TTS、false → Web Speech API フォールバック
let serverHasTTS = false;

// OpenAI TTS ブラウザ内キャッシュ（blob URL、セッション中有効）
const ttsCache   = new Map();
let currentAudio = null;   // 現在再生中の Audio
let ttsAbort     = null;   // AbortController（フェッチ中断用）

async function fetchTTS(text, voice) {
  const key = `${voice}:${text}`;
  if (ttsCache.has(key)) return ttsCache.get(key);
  const ctrl = new AbortController();
  ttsAbort = ctrl;
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice }),
    signal: ctrl.signal,
  });
  if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || 'TTS error'); }
  const url = URL.createObjectURL(await res.blob());
  ttsCache.set(key, url);
  return url;
}
function playAudio(url, rate) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.playbackRate = Math.max(0.5, Math.min(2.0, rate));
    currentAudio = audio;
    audio.addEventListener('ended', () => { currentAudio = null; resolve(); });
    audio.addEventListener('error', () => { currentAudio = null; reject(new Error('audio error')); });
    audio.play().catch(reject);
  });
}
function getAudioDuration(url) {
  return new Promise(resolve => {
    const a = new Audio(url);
    a.addEventListener('loadedmetadata', () => resolve(a.duration), { once: true });
    a.addEventListener('error', () => resolve(3), { once: true });
  });
}
function getTTSVoice() { return el.voiceSelect?.value || 'nova'; }

// Web Speech API（フォールバック用）
let voices = [];
function loadVoices() {
  voices = speechSynthesis.getVoices();
  if (serverHasTTS) return;  // OpenAI TTS 使用中は不要
  const eng = voices.filter(v => v.lang.startsWith('en'));
  el.voiceSelect.innerHTML = '';
  if (!eng.length) { el.voiceSelect.innerHTML = '<option value="">デフォルト</option>'; return; }
  eng.forEach((v, i) => {
    const opt = document.createElement('option');
    opt.value = i; opt.textContent = `${v.name} (${v.lang})`;
    el.voiceSelect.appendChild(opt);
  });
  const samIdx   = eng.findIndex(v => v.name === 'Samantha');
  const moiraIdx = eng.findIndex(v => v.name === 'Moira');
  const enUSIdx  = eng.findIndex(v => v.lang === 'en-US');
  el.voiceSelect.value = samIdx !== -1 ? samIdx : (moiraIdx !== -1 ? moiraIdx : (enUSIdx !== -1 ? enUSIdx : 0));
}
speechSynthesis.addEventListener('voiceschanged', loadVoices);
loadVoices();

(function () {
  const subtitle = document.getElementById('pack-subtitle');
  if (subtitle) { const p = getActivePack(); subtitle.textContent = `${p.icon} ${p.name}`; }
})();

function getSelectedVoice() {
  const eng = voices.filter(v => v.lang.startsWith('en'));
  return eng[parseInt(el.voiceSelect.value)] || null;
}

// サーバーステータス取得（TTS対応か判定）
(async () => {
  try {
    const s = await fetch('/api/status').then(r => r.json());
    serverHasTTS = s.hasTTS === true;
  } catch { serverHasTTS = false; }
  if (serverHasTTS) {
    el.voiceSelect.innerHTML = `
      <option value="nova">Nova（女性・明瞭）</option>
      <option value="shimmer">Shimmer（女性・柔らか）</option>
      <option value="alloy">Alloy（中性的）</option>
      <option value="echo">Echo（男性・自然）</option>
      <option value="fable">Fable（英国系）</option>
      <option value="onyx">Onyx（男性・深い）</option>`;
  }
})();

// ==================== NAVIGATION ====================
el.navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    el.navBtns.forEach(b => b.classList.remove('active'));
    el.tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-${tab}`).classList.add('active');
    if (tab === 'history')  renderSavedTexts();
    if (tab === 'packs')    renderPackManager();
    if (tab === 'practice') refreshPracticeTab();
    if (tab === 'settings') renderSettingsTab();
  });
});

// ==================== INPUT TABS ====================
el.inputTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const type = tab.dataset.input;
    el.inputTabs.forEach(t => t.classList.remove('active'));
    el.inputPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`input-${type}`).classList.add('active');
  });
});

// ==================== TEXT SELECTOR ====================
function buildCategoryTabs() {
  el.catTabRow.innerHTML = getActiveCategories().map(cat => `
    <button class="cat-tab${cat.id === state.currentCat ? ' active' : ''}" data-cat="${cat.id}">
      ${cat.icon} ${cat.label}
    </button>`).join('');

  el.catTabRow.querySelectorAll('.cat-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentCat = btn.dataset.cat;
      el.catTabRow.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildTextCards();
    });
  });
}

function buildTextCards() {
  const texts = getActiveTexts().filter(t => t.category === state.currentCat);
  el.textCardList.innerHTML = texts.map(t => {
    const isDialogue = t.text.startsWith('A:') || t.text.includes('\nA:') || t.text.includes('\nB:');
    const typeLabel  = isDialogue ? '💬 対話' : '📝 単文';
    const typeCls    = isDialogue ? 'dialogue' : 'monologue';
    const preview    = t.text.replace(/^[AB]:\s*/gm, '').slice(0, 90) + '…';
    const selected   = t.id === state.selectedTextId ? ' selected' : '';
    return `
      <div class="text-card${selected}" data-id="${t.id}">
        <div class="text-card-head">
          <span class="text-card-title">${escapeHtml(t.title)}<span class="text-card-title-ja">（${escapeHtml(t.titleJa)}）</span></span>
          <span class="text-card-type ${typeCls}">${typeLabel}</span>
        </div>
        <div class="text-card-preview">${escapeHtml(preview)}</div>
      </div>`;
  }).join('');

  el.textCardList.querySelectorAll('.text-card').forEach(card => {
    card.addEventListener('click', () => {
      const id    = parseInt(card.dataset.id);
      const entry = getActiveTexts().find(t => t.id === id);
      if (!entry) return;
      state.selectedTextId    = id;
      state.selectedTextTitle = `${entry.title}（${entry.titleJa}）`;
      el.textCardList.querySelectorAll('.text-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      setCurrentText(entry.text);
    });
  });
}

buildCategoryTabs();
buildTextCards();

// ==================== MANUAL TEXT ====================
el.saveManualBtn.addEventListener('click', () => {
  const text = el.manualText.value.trim();
  if (!text) { shake(el.manualText); return; }
  state.selectedTextId    = null;
  state.selectedTextTitle = '手動入力';
  setCurrentText(text);
  el.manualText.value = '';
});

// ==================== SET / RENDER TEXT ====================
function setCurrentText(text) {
  state.currentText = text;
  if (!text) {
    el.textDisplay.innerHTML = '<p class="placeholder-text">上でテキストを選択してください</p>';
    setControlsEnabled(false);
    el.dialogueControls.classList.add('hidden');
    state.dialogueMode = false;
    return;
  }

  const parsed = parseDialogue(text);
  state.dialogueMode = parsed.isDialogue;
  state.dialogueSegs = parsed.segs;

  if (parsed.isDialogue) {
    el.dialogueControls.classList.remove('hidden');
    el.playModeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === (state.dialogueFullPlay ? 'full' : 'practice')));
    el.roleSelector.classList.toggle('hidden', state.dialogueFullPlay);
    el.textDisplay.innerHTML = buildDialogueHTML(text, parsed.segs, state.dialogueSilentRole, state.dialogueFullPlay);
    updateRoleHint();
  } else {
    el.dialogueControls.classList.add('hidden');
    el.textDisplay.innerHTML = buildWordSpans(text);
  }

  state.words = Array.from(el.textDisplay.querySelectorAll('.word'));
  setControlsEnabled(true);
  el.saveTextBtn.textContent = '📌 テキストを保存';
  el.audioArea.classList.add('hidden');
  el.scoreArea.classList.add('hidden');
  state.lastScore      = null;
  state.lastTranscript = '';

  requestAnimationFrame(() => {
    el.textDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

function buildWordSpans(text) {
  let html = '', i = 0;
  while (i < text.length) {
    if (/\S/.test(text[i])) {
      const start = i;
      while (i < text.length && /\S/.test(text[i])) i++;
      html += `<span class="word" data-start="${start}" data-end="${i}">${escapeHtml(text.slice(start, i))}</span>`;
    } else {
      html += text[i] === '\n' ? '<br>' : escapeHtml(text[i]);
      i++;
    }
  }
  return html;
}

// ==================== DIALOGUE PARSING ====================
function parseDialogue(text) {
  const lines = text.split('\n');
  let offset  = 0;
  const segs  = [];
  for (const raw of lines) {
    const mA = raw.match(/^A:\s*([\s\S]*)/);
    const mB = raw.match(/^B:\s*([\s\S]*)/);
    if (mA)          segs.push({ role: 'A', text: mA[1], textOffset: offset + raw.indexOf(mA[1]) });
    else if (mB)     segs.push({ role: 'B', text: mB[1], textOffset: offset + raw.indexOf(mB[1]) });
    else if (raw.trim()) segs.push({ role: 'N', text: raw, textOffset: offset });
    offset += raw.length + 1;
  }
  return { isDialogue: segs.some(s => s.role === 'A') && segs.some(s => s.role === 'B'), segs };
}

function buildDialogueHTML(text, segs, silentRole, fullPlay = false) {
  return segs.map((seg, idx) => {
    const silent  = !fullPlay && seg.role === silentRole;
    const roleTag = (seg.role === 'A' || seg.role === 'B')
      ? `<span class="role-tag role-${seg.role}">${seg.role}</span>` : '';
    const words = buildWordSpansAt(text, seg.textOffset, seg.text.length);
    return `<div class="dl-line${silent ? ' dl-silent' : ''}" data-role="${seg.role}" data-idx="${idx}">${roleTag}${words}</div>`;
  }).join('');
}

function buildWordSpansAt(text, startOff, length) {
  let html = '';
  const end = startOff + length;
  let i = startOff;
  while (i < end) {
    if (/\S/.test(text[i])) {
      const ws = i;
      while (i < end && /\S/.test(text[i])) i++;
      html += `<span class="word" data-start="${ws}" data-end="${i}">${escapeHtml(text.slice(ws, i))}</span>`;
    } else {
      html += text[i] === '\n' ? '<br>' : escapeHtml(text[i]);
      i++;
    }
  }
  return html;
}

function setControlsEnabled(on) {
  [el.playBtn, el.stopBtn, el.repeatBtn, el.recordBtn, el.saveTextBtn].forEach(b => b.disabled = !on);
  el.explainBtn.disabled = !on || (state.selectedTextId === null);
}

// ==================== DIALOGUE MODE TOGGLE ====================
el.playModeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    state.dialogueFullPlay = (mode === 'full');
    el.playModeBtns.forEach(b => b.classList.toggle('active', b.dataset.mode === mode));
    el.roleSelector.classList.toggle('hidden', state.dialogueFullPlay);
    if (state.dialogueMode && state.currentText) {
      stopSpeech();
      el.textDisplay.innerHTML = buildDialogueHTML(state.currentText, state.dialogueSegs, state.dialogueSilentRole, state.dialogueFullPlay);
      state.words = Array.from(el.textDisplay.querySelectorAll('.word'));
    }
  });
});

el.roleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const practice = btn.dataset.practice;
    state.dialogueSilentRole = practice;
    el.roleBtns.forEach(b => b.classList.toggle('active', b.dataset.practice === practice));
    updateRoleHint();
    if (state.dialogueMode && state.currentText) {
      stopSpeech();
      el.textDisplay.innerHTML = buildDialogueHTML(state.currentText, state.dialogueSegs, practice, state.dialogueFullPlay);
      state.words = Array.from(el.textDisplay.querySelectorAll('.word'));
    }
  });
});

function updateRoleHint() {
  if (state.dialogueFullPlay) { el.roleHint.textContent = 'A・B すべての行を順番に読み上げます'; return; }
  const silent = state.dialogueSilentRole;
  const reads  = silent === 'A' ? 'B' : 'A';
  el.roleHint.textContent = `${reads} を読み上げ → ${silent} をシャドウイング`;
}

// ==================== TTS ====================
el.speedSlider.addEventListener('input', () => {
  el.speedValue.textContent = parseFloat(el.speedSlider.value).toFixed(1);
});

el.playBtn.addEventListener('click', () => {
  if (state.isPaused) {
    resumeSpeech();
  } else if (state.isPlaying) {
    if (serverHasTTS) pauseSpeech();
    else if (state.dialogueMode) stopSpeech();
    else { if (speechSynthesis.paused) resumeSpeech(); else pauseSpeech(); }
  } else {
    startSpeech();
  }
});

el.stopBtn.addEventListener('click', stopSpeech);

el.repeatBtn.addEventListener('click', () => {
  state.isRepeating = !state.isRepeating;
  el.repeatBtn.classList.toggle('active', state.isRepeating);
  el.repeatBtn.textContent = state.isRepeating ? '🔁 リピート ON' : '🔁 リピート';
});

// ── エントリポイント ────────────────────────────────────────────────────
function startSpeech(text, onEnd) {
  if (state.isRecording) return;
  if (state.dialogueMode && !text && !onEnd) { startDialogueSpeech(); return; }
  if (serverHasTTS) { startSpeechTTS(text, onEnd); return; }
  startSpeechWSA(text, onEnd);
}

// ── OpenAI TTS パス ──────────────────────────────────────────────────────
function startSpeechTTS(text, onEnd) {
  const content = text || state.currentText;
  if (!content) return;
  stopSpeech();
  state.dialogueStopped = false;
  const rate  = parseFloat(el.speedSlider.value);
  const voice = getTTSVoice();
  el.playBtn.disabled = true;
  el.playBtn.textContent = '⏳ 読み込み中…';
  (async () => {
    try {
      const url = await fetchTTS(content, voice);
      if (state.dialogueStopped) return;
      state.isPlaying = true;
      el.playBtn.disabled = false;
      el.playBtn.textContent = '⏸ 一時停止';
      await playAudio(url, rate);
      if (!state.dialogueStopped) {
        state.isPlaying = false; el.playBtn.textContent = '▶ 再生';
        if (onEnd) { onEnd(); return; }
        if (state.isRepeating && content === state.currentText) setTimeout(startSpeech, 600);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('[TTS]', err.message);
      state.isPlaying = false; el.playBtn.disabled = false; el.playBtn.textContent = '▶ 再生';
    }
  })();
}

// ── Web Speech API パス（フォールバック）────────────────────────────────
function startSpeechWSA(text, onEnd) {
  const content = text || state.currentText;
  if (!content) return;
  speechSynthesis.cancel();
  clearWordHighlights();
  const utt = new SpeechSynthesisUtterance(content);
  utt.rate = parseFloat(el.speedSlider.value);
  utt.lang = 'en-US';
  const voice = getSelectedVoice();
  if (voice) utt.voice = voice;
  utt.addEventListener('boundary', evt => {
    if (evt.name !== 'word') return;
    clearWordHighlights();
    for (const w of state.words) {
      if (evt.charIndex >= parseInt(w.dataset.start) && evt.charIndex < parseInt(w.dataset.end)) {
        w.classList.add('active'); w.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); break;
      }
    }
  });
  utt.addEventListener('start', () => { state.isPlaying = true; state.utterance = utt; el.playBtn.textContent = '⏸ 一時停止'; });
  utt.addEventListener('end',   () => {
    clearWordHighlights(); state.isPlaying = false; el.playBtn.textContent = '▶ 再生';
    if (onEnd) { onEnd(); return; }
    if (state.isRepeating && content === state.currentText) setTimeout(startSpeech, 600);
  });
  utt.addEventListener('error', () => { state.isPlaying = false; el.playBtn.textContent = '▶ 再生'; clearWordHighlights(); });
  try {
    if (speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(utt);
  } catch(e) { state.isPlaying = false; el.playBtn.textContent = '▶ 再生'; }
}

// ── 一時停止 / 再開 / 停止 ──────────────────────────────────────────────
function pauseSpeech() {
  if (serverHasTTS) {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause(); state.isPlaying = false; state.isPaused = true; el.playBtn.textContent = '▶ 再生';
    }
  } else {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause(); state.isPlaying = false; el.playBtn.textContent = '▶ 再生';
    }
  }
}
function resumeSpeech() {
  if (serverHasTTS) {
    if (currentAudio && currentAudio.paused) {
      currentAudio.play().catch(() => {});
      state.isPlaying = true; state.isPaused = false; el.playBtn.textContent = '⏸ 一時停止';
    }
  } else {
    if (speechSynthesis.paused) { speechSynthesis.resume(); state.isPlaying = true; el.playBtn.textContent = '⏸ 一時停止'; }
  }
}
function stopSpeech() {
  state.dialogueStopped = true;
  if (ttsAbort)            { ttsAbort.abort(); ttsAbort = null; }
  if (state.dialogueTimer) { clearTimeout(state.dialogueTimer); state.dialogueTimer = null; }
  if (currentAudio)        { currentAudio.pause(); currentAudio.src = ''; currentAudio = null; }
  speechSynthesis.cancel();
  clearLineHighlights();
  state.isPlaying = false; state.isPaused = false;
  el.playBtn.disabled = false; el.playBtn.textContent = '▶ 再生';
  clearWordHighlights();
}
function clearWordHighlights() { state.words.forEach(w => w.classList.remove('active')); }

// ==================== DIALOGUE PLAYBACK ENGINE ====================
function startDialogueSpeech() {
  if (state.isRecording || !state.dialogueSegs.length) return;
  stopSpeech();
  state.dialogueStopped = false;
  const rate = parseFloat(el.speedSlider.value);
  const segs = state.dialogueSegs;

  if (serverHasTTS) {
    // ── OpenAI TTS ダイアログ ──────────────────────────────────────────
    const voice = getTTSVoice();
    (async () => {
      el.playBtn.disabled = true; el.playBtn.textContent = '⏳ 読み込み中…';
      const urls = {};
      try {
        await Promise.all(segs.map(async (seg, i) => {
          if (!seg.text.trim()) return;
          urls[i] = await fetchTTS(seg.text, voice);
        }));
      } catch (err) {
        if (err.name !== 'AbortError') console.error('[TTS dialogue]', err.message);
        state.isPlaying = false; el.playBtn.disabled = false; el.playBtn.textContent = '▶ 再生';
        return;
      }
      if (state.dialogueStopped) return;
      state.isPlaying = true; el.playBtn.disabled = false; el.playBtn.textContent = '⏸ 一時停止';

      if (state.dialogueFullPlay) {
        for (let i = 0; i < segs.length; i++) {
          if (state.dialogueStopped) break;
          if (!segs[i].text.trim() || !urls[i]) continue;
          highlightLine(i);
          await playAudio(urls[i], rate).catch(() => {});
          clearLineHighlights();
        }
      } else {
        const silent = state.dialogueSilentRole;
        for (let i = 0; i < segs.length; i++) {
          if (state.dialogueStopped) break;
          if (!segs[i].text.trim()) continue;
          highlightLine(i);
          if (segs[i].role === silent) {
            const dur = urls[i] ? await getAudioDuration(urls[i]) : 2;
            await new Promise(r => { state.dialogueTimer = setTimeout(r, (dur / rate) * 1000); });
          } else {
            await playAudio(urls[i], rate).catch(() => {});
          }
          clearLineHighlights();
        }
      }
      if (!state.dialogueStopped) {
        state.isPlaying = false; el.playBtn.textContent = '▶ 再生';
        if (state.isRepeating) setTimeout(startDialogueSpeech, 800);
      }
    })();
    return;
  }

  // ── Web Speech API ダイアログ（フォールバック）────────────────────────
  clearWordHighlights(); clearLineHighlights();
  state.isPlaying = true;
  el.playBtn.textContent = '■ 停止';
  const voice = getSelectedVoice();
  const silent = state.dialogueSilentRole, fullPlay = state.dialogueFullPlay;

  (async () => {
    try {
      for (let i = 0; i < segs.length; i++) {
        if (state.dialogueStopped) break;
        const seg = segs[i];
        if (!seg.text.trim()) continue;
        highlightLine(i);
        if (!fullPlay && seg.role === silent) await dialogueSilenceWSA(seg.text, rate);
        else await speakSegmentWSA(seg, voice, rate);
        clearLineHighlights();
        if (state.dialogueStopped) break;
      }
    } finally {
      state.isPlaying = false; el.playBtn.textContent = '▶ 再生';
      clearWordHighlights(); clearLineHighlights();
      if (state.isRepeating && !state.dialogueStopped) setTimeout(startDialogueSpeech, 800);
    }
  })();
}

function speakSegmentWSA(seg, voice, rate) {
  return new Promise(resolve => {
    const utt = new SpeechSynthesisUtterance(seg.text);
    utt.rate = rate; utt.lang = 'en-US';
    if (voice) utt.voice = voice;
    state.utterance = utt;
    const words = seg.text.trim().split(/\s+/).filter(Boolean).length || 1;
    const tid = setTimeout(() => { clearWordHighlights(); resolve(); },
      Math.max(8000, (words / (Math.max(0.5, rate) * 120)) * 60000 + 3000));
    utt.addEventListener('boundary', evt => {
      if (evt.name !== 'word') return;
      const gi = evt.charIndex + seg.textOffset;
      clearWordHighlights();
      for (const w of state.words) {
        if (gi >= parseInt(w.dataset.start) && gi < parseInt(w.dataset.end)) {
          w.classList.add('active'); w.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); break;
        }
      }
    });
    utt.addEventListener('end',   () => { clearTimeout(tid); clearWordHighlights(); resolve(); });
    utt.addEventListener('error', () => { clearTimeout(tid); clearWordHighlights(); resolve(); });
    if (speechSynthesis.paused) speechSynthesis.resume();
    speechSynthesis.speak(utt);
  });
}

function dialogueSilenceWSA(text, rate) {
  const words = text.trim().split(/\s+/).filter(Boolean).length || 1;
  const durationMs = Math.max(1200, (words / (140 * rate)) * 60_000 + 700);
  return new Promise(resolve => {
    state.dialogueTimer = setTimeout(() => { state.dialogueTimer = null; resolve(); }, durationMs);
  });
}

function highlightLine(idx) {
  clearLineHighlights();
  const line = el.textDisplay.querySelector(`.dl-line[data-idx="${idx}"]`);
  if (line) { line.classList.add('dl-speaking'); line.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
}
function clearLineHighlights() {
  el.textDisplay.querySelectorAll('.dl-line.dl-speaking').forEach(l => l.classList.remove('dl-speaking'));
}

// ==================== RECORDING ====================
el.recordBtn.addEventListener('click', () => {
  if (state.isRecording) stopRecording(); else startRecording();
});

// iOS 判定（iPad Pro デスクトップモード含む）
const _isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

// iOS 用: Float32Array PCM バッファ群 → WAV ArrayBuffer
function _pcmToWAV(bufs, sr) {
  const total = bufs.reduce((n, b) => n + b.length, 0);
  const ab = new ArrayBuffer(44 + total * 2);
  const dv = new DataView(ab);
  const ws = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  ws(0,'RIFF'); dv.setUint32(4, 36 + total*2, true); ws(8,'WAVE');
  ws(12,'fmt '); dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,1,true);
  dv.setUint32(24,sr,true); dv.setUint32(28,sr*2,true); dv.setUint16(32,2,true); dv.setUint16(34,16,true);
  ws(36,'data'); dv.setUint32(40,total*2,true);
  let off = 44;
  for (const b of bufs) {
    for (let i = 0; i < b.length; i++, off += 2) {
      const s = Math.max(-1, Math.min(1, b[i]));
      dv.setInt16(off, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }
  return ab;
}

// 録音完了後: 新しい <audio> 要素を生成して差し替え + 再生エリアを表示
function _showRecordedAudio(blob) {
  const url   = URL.createObjectURL(blob);
  const fresh = document.createElement('audio');
  fresh.id       = 'recorded-audio';
  fresh.controls = true;
  fresh.src      = url;
  const old = el.recordedAudio;
  if (old && old.src && old.src.startsWith('blob:')) {
    try { URL.revokeObjectURL(old.src); } catch {}
  }
  if (old && old.parentNode) { old.replaceWith(fresh); } else { el.audioArea.appendChild(fresh); }
  el.recordedAudio = fresh;
  el.audioArea.classList.remove('hidden');
}

// 録音完了後: 表示 → Whisper採点
async function _finishRecording(blob) {
  _showRecordedAudio(blob);
  await scoreWithWhisper(blob);
}

async function scoreWithWhisper(blob) {
  if (!blob || !state.currentText) return;
  // スコアエリアにローディング表示
  el.scoreNum.textContent   = '…';
  el.scoreMsg.textContent   = '採点中...';
  el.scoreArea.classList.remove('hidden');
  setRingProgress(0);

  try {
    const base64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    const mimeType = blob.type || 'audio/webm';
    const resp = await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio: base64, mimeType, reference: state.currentText }),
    });
    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || `HTTP ${resp.status}`);
    }
    const { score, transcript } = await resp.json();
    state.lastScore      = score;
    state.lastTranscript = transcript;
    showScore(score);
  } catch (err) {
    console.warn('[scoreWithWhisper]', err.message, 'blob size=', blob.size, 'type=', blob.type);
    // Whisper失敗時: lastTranscript (SpeechRecognition) でフォールバック採点
    const fallback = calcScore(state.currentText, state.lastTranscript);
    if (fallback !== null) {
      state.lastScore = fallback;
      showScore(fallback);
    } else {
      // フォールバックも不可 → エラーメッセージを表示
      el.scoreNum.textContent = '?';
      el.scoreMsg.textContent = '採点失敗: ' + (err.message || '通信エラー') + '（再録音してください）';
      setRingProgress(0);
      el.scoreRing.classList.remove('excellent', 'good');
      el.scoreRing.classList.add('poor');
    }
  }
}

async function startRecording() {
  if (!state.currentText) return;
  stopSpeech();

  // マイク取得
  let stream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (err) {
    const n = err.name;
    if      (n === 'NotAllowedError'  || n === 'PermissionDeniedError')
      alert('マイクへのアクセスを許可してください。\nブラウザのアドレスバー左のアイコンから権限を「許可」にしてください。');
    else if (n === 'NotFoundError'    || n === 'DevicesNotFoundError')
      alert('マイクが見つかりません。マイクを接続してから再試行してください。');
    else if (n === 'NotReadableError' || n === 'TrackStartError')
      alert('マイクが他のアプリで使用中です。他のアプリを閉じてから再試行してください。');
    else
      alert('マイクエラー: ' + err.message);
    return;
  }

  state.isRecording    = true;
  state.lastTranscript = '';
  state.lastScore      = null;
  el.recordBtn.classList.add('recording');
  el.recordLabel.textContent = '録音停止';
  el.recStatus.classList.remove('hidden');
  el.audioArea.classList.add('hidden');
  el.scoreArea.classList.add('hidden');

  // ═══════════════════════════════════════════════════
  // iOS: MediaRecorder は dataavailable が常に size=0 になる根本バグがあるため
  //      Web Audio API (AudioContext + ScriptProcessorNode) で PCM を収集し
  //      WAV ファイルとして出力する
  // ═══════════════════════════════════════════════════
  if (_isIOS) {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      await ctx.resume().catch(() => {});
      const source = ctx.createMediaStreamSource(stream);
      const proc   = ctx.createScriptProcessor(4096, 1, 1);
      const sink   = ctx.createGain();
      sink.gain.value = 0; // 出力音量ゼロ（フィードバック防止）
      const bufs = [];
      proc.onaudioprocess = e => {
        if (state.isRecording)
          bufs.push(new Float32Array(e.inputBuffer.getChannelData(0)));
      };
      source.connect(proc);
      proc.connect(sink);
      sink.connect(ctx.destination);
      state._iosStop = () => {
        try { proc.disconnect(); source.disconnect(); sink.disconnect(); } catch {}
        ctx.close().catch(() => {});
        stream.getTracks().forEach(t => t.stop());
        if (!bufs.length) return;
        const wavBuf = _pcmToWAV(bufs, ctx.sampleRate);
        _finishRecording(new Blob([wavBuf], { type: 'audio/wav' }));
      };
    } catch (e) {
      stream.getTracks().forEach(t => t.stop());
      state.isRecording = false;
      el.recordBtn.classList.remove('recording');
      el.recordLabel.textContent = '録音開始';
      el.recStatus.classList.add('hidden');
      alert('iOS 録音エラー: ' + e.message);
    }
    return; // iOS はここで終了（SpeechRecognition 非対応のため不要）
  }

  // ═══════════════════════════════════════════════════
  // PC / Android: MediaRecorder を使用
  // ═══════════════════════════════════════════════════
  if (typeof MediaRecorder === 'undefined') {
    stream.getTracks().forEach(t => t.stop());
    state.isRecording = false;
    el.recordBtn.classList.remove('recording');
    el.recordLabel.textContent = '録音開始';
    el.recStatus.classList.add('hidden');
    alert('このブラウザはマイク録音に対応していません。Chrome をご利用ください。');
    return;
  }

  let mr;
  try { mr = new MediaRecorder(stream); }
  catch (e) {
    stream.getTracks().forEach(t => t.stop());
    state.isRecording = false;
    el.recordBtn.classList.remove('recording');
    el.recordLabel.textContent = '録音開始';
    el.recStatus.classList.add('hidden');
    alert('録音の初期化に失敗しました: ' + e.message);
    return;
  }

  const chunks = [];
  let recFinished = false;
  function onRecDone() {
    if (recFinished || !chunks.length) return;
    recFinished = true;
    let mime = mr.mimeType || 'audio/webm';
    if (mime === 'video/mp4') mime = 'audio/mp4';
    _finishRecording(new Blob(chunks, { type: mime }));
  }

  state.mediaRecorder = mr;
  state.audioChunks   = chunks;

  mr.addEventListener('dataavailable', e => {
    if (e.data && e.data.size > 0) {
      chunks.push(e.data);
      if (mr.state === 'inactive') onRecDone();
    }
  });
  mr.addEventListener('stop', () => {
    stream.getTracks().forEach(t => t.stop());
    onRecDone();
    setTimeout(onRecDone, 400);
  });
  mr.addEventListener('error', () => {
    stream.getTracks().forEach(t => t.stop());
    state.mediaRecorder = null;
    state.isRecording   = false;
    el.recordBtn.classList.remove('recording');
    el.recordLabel.textContent = '録音開始';
    el.recStatus.classList.add('hidden');
  });
  try {
    mr.start(500);
  } catch (e) {
    stream.getTracks().forEach(t => t.stop());
    state.mediaRecorder = null;
    state.isRecording   = false;
    el.recordBtn.classList.remove('recording');
    el.recordLabel.textContent = '録音開始';
    el.recStatus.classList.add('hidden');
    alert('録音開始エラー: ' + e.message);
    return;
  }

  // SpeechRecognition（採点用 / PC・Android Chrome のみ）
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SR) {
    try {
      const rec = new SR();
      rec.continuous      = true;
      rec.interimResults  = false;
      rec.lang            = 'en-US';
      rec.maxAlternatives = 1;
      rec.addEventListener('result', e => {
        for (let i = e.resultIndex; i < e.results.length; i++)
          if (e.results[i].isFinal) state.lastTranscript += ' ' + e.results[i][0].transcript;
      });
      rec.addEventListener('end', () => {
        if (state.isRecording && state.recognition === rec) try { rec.start(); } catch {}
      });
      rec.addEventListener('error', e => {
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') state.recognition = null;
      });
      rec.start();
      state.recognition = rec;
    } catch {}
  }
}

function stopRecording() {
  state.isRecording = false;
  el.recordBtn.classList.remove('recording');
  el.recordLabel.textContent = '録音開始';
  el.recStatus.classList.add('hidden');

  if (state.recognition) {
    try { state.recognition.stop(); } catch {}
    state.recognition = null;
  }

  // iOS path
  if (state._iosStop) {
    const fn = state._iosStop;
    state._iosStop = null;
    fn(); // → _finishRecording が非同期で採点する
    return;
  }

  // MediaRecorder path
  const mr = state.mediaRecorder;
  state.mediaRecorder = null;
  if (mr && mr.state !== 'inactive') {
    try { mr.stop(); } catch {} // → onRecDone → _finishRecording が非同期で採点する
  }
}

// ==================== SCORING ====================
function normalizeWords(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
}
function calcScore(reference, transcript) {
  if (!transcript?.trim()) return null;
  const refWords = normalizeWords(reference), hypWords = normalizeWords(transcript);
  if (!refWords.length) return null;
  const refCounts = {};
  refWords.forEach(w => { refCounts[w] = (refCounts[w] || 0) + 1; });
  let matched = 0;
  hypWords.forEach(w => { if (refCounts[w] > 0) { matched++; refCounts[w]--; } });
  return Math.round((matched / refWords.length) * 100);
}
function setRingProgress(pct) {
  const circ = 2 * Math.PI * 42;
  el.ringFill.setAttribute('stroke-dasharray', `${((pct / 100) * circ).toFixed(1)} ${circ}`);
}
function showScore(score) {
  el.scoreNum.textContent = score;
  setRingProgress(score);
  el.scoreRing.classList.remove('excellent', 'good', 'poor');
  if      (score >= 75) el.scoreRing.classList.add('excellent');
  else if (score >= 45) el.scoreRing.classList.add('good');
  else                  el.scoreRing.classList.add('poor');
  let msg = '';
  if      (score >= 90) msg = '🎉 素晴らしい！ほぼ完璧です！';
  else if (score >= 75) msg = '👍 よくできました！';
  else if (score >= 55) msg = '😊 なかなか良いです。続けましょう！';
  else if (score >= 35) msg = '🔄 もう少し練習しましょう';
  else                  msg = '💪 諦めずに練習を続けましょう！';
  el.scoreMsg.textContent = msg;
  el.scoreArea.classList.remove('hidden');
}

// ==================== EXPLAIN ====================
el.explainBtn.addEventListener('click', openExplainModal);
el.closeExplain.addEventListener('click', () => el.explainModal.classList.add('hidden'));
el.explainModal.addEventListener('click', e => { if (e.target === el.explainModal) el.explainModal.classList.add('hidden'); });

function openExplainModal() {
  if (!state.currentText || state.selectedTextId === null) return;
  const items = getActiveExplanations()[state.selectedTextId];
  const trans = getActiveTranslations()[state.selectedTextId] || null;

  // ── 英文表示 ──
  el.explainSource.innerHTML = buildWordSpans(state.currentText).replace(/\n/g, '<br>');

  // ── 日本語訳ブロック（モーダル内 explain-source の直後に挿入） ──
  let transEl = document.getElementById('explain-translation');
  if (!transEl) {
    transEl = document.createElement('div');
    transEl.id = 'explain-translation';
    el.explainSource.insertAdjacentElement('afterend', transEl);
  }
  if (trans) {
    // A:/B: 形式を整形
    const transHtml = trans
      .split('\n')
      .map(line => {
        const m = line.match(/^([A-Z]):\s+(.+)/);
        if (m) return `<span class="trans-speaker">${escapeHtml(m[1])}：</span>${escapeHtml(m[2])}`;
        return escapeHtml(line);
      })
      .join('<br>');
    transEl.innerHTML = `<div class="explain-trans-block"><span class="explain-trans-label">🇯🇵 日本語訳</span><div class="explain-trans-text">${transHtml}</div></div>`;
    transEl.classList.remove('hidden');
  } else {
    transEl.innerHTML = '';
    transEl.classList.add('hidden');
  }

  el.explainList.innerHTML   = '';
  el.explainLoading.classList.add('hidden');
  el.explainModal.classList.remove('hidden');
  if (!items?.length) { el.explainList.innerHTML = '<p class="placeholder-text">解説データがありません</p>'; return; }
  renderVocabCards(items);
}

function renderVocabCards(items) {
  if (!items?.length) { el.explainList.innerHTML = '<p class="placeholder-text">解説データがありません</p>'; return; }
  el.explainList.innerHTML = items.map((item, i) => `
    <div class="vocab-card">
      <div class="vocab-header">
        <span class="vocab-num">${i + 1}</span>
        <span class="vocab-phrase">${escapeHtml(item.phrase)}</span>
        ${item.reading ? `<span class="vocab-reading">${escapeHtml(item.reading)}</span>` : ''}
      </div>
      <div class="vocab-meaning">意味：${escapeHtml(item.meaning)}</div>
      ${item.note ? `<div class="vocab-note">💡 ${escapeHtml(item.note)}</div>` : ''}
    </div>`).join('');
}

// ==================== SAVE TEXT ====================
el.saveTextBtn.addEventListener('click', saveCurrentText);

function saveCurrentText() {
  if (!state.currentText) return;
  const theme = state.selectedTextTitle || '手動入力';
  const entry = { id: Date.now(), textId: state.selectedTextId, text: state.currentText, theme, date: new Date().toISOString() };
  state.savedTexts.unshift(entry);
  if (state.savedTexts.length > 50) state.savedTexts = state.savedTexts.slice(0, 50);
  localStorage.setItem('shadowing_saved_model', JSON.stringify(state.savedTexts));
  el.saveTextBtn.textContent = '✓ 保存済み';
  el.saveTextBtn.disabled = true;
  setTimeout(() => { el.saveTextBtn.textContent = '📌 テキストを保存'; el.saveTextBtn.disabled = false; }, 2200);
}

function renderSavedTexts() {
  if (!state.savedTexts.length) {
    el.savedList.innerHTML = '<p class="placeholder-text">保存されたテキストはありません</p>';
    return;
  }
  el.savedList.innerHTML = state.savedTexts.map(item => {
    const d = new Date(item.date);
    const dateStr = d.toLocaleDateString('ja-JP') + ' ' + d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
    const preview = item.text.slice(0, 120) + (item.text.length > 120 ? '…' : '');
    return `
      <div class="history-item saved-item" data-id="${item.id}">
        <div class="hist-row">
          <div>
            <div class="hist-theme">📌 ${escapeHtml(item.theme)}</div>
            <div class="hist-date">${dateStr}</div>
          </div>
          <div class="hist-row-right">
            <button class="btn-delete-saved" data-id="${item.id}" title="このテキストを削除">🗑 削除</button>
            <button class="btn-load-text" data-id="${item.id}">練習する</button>
          </div>
        </div>
        <div class="hist-preview">${escapeHtml(preview)}</div>
      </div>`;
  }).join('');

  el.savedList.querySelectorAll('.btn-delete-saved').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      if (!confirm('このテキストを削除しますか？')) return;
      state.savedTexts = state.savedTexts.filter(s => s.id !== parseInt(btn.dataset.id));
      localStorage.setItem('shadowing_saved_model', JSON.stringify(state.savedTexts));
      renderSavedTexts();
    });
  });
  el.savedList.querySelectorAll('.btn-load-text').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const entry = state.savedTexts.find(s => s.id === parseInt(btn.dataset.id));
      if (entry) loadSavedText(entry);
    });
  });
  el.savedList.querySelectorAll('.saved-item').forEach(node => {
    node.addEventListener('click', () => {
      const entry = state.savedTexts.find(s => s.id === parseInt(node.dataset.id));
      if (entry) openSavedPreview(entry);
    });
  });
}

el.clearAllBtn.addEventListener('click', () => {
  if (!state.savedTexts.length) return;
  if (!confirm(`保存テキストを全て削除しますか？（${state.savedTexts.length}件）`)) return;
  state.savedTexts = [];
  localStorage.setItem('shadowing_saved_model', JSON.stringify(state.savedTexts));
  renderSavedTexts();
});

function loadSavedText(entry) {
  el.navBtns.forEach(b => b.classList.remove('active'));
  el.tabs.forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="practice"]').classList.add('active');
  document.getElementById('tab-practice').classList.add('active');
  state.selectedTextId    = entry.textId ?? null;
  state.selectedTextTitle = entry.theme;
  setCurrentText(entry.text);
}

function openSavedPreview(entry) {
  const d = new Date(entry.date);
  const dateStr = d.toLocaleDateString('ja-JP') + ' ' + d.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
  el.reviewMeta.textContent = `${escapeHtml(entry.theme)} — ${dateStr}`;
  el.reviewText.innerHTML = buildWordSpans(entry.text);
  el.reviewTranArea.classList.add('hidden');
  el.reviewModal.classList.remove('hidden');

  const reviewWords = Array.from(el.reviewText.querySelectorAll('.word'));
  el.reviewPlayBtn.onclick = async () => {
    if (serverHasTTS) {
      try {
        const url = await fetchTTS(entry.text, getTTSVoice());
        if (currentAudio) { currentAudio.pause(); currentAudio.src = ''; }
        const audio = new Audio(url);
        audio.playbackRate = parseFloat(el.speedSlider.value);
        currentAudio = audio;
        audio.addEventListener('ended', () => { currentAudio = null; });
        await audio.play();
      } catch (err) {
        if (err.name !== 'AbortError') console.error('[review TTS]', err.message);
      }
    } else {
      speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(entry.text);
      utt.rate = parseFloat(el.speedSlider.value); utt.lang = 'en-US';
      const voice = getSelectedVoice();
      if (voice) utt.voice = voice;
      utt.addEventListener('boundary', evt => {
        if (evt.name !== 'word') return;
        reviewWords.forEach(w => w.classList.remove('active'));
        for (const w of reviewWords) {
          if (evt.charIndex >= parseInt(w.dataset.start) && evt.charIndex < parseInt(w.dataset.end)) {
            w.classList.add('active'); break;
          }
        }
      });
      utt.addEventListener('end', () => reviewWords.forEach(w => w.classList.remove('active')));
      speechSynthesis.speak(utt);
    }
  };
  el.reviewPracticeBtn.onclick = () => {
    if (currentAudio) { currentAudio.pause(); currentAudio.src = ''; currentAudio = null; }
    speechSynthesis.cancel();
    el.reviewModal.classList.add('hidden');
    loadSavedText(entry);
  };
}

el.closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    el.reviewModal.classList.add('hidden');
    if (currentAudio) { currentAudio.pause(); currentAudio.src = ''; currentAudio = null; }
    speechSynthesis.cancel();
  });
});
el.reviewModal.addEventListener('click', e => {
  if (e.target === el.reviewModal) {
    el.reviewModal.classList.add('hidden');
    if (currentAudio) { currentAudio.pause(); currentAudio.src = ''; currentAudio = null; }
    speechSynthesis.cancel();
  }
});

// ==================== PACK MANAGER ====================
function refreshPracticeTab() {
  const cats = getActiveCategories();
  if (!cats?.length) return;
  if (!cats.find(c => c.id === state.currentCat)) state.currentCat = cats[0].id;
  buildCategoryTabs(); buildTextCards();
}

function switchToPack(id) {
  const target = getAllPacks().find(p => p.id === id);
  if (!target) return;
  if (!confirm(`「${target.name}」に切り替えますか？\n現在のテキスト選択はリセットされます。`)) return;
  localStorage.setItem('shadowing_active_pack', id);
  stopSpeech();
  state.selectedTextId = null; state.selectedTextTitle = ''; state.currentText = '';
  state.currentCat = getActiveCategories()[0]?.id || '';
  el.textDisplay.innerHTML = '<p class="placeholder-text">上でテキストを選択してください</p>';
  setControlsEnabled(false);
  const sub = document.getElementById('pack-subtitle');
  if (sub) { const p = getActivePack(); sub.textContent = `${p.icon} ${p.name}`; }
  el.navBtns.forEach(b => b.classList.remove('active'));
  el.tabs.forEach(t => t.classList.remove('active'));
  document.querySelector('[data-tab="practice"]').classList.add('active');
  document.getElementById('tab-practice').classList.add('active');
  refreshPracticeTab();
  renderPackManager();
}

function renderPackManager() {
  const packList   = document.getElementById('pack-list');
  if (!packList) return;
  const activePack = getActivePack();
  const allPacks   = getAllPacks();
  const libIds     = new Set(getPackLibrary().map(p => p.id));

  packList.innerHTML = allPacks.map(pack => {
    const isActive  = pack.id === activePack.id;
    const isLib     = libIds.has(pack.id);
    const textCount = pack.texts.length;
    const catCount  = pack.categories.length;
    const dateStr   = pack.importedAt ? new Date(pack.importedAt).toLocaleDateString('ja-JP') : null;
    return `
      <div class="pack-card${isActive ? ' pack-active' : ''}" data-pack-id="${pack.id}">
        <div class="pack-icon">${pack.icon}</div>
        <div class="pack-info">
          <div class="pack-name">
            ${escapeHtml(pack.name)}
            ${isActive ? '<span class="pack-badge-active">使用中</span>' : ''}
            ${!isLib ? '<span class="pack-badge-builtin">組み込み</span>' : '<span class="pack-badge-custom">追加済み</span>'}
          </div>
          <div class="pack-desc">${escapeHtml(pack.description)}</div>
          <div class="pack-meta">
            ${textCount}題 / ${catCount}カテゴリ
            ${pack.sourceFile ? ` &nbsp;📄 ${escapeHtml(pack.sourceFile)}` : ''}
            ${dateStr ? ` &nbsp;🗓 ${dateStr}` : ''}
          </div>
        </div>
        <div class="pack-actions">
          ${isActive
            ? '<span class="pack-in-use">✓ 選択中</span>'
            : `<button class="btn-pack-switch" data-pack-id="${pack.id}">切り替え</button>`}
          ${isLib ? `
            <button class="btn-pack-reload" data-pack-id="${pack.id}" title="再読み込み">🔄</button>
            <button class="btn-pack-delete" data-pack-id="${pack.id}" title="削除">🗑 削除</button>
          ` : ''}
        </div>
      </div>`;
  }).join('');

  packList.querySelectorAll('.btn-pack-switch').forEach(btn =>
    btn.addEventListener('click', () => switchToPack(btn.dataset.packId))
  );
  packList.querySelectorAll('.btn-pack-reload').forEach(btn =>
    btn.addEventListener('click', () => triggerHtmlImport(btn.dataset.packId))
  );
  packList.querySelectorAll('.btn-pack-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.packId;
      const pack = getAllPacks().find(p => p.id === id);
      if (!pack) return;
      if (!confirm(`「${pack.name}」を削除しますか？`)) return;
      const lib = getPackLibrary().filter(p => p.id !== id);
      savePackLibrary(lib);
      if (getActivePack().id === id) {
        localStorage.setItem('shadowing_active_pack', 'default');
        state.selectedTextId = null; state.selectedTextTitle = ''; state.currentText = '';
        el.textDisplay.innerHTML = '<p class="placeholder-text">上でテキストを選択してください</p>';
        setControlsEnabled(false);
        const sub = document.getElementById('pack-subtitle');
        if (sub) { const p = getActivePack(); sub.textContent = `${p.icon} ${p.name}`; }
        el.navBtns.forEach(b => b.classList.remove('active'));
        el.tabs.forEach(t => t.classList.remove('active'));
        document.querySelector('[data-tab="practice"]').classList.add('active');
        document.getElementById('tab-practice').classList.add('active');
        refreshPracticeTab();
      }
      renderPackManager();
    });
  });
}

// ==================== PACK HTML IMPORT ====================
let _reloadTargetPackId = null;

function triggerHtmlImport(reloadPackId = null) {
  _reloadTargetPackId = reloadPackId || null;
  const input = document.getElementById('pack-file-input');
  if (input) { input.value = ''; input.click(); }
}

function importPackFromHtml(file) {
  const reader = new FileReader();
  reader.onload = e => {
    const html = e.target.result;
    const data = extractDataFromHtml(html);
    if (!data || !Object.keys(data).length) {
      alert(`「${file.name}」から対話データを読み取れませんでした。`);
      _reloadTargetPackId = null; return;
    }
    const lib      = getPackLibrary();
    const isReload = !!_reloadTargetPackId;
    const existing = isReload
      ? lib.find(p => p.id === _reloadTargetPackId)
      : lib.find(p => p.sourceFile === file.name);

    if (existing && !isReload) {
      if (!confirm(`「${existing.name}」は既に読み込み済みです。上書き更新しますか？`)) {
        _reloadTargetPackId = null; return;
      }
    }

    const idBase = existing
      ? (existing.texts.reduce((m, t) => Math.max(m, t.id), 900000) + 1)
      : nextIdBase();
    const { categories, texts, explanations, translations } = dataToPackTexts(data, idBase);
    const { name, icon } = guessPackMeta(html, file.name);

    const pack = {
      id:          existing ? existing.id : `imported_${Date.now()}`,
      name:        existing ? existing.name : name,
      description: `${texts.length}題 — ${file.name}`,
      icon:        existing ? existing.icon : icon,
      sourceFile:  file.name,
      importedAt:  new Date().toISOString(),
      categories, texts, explanations, translations,
    };

    if (existing) lib[lib.findIndex(p => p.id === existing.id)] = pack;
    else lib.push(pack);
    savePackLibrary(lib);

    if (getActivePack().id === pack.id) {
      state.currentCat = pack.categories[0]?.id || '';
      buildCategoryTabs(); buildTextCards();
    }
    renderPackManager();
    alert(`「${pack.name}」を${existing ? '更新' : '追加'}しました（${texts.length}題）。`);
    _reloadTargetPackId = null;
  };
  reader.readAsText(file, 'utf-8');
}

// ==================== SERVER PACK KEY ACTIVATION ====================
function togglePackKeySection() {
  const sec = document.getElementById('pack-key-section');
  if (!sec) return;
  sec.classList.toggle('hidden');
  if (!sec.classList.contains('hidden')) {
    document.getElementById('pack-key-input')?.focus();
  }
}

// パックキー入力の自動フォーマット
const packKeyInput = document.getElementById('pack-key-input');
if (packKeyInput) {
  packKeyInput.addEventListener('input', e => {
    let v = e.target.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 16);
    const parts = [];
    if (v.length > 0)  parts.push(v.slice(0, 4));
    if (v.length > 4)  parts.push(v.slice(4, 8));
    if (v.length > 8)  parts.push(v.slice(8, 12));
    if (v.length > 12) parts.push(v.slice(12, 16));
    e.target.value = parts.join('-');
  });
  packKeyInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') activatePackKey();
  });
}

async function activatePackKey() {
  const inp  = document.getElementById('pack-key-input');
  const btn  = document.getElementById('pack-key-btn');
  const errD = document.getElementById('pack-key-error');
  const sucD = document.getElementById('pack-key-success');
  const key  = inp?.value?.trim();

  if (errD) { errD.classList.add('hidden'); errD.textContent = ''; }
  if (sucD) { sucD.classList.add('hidden'); sucD.textContent = ''; }

  if (!key || key.replace(/-/g, '').length < 12) {
    if (errD) { errD.textContent = 'キーを正しく入力してください'; errD.classList.remove('hidden'); }
    return;
  }

  if (btn) { btn.disabled = true; btn.textContent = '確認中…'; }

  try {
    const result = await ShadowingAuth.activatePack(key);
    // パックコンテンツをサーバーから取得して保存
    if (sucD) { sucD.textContent = 'パックデータを取得中…'; sucD.classList.remove('hidden'); }
    const packData = await ShadowingAuth.fetchPackContent(result.packId);

    // サーバーパックをローカルパックライブラリに追加
    const lib = getPackLibrary();
    const existing = lib.find(p => p.id === `server_${result.packId}`);
    const pack = {
      id:          `server_${result.packId}`,
      name:        packData.name || result.packName || result.packId,
      description: packData.description || `${packData.texts?.length || 0}題`,
      icon:        packData.icon || '📦',
      sourceFile:  null,
      importedAt:  new Date().toISOString(),
      categories:   packData.categories  || [],
      texts:        packData.texts       || [],
      explanations: packData.explanations || {},
      translations: packData.translations || {},
    };
    if (existing) lib[lib.findIndex(p => p.id === pack.id)] = pack;
    else lib.push(pack);
    savePackLibrary(lib);

    if (inp) inp.value = '';
    if (sucD) { sucD.textContent = `✓ 「${pack.name}」をアンロックしました（${pack.texts.length}題）`; }
    renderPackManager();
    setTimeout(() => {
      document.getElementById('pack-key-section')?.classList.add('hidden');
      if (sucD) sucD.classList.add('hidden');
    }, 3000);
  } catch (err) {
    if (errD) { errD.textContent = err.message; errD.classList.remove('hidden'); }
  } finally {
    if (btn) { btn.disabled = false; btn.textContent = 'アンロック'; }
  }
}

// ==================== SETTINGS TAB ====================
function renderSettingsTab() {
  const licDiv = document.getElementById('settings-license-info');
  const devDiv = document.getElementById('settings-device-info');

  const deviceId = ShadowingAuth.getDeviceId();
  if (devDiv) {
    devDiv.innerHTML = `
      <div class="info-row"><span class="info-label">デバイス ID</span><span class="info-value mono">${deviceId.slice(0, 8)}…${deviceId.slice(-4)}</span></div>
      <div class="info-row"><span class="info-label">ブラウザ</span><span class="info-value">${navigator.userAgent.split(')')[0].split('(')[1] || navigator.userAgent.slice(0, 40)}</span></div>
      <div class="info-row"><span class="info-label">ストレージ使用</span><span class="info-value">${getStorageUsage()}</span></div>
    `;
  }

  if (!licDiv) return;
  const token = ShadowingAuth.getAuthToken();
  if (!token) { licDiv.innerHTML = '<p class="placeholder-text">未認証</p>'; return; }

  // まずローカル情報を即時表示
  const local = ShadowingAuth.getLicenseInfo();
  licDiv.innerHTML = `
    <div class="info-row"><span class="info-label">ステータス</span><span class="info-value status-ok">✓ 認証済み</span></div>
    <div class="info-row"><span class="info-label">プロダクト</span><span class="info-value">ベースライセンス</span></div>
    <div class="info-row"><span class="info-label">有効期限</span><span class="info-value">${local?.exp ? new Date(local.exp * 1000).toLocaleDateString('ja-JP') : '—'}</span></div>
    <div class="info-row"><span class="info-label">使用台数</span><span class="info-value" id="lic-activations">確認中…</span></div>
  `;

  // サーバーから使用台数を取得
  fetch('/api/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, deviceId })
  }).then(r => r.json()).then(data => {
    const el2 = document.getElementById('lic-activations');
    if (el2 && data.activationsUsed !== undefined) {
      el2.textContent = `${data.activationsUsed} / ${data.activationsUsed + (data.activationsLeft || 0)} 台`;
    }
  }).catch(() => {
    const el2 = document.getElementById('lic-activations');
    if (el2) el2.textContent = 'オフライン（確認不可）';
  });
}

function getStorageUsage() {
  try {
    let total = 0;
    for (const key of Object.keys(localStorage)) {
      total += (localStorage.getItem(key) || '').length * 2;
    }
    return total > 1024 * 1024
      ? `${(total / 1024 / 1024).toFixed(1)} MB`
      : `${(total / 1024).toFixed(0)} KB`;
  } catch { return '—'; }
}

// ==================== SETTINGS ACTIONS ====================
function doLogout() {
  if (!confirm('このデバイスの認証を解除しますか？\n再度使用するにはライセンスキーの入力が必要です。')) return;
  ShadowingAuth.logout();
  window.location.reload();
}

function doExportBackup() {
  const { savedTexts, packs } = ShadowingBackup.exportBackup();
  showBackupMsg(`✓ エクスポート完了（保存テキスト ${savedTexts}件・パック ${packs}件）`, false);
}

async function doImportBackup(file) {
  const msg = document.getElementById('backup-msg');
  try {
    const data = await ShadowingBackup.importBackup(file);
    const date = data.exportedAt ? new Date(data.exportedAt).toLocaleDateString('ja-JP') : '?';
    if (!confirm(`バックアップを復元しますか？\n\n保存テキスト: ${data.savedTexts.length}件\nパック: ${data.packLibrary.length}件\nエクスポート日: ${date}\n\n現在のデータは上書きされます。`)) return;
    ShadowingBackup.applyBackup(data);
    // state を更新
    state.savedTexts = data.savedTexts;
    showBackupMsg(`✓ 復元完了（保存テキスト ${data.savedTexts.length}件・パック ${data.packLibrary.length}件）`, false);
    renderSettingsTab();
  } catch (err) {
    showBackupMsg(`エラー: ${err.message}`, true);
  }
}

function showBackupMsg(text, isError) {
  const d = document.getElementById('backup-msg');
  if (!d) return;
  d.textContent = text;
  d.className = `backup-msg ${isError ? 'backup-msg-error' : 'backup-msg-ok'}`;
  d.classList.remove('hidden');
  setTimeout(() => d.classList.add('hidden'), 5000);
}

// window に公開（inline onclick 用）
window.triggerHtmlImport  = triggerHtmlImport;
window.importPackFromHtml = importPackFromHtml;
window.togglePackKeySection = togglePackKeySection;
window.activatePackKey    = activatePackKey;
window.doLogout           = doLogout;
window.doExportBackup     = doExportBackup;
window.doImportBackup     = doImportBackup;

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    if (state.currentText) {
      if (speechSynthesis.paused) resumeSpeech();
      else if (state.isPlaying) pauseSpeech();
      else startSpeech();
    }
  }
  if (e.code === 'KeyR' && !e.ctrlKey && !e.metaKey && !e.altKey) {
    if (!el.recordBtn.disabled) {
      if (state.isRecording) stopRecording(); else startRecording();
    }
  }
});

// ==================== UTILS ====================
function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
function shake(element) {
  element.classList.remove('shake');
  void element.offsetWidth;
  element.classList.add('shake');
  setTimeout(() => element.classList.remove('shake'), 500);
}

window.addEventListener('beforeunload', () => {
  speechSynthesis.cancel();
  if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
    try { state.mediaRecorder.stop(); } catch { /* ignore */ }
  }
  if (state.recognition) {
    try { state.recognition.stop(); } catch { /* ignore */ }
  }
});
