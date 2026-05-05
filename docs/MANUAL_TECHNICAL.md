# テクニカルマニュアル — shadowing-web（モデル版）

## 概要

英会話シャドウイング練習アプリのモデル版。事前に作成された練習テキスト（パック）を使用し、ライセンスキーによるアクセス制御を行う。AI版（shadowing-ai-sub）とは独立したコードベース。

---

## アーキテクチャ

```
ブラウザ（クライアント）
  ├── index.html       メインUI・認証オーバーレイ
  ├── app.js           アプリロジック（TTS・録音・パック管理）
  ├── auth.js          ライセンス認証フロー
  ├── style.css        スタイル
  ├── texts.js         デフォルト100題テキスト
  ├── explanations.js  フレーズ解説データ
  └── translations.js  日本語訳データ
        ↕ HTTP (REST API)
Express サーバー（server.js）
  ├── /api/*           ユーザー向けAPI
  ├── /admin/api/*     管理者API（Bearer JWT）
  ├── tts-cache.js     TTS ディスクキャッシュ
  └── data/
        ├── licenses.json   ライセンスDB（JSON）
        ├── .jwt_secret     JWT署名シークレット
        └── packs/          パックJSONデータ
              ↕ HTTP
OpenAI TTS API（外部）
```

---

## ディレクトリ構成

```
shadowing-web/
├── server.js              Expressサーバー（全APIエンドポイント）
├── tts-cache.js           TTS ディスクキャッシュ（SHA256キー）
├── package.json           npm設定（ES Module）
├── render.yaml            Render.com デプロイ設定
├── .env                   環境変数（git除外）
├── .gitignore
│
├── public/                静的ファイル（Express.static）
│   ├── index.html
│   ├── app.js             1659行・メインロジック
│   ├── auth.js            ライセンス認証UI
│   ├── style.css
│   ├── backup.js          データバックアップ
│   ├── packs.js           パック管理
│   ├── texts.js           デフォルトテキスト
│   ├── explanations.js    解説データ（201KB）
│   ├── translations.js    翻訳データ
│   └── admin/
│       └── index.html     管理画面
│
├── packs/                 パックJSONマスタ（初回自動コピー→data/packs/）
│   ├── hotel.json
│   ├── toeic.json
│   ├── travel_vol1.json
│   ├── travel_vol2.json
│   ├── jiji_vol1.json
│   └── jiji_vol2.json
│
├── tools/                 CLIユーティリティ
│   ├── gen-license.mjs    ライセンスキー生成
│   ├── admin.mjs          ライセンス管理CLI
│   ├── make-translations-js.mjs
│   └── generate-materials.mjs
│
├── docs/                  ドキュメント
│   ├── MANUAL_TECHNICAL.md（本ファイル）
│   ├── MANUAL_USER.md
│   ├── MANUAL_ADMIN.md
│   └── email-*.txt        販売メールテンプレート
│
└── data/                  サーバーデータ（git除外）
    ├── licenses.json
    ├── .jwt_secret
    ├── packs/
    └── tts-cache/         TTS音声キャッシュ（本番: /data/tts-cache）
```

---

## 環境変数

| 変数名 | 必須 | 説明 | デフォルト |
|--------|------|------|-----------|
| `OPENAI_API_KEY` | 任意 | OpenAI TTS API キー。未設定時は Web Speech API フォールバック | なし |
| `ADMIN_PASSWORD` | 推奨 | 管理画面ログインパスワード。未設定時は管理画面無効 | なし |
| `NODE_ENV` | 任意 | `production` でTTSキャッシュを `/data/tts-cache` に保存 | development |
| `DATA_DIR` | 任意 | データディレクトリパス | `./data` |
| `PORT` | 任意 | リッスンポート | `3003` |
| `TTS_CACHE_DIR` | 任意 | TTSキャッシュ保存先（明示指定） | NODE_ENVで自動決定 |
| `TTS_CACHE_MAX_MB` | 任意 | TTSキャッシュ最大容量（MB） | `400` |

`.env` ファイル例:
```
OPENAI_API_KEY=sk-proj-xxxx
ADMIN_PASSWORD=your_password
```

---

## APIエンドポイント

### ユーザー向け

| メソッド | パス | 認証 | 機能 |
|---------|------|------|------|
| GET | `/api/status` | なし | TTS対応状況確認 `{"hasTTS": true}` |
| POST | `/api/tts` | なし | OpenAI TTS音声生成（キャッシュ付き） |
| POST | `/api/activate` | なし（レート制限あり） | ベースライセンス認証→JWT発行 |
| POST | `/api/verify` | なし | JWT検証・lastSeen更新 |
| POST | `/api/pack/activate` | Bearer JWT（base） | パックライセンス認証→パックJWT発行 |
| GET | `/api/pack/:packId` | Bearer JWT（pack） | パックコンテンツJSON取得 |

### 管理者向け（全て Bearer JWT、admin権限）

