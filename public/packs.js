'use strict';
// ============================================================
// packs.js — パック定義ファイル（スキーマリファレンス）
// ============================================================
//
// パックはユーザーがアプリ内で「📦 セット」タブから
// HTMLファイルを読み込むことで追加されます。
// 読み込んだパックは localStorage に保存されます。
//
// 【パックのスキーマ】
// {
//   id:          string,   // 一意のID（自動生成）
//   name:        string,   // 表示名
//   description: string,   // 説明文
//   icon:        string,   // 絵文字アイコン
//   sourceFile:  string,   // 元のHTMLファイル名
//   importedAt:  string,   // インポート日時（ISO 8601）
//   categories: [
//     { id: string, label: string, icon: string }
//   ],
//   texts: [
//     {
//       id:       number,   // 自動採番（900001〜）
//       category: string,
//       title:    string,
//       titleJa:  string,
//       text:     string,   // 英文（対話は "A: ...\nB: ..." 形式）
//     }
//   ],
//   explanations: {
//     [id: number]: [
//       { phrase: string, reading: string, meaning: string, note: string }
//     ]
//   }
// }
//
// 【対応HTMLフォーマット】
// アプリは HTML ファイル内の以下の形式を自動解析します：
//
// const DATA = {
//   "カテゴリ名": [
//     {
//       title: "ダイアログタイトル",
//       tip: "学習ポイント（任意）",   ← フレーズ解説に変換
//       turns: [
//         { s: "A", en: "English text", ja: "日本語訳" },
//         { s: "B", en: "English text", ja: "日本語訳" },
//       ]
//     },
//     ...
//   ],
//   ...
// };
//
// 【デフォルト100題のIDレンジ】
//   日常会話   : 101〜120
//   旅行・移動 : 201〜220
//   仕事・ビジネス: 301〜320
//   健康・医療 : 401〜420
//   社会・文化 : 501〜520
//
// 【ユーザー追加パックのIDレンジ】
//   900001〜（自動採番）
//
// ============================================================

// 追加の組み込みパックはここに定義できます（現在なし）
// getAllPacks() は [DEFAULT_PACK, ...getPackLibrary()] を返します
