/**
 * generate-materials.mjs
 * 各パックの補助教材TXTファイルを生成する
 *
 * 出力: docs/materials/{pack_id}.txt
 * 内容: 英文 + 日本語訳 + フレーズ解説
 *
 * 使い方: node tools/generate-materials.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const OUT_DIR   = join(ROOT, 'docs', 'materials');

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// ── ヘルパー ──────────────────────────────────────────────────────────────────

function loadJSON(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

// CommonJS形式のJSファイルをevalで読み込む
function loadCommonJS(path) {
  const src = readFileSync(path, 'utf-8')
    .replace(/^'use strict';\s*/, '')
    .replace(/\bconst\b/g, 'var')
    .replace(/\blet\b/g, 'var');
  const module = { exports: {} };
  // eslint-disable-next-line no-new-func
  new Function('module', 'exports', src)(module, module.exports);
  return module.exports;
}

// texts.js / explanations.js を読み込む
function loadTextsJs() {
  const src = readFileSync(join(ROOT, 'public', 'texts.js'), 'utf-8');
  // CATEGORIES と PRACTICE_TEXTS を抽出
  const catMatch = src.match(/const CATEGORIES\s*=\s*(\[[\s\S]*?\]);/);
  const txtMatch = src.match(/const PRACTICE_TEXTS\s*=\s*(\[[\s\S]*\]);?\s*$/m);
  const categories  = eval(catMatch[1]);  // eslint-disable-line no-eval
  const texts       = eval(txtMatch[1]);  // eslint-disable-line no-eval
  return { categories, texts };
}

function loadExplanationsJs() {
  const src = readFileSync(join(ROOT, 'public', 'explanations.js'), 'utf-8');
  const m = src.match(/const EXPLANATIONS\s*=\s*(\{[\s\S]*\});/);
  return eval('(' + m[1] + ')');  // eslint-disable-line no-eval
}

// ── テキスト整形 ─────────────────────────────────────────────────────────────

function wrap(text, width = 80) {
  // 改行を尊重しつつ長い行を折り返す
  return text.split('\n').map(line => {
    if (line.length <= width) return line;
    const words = line.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      if ((cur + (cur ? ' ' : '') + w).length > width) {
        if (cur) lines.push(cur);
        cur = w;
      } else {
        cur += (cur ? ' ' : '') + w;
      }
    }
    if (cur) lines.push(cur);
    return lines.join('\n');
  }).join('\n');
}

function divider(char = '─', len = 72) {
  return char.repeat(len);
}

function sectionHeader(title) {
  return `\n${'═'.repeat(72)}\n  ${title}\n${'═'.repeat(72)}\n`;
}

function numberLabel(n, total) {
  return `[${String(n).padStart(String(total).length, '0')} / ${total}]`;
}

// ── 1テキスト分のブロックを生成 ───────────────────────────────────────────────

function buildTextBlock(text, textJa, explanations, index, total) {
  const lines = [];

  // --- タイトル行 ---
  lines.push(divider('─'));
  lines.push(`${numberLabel(index, total)}  ${text.title}  ／  ${text.titleJa}`);
  lines.push(divider('─'));
  lines.push('');

  // --- 英文 ---
  lines.push('【英文】');
  lines.push(wrap(text.text));
  lines.push('');

  // --- 日本語訳 ---
  lines.push('【日本語訳】');
  if (textJa) {
    lines.push(wrap(textJa));
  } else {
    lines.push('（訳なし）');
  }
  lines.push('');

  // --- フレーズ解説 ---
  if (explanations && explanations.length > 0) {
    lines.push('【フレーズ・単語解説】');
    for (const ex of explanations) {
      const reading = ex.reading ? `  ／  ${ex.reading}` : '';
      lines.push(`  ▶ ${ex.phrase}${reading}`);
      lines.push(`      意味：${ex.meaning}`);
      if (ex.note) {
        lines.push(`      解説：${ex.note}`);
      }
      lines.push('');
    }
  } else {
    lines.push('');
  }

  return lines.join('\n');
}

// ── デフォルトパック（100題）を生成 ──────────────────────────────────────────

