#!/usr/bin/env node
/**
 * 管理ツール
 *
 * 使い方:
 *   node tools/admin.mjs list                    # 全ライセンス一覧
 *   node tools/admin.mjs list pack:hotel          # 特定プロダクトのみ
 *   node tools/admin.mjs revoke <key>             # キーのデバイス認証を全取り消し
 *   node tools/admin.mjs revoke-device <key> <deviceId>  # 特定デバイスのみ取り消し
 *   node tools/admin.mjs delete <key>             # キーをDBから削除
 */

import crypto from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_FILE   = join(__dirname, '..', 'data', 'licenses.json');

function loadDB() {
  try { return JSON.parse(readFileSync(DB_FILE, 'utf8')); }
  catch { console.error('licenses.json が見つかりません'); process.exit(1); }
}
function saveDB(db) { writeFileSync(DB_FILE, JSON.stringify(db, null, 2)); }
function hashKey(key) {
  return crypto.createHash('sha256').update(key.trim().toUpperCase()).digest('hex');
}

const [cmd, arg1, arg2] = process.argv.slice(2);

if (!cmd || cmd === 'list') {
  const db     = loadDB();
  const filter = arg1 || null;
  const lics   = Object.entries(db.licenses);
  const rows   = filter ? lics.filter(([, v]) => v.product === filter) : lics;

  if (!rows.length) { console.log('ライセンスがありません'); process.exit(0); }

  console.log(`\nライセンス一覧 (${rows.length}件)`);
  console.log('─'.repeat(72));
  for (const [, lic] of rows) {
    const used = Object.keys(lic.activations || {}).length;
    const max  = lic.maxActivations || 3;
    const bar  = '█'.repeat(used) + '░'.repeat(max - used);
    const date = lic.createdAt?.slice(0, 10) || '?';
    console.log(`[${lic.product.padEnd(14)}] ${bar} ${used}/${max}台  ${date}  ${lic.note || ''}`);

    for (const [did, act] of Object.entries(lic.activations || {})) {
      console.log(`    device: ${did.slice(0, 20)}…  最終: ${act.lastSeenAt?.slice(0, 16)}`);
    }
  }
  console.log('');

} else if (cmd === 'revoke') {
  if (!arg1) { console.error('キーを指定してください'); process.exit(1); }
  const db  = loadDB();
  const kh  = hashKey(arg1);
  const lic = db.licenses[kh];
  if (!lic) { console.error('キーが見つかりません'); process.exit(1); }
  const count = Object.keys(lic.activations || {}).length;
  lic.activations = {};
  db.licenses[kh] = lic;
  saveDB(db);
  console.log(`✓ ${count}台のデバイス認証を取り消しました`);

} else if (cmd === 'revoke-device') {
  if (!arg1 || !arg2) { console.error('キーとデバイスIDを指定してください'); process.exit(1); }
  const db  = loadDB();
  const kh  = hashKey(arg1);
  const lic = db.licenses[kh];
  if (!lic) { console.error('キーが見つかりません'); process.exit(1); }
  if (!lic.activations?.[arg2]) { console.error('デバイスIDが見つかりません'); process.exit(1); }
  delete lic.activations[arg2];
  db.licenses[kh] = lic;
  saveDB(db);
  console.log(`✓ デバイス ${arg2} の認証を取り消しました`);

} else if (cmd === 'delete') {
  if (!arg1) { console.error('キーを指定してください'); process.exit(1); }
  const db = loadDB();
  const kh = hashKey(arg1);
  if (!db.licenses[kh]) { console.error('キーが見つかりません'); process.exit(1); }
  delete db.licenses[kh];
  saveDB(db);
  console.log('✓ キーを削除しました');

} else {
  console.error(`不明なコマンド: ${cmd}`);
  process.exit(1);
}
