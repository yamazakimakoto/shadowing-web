import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATA_DIR  = process.env.DATA_DIR || join(__dirname, 'data');
const PACKS_DIR = join(DATA_DIR, 'packs');
const DB_FILE   = join(DATA_DIR, 'licenses.json');
const SEC_FILE  = join(DATA_DIR, '.jwt_secret');

if (!existsSync(DATA_DIR))  mkdirSync(DATA_DIR,  { recursive: true });
if (!existsSync(PACKS_DIR)) mkdirSync(PACKS_DIR, { recursive: true });

// JWT シークレット（初回起動時に自動生成・保存）
let JWT_SECRET;
if (existsSync(SEC_FILE)) {
  JWT_SECRET = readFileSync(SEC_FILE, 'utf8').trim();
} else {
  JWT_SECRET = crypto.randomBytes(48).toString('base64');
  writeFileSync(SEC_FILE, JWT_SECRET, { mode: 0o600 });
  console.log('✓ JWTシークレットを生成しました');
}

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
function signToken(payload, expiresIn = '90d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
function verifyJwt(token) {
  try { return jwt.verify(token, JWT_SECRET); } catch { return null; }
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

// ── Express ──
const app = express();
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

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
    // 同デバイス再認証 — カウント不変
    acts[deviceId].lastSeenAt = now;
  } else {
    const used = Object.keys(acts).length;
    const max  = lic.maxActivations || 3;
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
  const max   = lic.maxActivations || 3;
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
  const max  = lic.maxActivations || 3;
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
    const max  = lic.maxActivations || 3;
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
  console.log(`\n   ライセンス生成コマンド:`);
  console.log(`     node tools/gen-license.mjs base 1`);
  console.log(`     node tools/gen-license.mjs pack:hotel 1 "Booth注文番号"`);
  console.log(`\n   管理ツール:`);
  console.log(`     node tools/admin.mjs list       # ライセンス一覧`);
  console.log(`     node tools/admin.mjs revoke <key>  # 認証取り消し\n`);
});