function generateDefault() {
  console.log('  [default] 読み込み中...');
  const { categories, texts } = loadTextsJs();
  const explanations = loadExplanationsJs();
  const translations = loadJSON(join(ROOT, 'translations', 'default.json'));

  const lines = [];

  // 表紙
  lines.push('╔' + '═'.repeat(70) + '╗');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + '  英会話シャドウイング  ──  標準100題  補助教材'.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + '  英文 ／ 日本語訳 ／ フレーズ解説'.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + '  ※ 本資料はライセンス購入者専用です。再配布・転載禁止'.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('╚' + '═'.repeat(70) + '╝');
  lines.push('');

  // カテゴリ目次
  lines.push('【カテゴリ一覧】');
  categories.forEach((cat, i) => {
    const catTexts = texts.filter(t => t.category === cat.id);
    lines.push(`  ${cat.icon} ${cat.label}  （${catTexts.length}題）`);
  });
  lines.push('');

  // カテゴリ別に出力
  for (const cat of categories) {
    const catTexts = texts.filter(t => t.category === cat.id);
    lines.push(sectionHeader(`${cat.icon}  ${cat.label}  （全${catTexts.length}題）`));

    catTexts.forEach((text, i) => {
      const ja  = translations[String(text.id)] || null;
      const exp = explanations[text.id]         || null;
      lines.push(buildTextBlock(text, ja, exp, i + 1, catTexts.length));
    });
  }

  const output = lines.join('\n');
  const outPath = join(OUT_DIR, 'default.txt');
  writeFileSync(outPath, output, 'utf-8');
  console.log(`  [default] → ${outPath}  (${Math.round(output.length / 1024)}KB)`);
}

// ── パックJSONを生成 ──────────────────────────────────────────────────────────

function generatePack(packId) {
  console.log(`  [${packId}] 読み込み中...`);
  const pack        = loadJSON(join(ROOT, 'packs', `${packId}.json`));
  const translations = loadJSON(join(ROOT, 'translations', `${packId}.json`));

  const lines = [];

  // 表紙
  const packName = `${pack.icon || '📦'}  ${pack.name}`;
  lines.push('╔' + '═'.repeat(70) + '╗');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + `  英会話シャドウイング  ──  ${packName}  補助教材`.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + '  英文 ／ 日本語訳 ／ フレーズ解説'.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('║' + '  ※ 本資料はライセンス購入者専用です。再配布・転載禁止'.padEnd(70) + '║');
  lines.push('║' + ' '.repeat(70) + '║');
  lines.push('╚' + '═'.repeat(70) + '╝');
  lines.push('');

  if (pack.description) {
    lines.push(`【パック説明】  ${pack.description}`);
    lines.push('');
  }

  // カテゴリ目次
  if (pack.categories && pack.categories.length > 0) {
    lines.push('【カテゴリ一覧】');
    pack.categories.forEach(cat => {
      const catTexts = pack.texts.filter(t => t.category === cat.id);
      lines.push(`  ${cat.icon || ''}  ${cat.label}  （${catTexts.length}題）`);
    });
    lines.push('');

    // カテゴリ別に出力
    for (const cat of pack.categories) {
      const catTexts = pack.texts.filter(t => t.category === cat.id);
      if (!catTexts.length) continue;
      lines.push(sectionHeader(`${cat.icon || ''}  ${cat.label}  （全${catTexts.length}題）`));

      catTexts.forEach((text, i) => {
        const ja  = translations[String(text.id)] || null;
        const exp = pack.explanations?.[text.id]  || null;
        lines.push(buildTextBlock(text, ja, exp, i + 1, catTexts.length));
      });
    }
  } else {
    // カテゴリなし
    pack.texts.forEach((text, i) => {
      const ja  = translations[String(text.id)] || null;
      const exp = pack.explanations?.[text.id]  || null;
      lines.push(buildTextBlock(text, ja, exp, i + 1, pack.texts.length));
    });
  }

  const output = lines.join('\n');
  const outPath = join(OUT_DIR, `${packId}.txt`);
  writeFileSync(outPath, output, 'utf-8');
  console.log(`  [${packId}] → ${outPath}  (${Math.round(output.length / 1024)}KB)`);
}

// ── メイン ────────────────────────────────────────────────────────────────────

console.log('\n🗂  補助教材TXTファイル生成開始...\n');

generateDefault();

const PACK_IDS = [
  'travel_vol1',
  'travel_vol2',
  'toeic',
  'jiji_vol1',
  'jiji_vol2',
  'hotel',
];

for (const id of PACK_IDS) {
  generatePack(id);
}

console.log('\n✅ 全ファイル生成完了！');
console.log(`   出力先: docs/materials/\n`);
