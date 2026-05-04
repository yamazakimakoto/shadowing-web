#!/usr/bin/env node
/**
 * ライセンスキー生成ツール
 *
 * 使い方:
 *   node tools/gen-license.mjs <product> [count] [note] [maxActivations]
 *
 * product:
 *   base           - ベースアプリ ライセンス
 *   pack:hotel     - ホテル英語パック
 *   pack:toeic     - TOEIC スピーキングパック
 *   pack:travel    - 旅行英語パック
 *   pack:jiji_vol1 - 時事英語 vol.1
 *   pack:jiji_vol2 - 時事英語 vol.2
 *
 * 例:
 *   node tools/gen-license.mjs base 10
 *   node tools/gen-license.mjs pack:hotel 5 "Booth注文#1234"
 *   node tools/gen-license.mjs base 1 "" 1   # 1台のみ許可
 */

import crypto from 'crypto';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR  = join(__dirname, '..', 'data');
const DB_FILE   = join(DATA_DIR, 'licenses.json');

if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });

function loadDB() {
  try { return JSON.parse(readFileSync(DB_FILE, 'utf8')); }
  catch { return { licenses: {} }; }
}
function saveDB(db) { writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
function hashKey(key) {
  return crypto.createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
}

// SHAD-XXXX-XXXX-XXXX（紛らわしい文字を除外: 0/O, 1/I/L）
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

const [product = 'base', countStr = '1', note = '', maxStr = '3'] = process.argv.slice(2);
const count          = Math.max(1, parseInt(countStr) || 1);
const maxActivations = Math.max(1, parseInt(maxStr)   || 3);

const db = loadDB();

console.log(`\n生成: ${product} × ${count}件  最大${maxActivations}台/キー`);
if (note) console.log(`備考: ${note}`);
console.log('─'.repeat(40));

const generated = [];
for (let i = 0; i < count; i++) {
  const key = genKey();
  const kh  = hashKey(key);
  db.licenses[kh] = {
    product,
    maxActivations,
    createdAt:   new Date().toISOString(),
    note:        note || '',
    activations: {}
  };
  generated.push(key);
  console.log(key);
}

saveDB(db);
console.log('─'.repeat(40));
console.log(`✓ ${count}件を ${DB_FILE} に保存しました\n`);
