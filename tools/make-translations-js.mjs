/**
 * translations/default.json → public/translations.js
 * 各パックJSONに translations フィールドを追加
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ── 1) public/translations.js（デフォルトパック用） ───────────────────────────

const defaultTrans = JSON.parse(readFileSync(join(ROOT, 'translations', 'default.json'), 'utf8'));

let jsOut = "'use strict';\n\n/**\n * デフォルト100題の日本語訳\n * key = text id (101–520)\n */\nconst TRANSLATIONS = {\n";
for (const [k, v] of Object.entries(defaultTrans)) {
  // シングルクォート内に安全に埋め込む（改行は \n に変換）
  const safe = v
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r\n/g, '\\n')
    .replace(/\r/g, '\\n')
    .replace(/\n/g, '\\n');
  jsOut += `  ${k}: '${safe}',\n`;
}
jsOut += '};\n';

writeFileSync(join(ROOT, 'public', 'translations.js'), jsOut, 'utf8');
console.log('✓ public/translations.js  (' + Object.keys(defaultTrans).length + ' entries)');

// ── 2) 各パックJSONに translations フィールドを追加 ───────────────────────────

const PACKS = ['travel_vol1', 'travel_vol2', 'toeic', 'jiji_vol1', 'jiji_vol2', 'hotel'];

for (const packId of PACKS) {
  const packPath  = join(ROOT, 'packs', `${packId}.json`);
  const transPath = join(ROOT, 'translations', `${packId}.json`);

  const pack  = JSON.parse(readFileSync(packPath, 'utf8'));
  const trans = JSON.parse(readFileSync(transPath, 'utf8'));

  // 数値キーに変換して格納
  const transNumeric = {};
  for (const [k, v] of Object.entries(trans)) {
    transNumeric[parseInt(k, 10)] = v;
  }
  pack.translations = transNumeric;

  writeFileSync(packPath, JSON.stringify(pack, null, 2), 'utf8');
  console.log(`✓ packs/${packId}.json  (${Object.keys(trans).length} translations added)`);
}

console.log('\n全完了');
