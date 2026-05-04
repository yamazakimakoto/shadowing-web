#!/usr/bin/env node
/**
 * ライセンスキー生成ツール（CLIバージョン）
 *
 * 使い方:
 *   node tools/gen-license.mjs <product> [count] [note] [maxActivations]
 *
 * product（単品）:
 *   base              - ベースアプリ ライセンス
 *   pack:travel_vol1  - 海外旅行パック vol.1（空港・ホテル）
 *   pack:travel_vol2  - 海外旅行パック vol.2（レストラン・観光）
 *   pack:toeic        - TOEICパック（ビジネス英語）
 *
 * product（バンドル — 複数キーを一括発行）:
 *   bundle:travel_set  - 本体 + 旅行vol.1 + 旅行vol.2
 *   bundle:toeic_set   - 本体 + TOEICパック
 *   bundle:jiji_set    - 本体 + 時事vol.1 + 時事vol.2
 *   bundle:hotel_set   - 本体 + ホテル英語パック
 *   bundle:all         - 本体 + 旅行vol.1 + vol.2 + TOEIC + 時事vol.1 + vol.2 + ホテル
 *
 * 例:
 *   node tools/gen-license.mjs base 1 "Booth注文#1234"
 *   node tools/gen-license.mjs pack:travel_vol1 3
 *   node tools/gen-license.mjs bundle:travel_set 1 "Booth注文#5678"
 *   node tools/gen-license.mjs base 1 "" 1   # 1台のみ許可
 *
 * ⚠️ 本番サーバーのデータに反映するにはRender.comのShellから実行してください
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

// ── バンドル定義 ──
const BUNDLES = {
  'bundle:travel_set': ['base', 'pack:travel_vol1', 'pack:travel_vol2'],
  'bundle:toeic_set':  ['base', 'pack:toeic'],
  'bundle:jiji_set':   ['base', 'pack:jiji_vol1', 'pack:jiji_vol2'],
  'bundle:hotel_set':  ['base', 'pack:hotel'],
  'bundle:all':        ['base', 'pack:travel_vol1', 'pack:travel_vol2', 'pack:toeic', 'pack:jiji_vol1', 'pack:jiji_vol2', 'pack:hotel']
};

const PRODUCT_LABELS = {
  'base':             '【本体】ベースライセンス',
  'pack:travel_vol1': '【パック】海外旅行 vol.1',
  'pack:travel_vol2': '【パック】海外旅行 vol.2',
  'pack:toeic':       '【パック】TOEICパック',
  'pack:jiji_vol1':   '【パック】時事英語 vol.1',
  'pack:jiji_vol2':   '【パック】時事英語 vol.2',
  'pack:hotel':       '【パック】ホテル英語'
};

const [product = 'base', countStr = '1', note = '', maxStr = '5'] = process.argv.slice(2);
const count          = Math.max(1, parseInt(countStr) || 1);
const maxActivations = Math.max(1, parseInt(maxStr)   || 5);

const db = loadDB();

// ── バンドル発行 ──
if (BUNDLES[product]) {
  const products = BUNDLES[product];
  console.log(`\n🎁 バンドル発行: ${product} × ${count}セット`);
  if (note) console.log(`   備考: ${note}`);
  console.log('─'.repeat(60));

  for (let i = 0; i < count; i++) {
    if (count > 1) console.log(`\n── セット ${i + 1} ──`);
    const setKeys = [];
    for (const p of products) {
      const key = genKey();
      const kh  = hashKey(key);
      db.licenses[kh] = {
        product:        p,
        maxActivations,
        createdAt:      new Date().toISOString(),
        note:           note || '',
        activations:    {}
      };
      const label = PRODUCT_LABELS[p] || p;
      console.log(`  ${label.padEnd(25)} ${key}`);
      setKeys.push({ product: p, key });
    }
  }
  console.log('─'.repeat(60));
  console.log(`\n✓ ${count}セット分を ${DB_FILE} に保存しました`);
  console.log('⚠️  本番反映にはRender.comのShellで実行してください\n');
  saveDB(db);
  process.exit(0);
}

// ── 単品発行 ──
console.log(`\n生成: ${product} × ${count}件  最大${maxActivations}台/キー`);
if (note) console.log(`備考: ${note}`);
console.log('─'.repeat(40));

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
  console.log(key);
}

saveDB(db);
console.log('─'.repeat(40));
console.log(`✓ ${count}件を ${DB_FILE} に保存しました`);
console.log('⚠️  本番反映にはRender.comのShellで実行してください\n');