| メソッド | パス | 機能 |
|---------|------|------|
| POST | `/admin/api/login` | 管理者ログイン |
| GET | `/admin/api/licenses` | ライセンス一覧（?product=でフィルタ） |
| POST | `/admin/api/generate` | ライセンスキー生成 |
| POST | `/admin/api/generate-bundle` | バンドル一括生成 |
| POST | `/admin/api/revoke` | 全デバイス認証取消 |
| POST | `/admin/api/revoke-device` | 特定デバイス取消 |
| PATCH | `/admin/api/license` | メモ更新 |
| DELETE | `/admin/api/license` | ライセンス削除 |
| GET | `/admin/api/backup` | licenses.json ダウンロード |
| POST | `/admin/api/restore` | バックアップからマージ復元 |
| GET | `/admin/api/packs` | 利用可能パック一覧 |

---

## TTS（音声合成）仕様

### 処理フロー

```
クライアント POST /api/tts {text, voice}
  → ① ディスクキャッシュ確認（/data/tts-cache/<sha256>.mp3）
      ヒット → mp3返却（X-Cache: HIT、API料金なし）
  → ② OpenAI TTS API 呼出（X-Cache: MISS）
      → ③ ディスクキャッシュ保存
      → mp3返却
```

### クライアント側キャッシュ

- `Map<"voice:text", blobURL>` をブラウザメモリに保持
- 同一セッション内での再再生は完全無料
- ページリロードで消去

### フォールバック

`OPENAI_API_KEY` 未設定 → `/api/status` で `hasTTS: false` → Web Speech API（OS標準音声）を使用

---

## ライセンス管理

### キー形式

```
SHAD-XXXX-XXXX-XXXX
（0/O/1/I/L を除外した32文字セット）
```

### ライセンス種別

| product | 内容 |
|---------|------|
| `base` | ベースアプリ（デフォルト100題） |
| `pack:hotel` | ホテル英会話パック |
| `pack:toeic` | TOEICパック |
| `pack:travel_vol1` | 旅行編vol1 |
| `pack:travel_vol2` | 旅行編vol2 |
| `pack:jiji_vol1` | 自字vol1 |
| `pack:jiji_vol2` | 自字vol2 |
| `bundle:travel_set` | base + travel_vol1 + travel_vol2 |
| `bundle:toeic_set` | base + toeic |
| `bundle:hotel_set` | base + hotel |
| `bundle:jiji_set` | base + jiji_vol1 + jiji_vol2 |
| `bundle:all` | base + 全パック |

### 認証フロー

```
1. クライアント: ライセンスキー + deviceId → POST /api/activate
2. サーバー: SHA256(key) でlicenses.json検索
3. アクティベーション数チェック（maxActivations デフォルト5台）
4. 問題なし → JWT(kh, did, prod) 発行（有効期限365日）
5. クライアント: JWT を localStorage に保存
6. 起動時: POST /api/verify でオンライン確認
```

### セキュリティ

- レート制限: IP単位 1時間20回
- キーはSHA256ハッシュで保存（平文なし）
- JWT シークレットは初回起動時に自動生成・`data/.jwt_secret` に保存
- admin JWTは8時間で失効

---

## ローカル開発

```bash
# インストール
cd shadowing-web
npm install

# .env 作成
echo "OPENAI_API_KEY=sk-xxxx" > .env
echo "ADMIN_PASSWORD=admin1234" >> .env

# 起動
npm start          # 本番モード（port 3003）
npm run dev        # ウォッチモード（ファイル変更で自動再起動）

# ライセンスキー発行
node tools/gen-license.mjs base 1
node tools/gen-license.mjs pack:hotel 1
node tools/gen-license.mjs bundle:travel_set 1
```

---

## Render.com デプロイ

### 初回デプロイ

1. GitHub リポジトリにプッシュ（`data/` は gitignore済み）
2. Render.com → New Web Service → GitHub リポジトリ選択
3. 設定確認（`render.yaml` から自動読込）:
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Persistent Disk: `/data` 1GB
4. Environment Variables:
   - `OPENAI_API_KEY`: OpenAI APIキー
   - `ADMIN_PASSWORD`: 管理画面パスワード

### デプロイ後のライセンス発行

Render.com の Shell タブで:
```bash
node tools/gen-license.mjs base 1
node tools/gen-license.mjs bundle:travel_set 1
```

### データバックアップ

管理画面（`/admin`）→「バックアップ」→ `licenses.json` をダウンロード

---

## パックJSON形式

```json
{
  "id": "hotel",
  "name": "ホテル英会話パック",
  "icon": "🏨",
  "description": "説明文",
  "texts": [
    {
      "id": 1001,
      "category": "チェックイン",
      "title": "タイトル",
      "titleJa": "日本語タイトル",
      "text": "A: ...\nB: ..."
    }
  ],
  "explanations": {
    "1001": [
      { "phrase": "Check in", "reading": "チェックイン", "meaning": "チェックイン", "note": "説明" }
    ]
  },
  "translations": {
    "1001": "A: 〜\nB: 〜"
  }
}
```

---

## 主要依存ライブラリ

| パッケージ | バージョン | 用途 |
|-----------|-----------|------|
| express | ^4.21.2 | HTTPサーバー |
| jsonwebtoken | ^9.0.2 | JWT認証 |
| dotenv | ^17.4.2 | 環境変数読込 |

Node.js バージョン: v20.20.1 以上推奨
