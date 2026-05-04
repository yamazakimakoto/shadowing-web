'use strict';

/**
 * Pre-built phrase explanations for all 50 model texts.
 * Key = text id (101–510)
 * Each entry: { phrase, reading, meaning, note }
 */
const EXPLANATIONS = {

  // ── 日常会話 ──────────────────────────────────────────────────────────────

  101: [
    { phrase: "wake up", reading: "ウェイク アップ", meaning: "目が覚める・起きる", note: "「ベッドから起き上がる」は get up。wake up は眠りから覚める瞬間を指す。" },
    { phrase: "brush my teeth", reading: "ブラッシュ マイ ティース", meaning: "歯を磨く", note: "「brush one's hair」（髪をとかす）など、brush ＋ 体の部位でよく使われる。" },
    { phrase: "make a cup of coffee", reading: "メイク ア カップ オブ コーヒー", meaning: "コーヒーを1杯入れる", note: "「make a cup of tea」のように make ＋ a cup of ～ で飲み物を作る表現。" },
    { phrase: "I prefer to", reading: "アイ プリファー トゥ", meaning: "〜の方が好みだ", note: "prefer A to B で「BよりAが好き」。I prefer A over B とも言える。" },
    { phrase: "light breakfast", reading: "ライト ブレックファスト", meaning: "軽い朝食", note: "light は「軽い・少ない」の意味。light meal / light snack も同様に使える。" },
    { phrase: "a bowl of yogurt", reading: "ア ボウル オブ ヨーグルト", meaning: "ヨーグルト1杯", note: "a bowl of ～ で「どんぶり・器1杯分の～」を表す量の表現。" },
    { phrase: "getting a good start to the day", reading: "ゲッティング ア グッド スタート トゥ ザ デイ", meaning: "1日を良い形で始めること", note: "get a good start は「良いスタートを切る」というイディオム。" },
    { phrase: "stay focused", reading: "ステイ フォーカスト", meaning: "集中力を保つ", note: "stay ＋ 形容詞で「〜の状態を維持する」。stay calm / stay healthy も同じ構造。" },
    { phrase: "productive", reading: "プロダクティブ", meaning: "生産的な・成果の出る", note: "ビジネスや日常で頻出。「have a productive day」（充実した1日を過ごす）のように使う。" },
  ],

  102: [
    { phrase: "Do you have any plans for", reading: "ドゥ ユー ハブ エニー プランズ フォー", meaning: "〜の予定はありますか", note: "週末や休日の予定を尋ねる定番フレーズ。" },
    { phrase: "I'm thinking of -ing", reading: "アイム シンキング オブ", meaning: "〜しようかと思っている", note: "確定ではなく検討中のニュアンス。I'm planning to より柔らかい表現。" },
    { phrase: "Would you like to join us?", reading: "ウッド ユー ライク トゥ ジョイン アス", meaning: "一緒に来ませんか", note: "丁寧な誘いの表現。Do you want to join us? よりフォーマルで礼儀正しい。" },
    { phrase: "That sounds great!", reading: "ザット サウンズ グレイト", meaning: "それは良さそうですね！", note: "提案や誘いに賛同するときの定番フレーズ。sounds fun / sounds perfect なども同様。" },
    { phrase: "I haven't been -ing in a long time", reading: "アイ ハブント ビーン イン ア ロング タイム", meaning: "長い間〜していない", note: "現在完了形で「ずっとしていない」という継続の否定を表す。" },
    { phrase: "We're meeting at", reading: "ウィー アー ミーティング アット", meaning: "〜で待ち合わせします", note: "現在進行形で確定した近い将来の予定を表す。" },
    { phrase: "Don't forget to bring", reading: "ドント フォーゲット トゥ ブリング", meaning: "〜を持ってくることを忘れずに", note: "持ち物の注意を促す定番表現。Don't forget to ＋ 動詞原形。" },
    { phrase: "snacks", reading: "スナックス", meaning: "軽食・おやつ", note: "間食や行楽用の軽食全般を指す。grab a snack（軽くつまむ）も頻出。" },
  ],

  103: [
    { phrase: "Can you believe", reading: "キャン ユー ビリーブ", meaning: "〜なんて信じられますか", note: "驚きや呆れを共有するときの口語表現。相手に共感を求めるニュアンスがある。" },
    { phrase: "how hot it's been lately", reading: "ハウ ホット イッツ ビーン レイトリー", meaning: "最近ずっと暑かったこと", note: "「how ＋ 形容詞 ＋ it's been」で最近の状況を強調する間接疑問文の形。" },
    { phrase: "constantly", reading: "コンスタントリー", meaning: "絶えず・ひっきりなしに", note: "always よりも「中断なく続いている」という強いニュアンスがある副詞。" },
    { phrase: "stay hydrated", reading: "ステイ ハイドレイテッド", meaning: "水分を補給し続ける・脱水にならない", note: "暑さや運動の話でよく出てくる健康表現。" },
    { phrase: "cool down", reading: "クール ダウン", meaning: "涼しくなる・温度が下がる", note: "気温だけでなく、感情が「落ち着く」意味でも使われる。cool off も同義。" },
    { phrase: "Apparently", reading: "アパレントリー", meaning: "どうやら・聞くところによると", note: "伝聞や推測を伝えるときの副詞。Seemingly / It seems that とほぼ同じ意味。" },
    { phrase: "a chance of rain", reading: "ア チャンス オブ レイン", meaning: "雨の可能性", note: "天気予報で頻出。There's a chance of snow. / There's a 60% chance of rain. など。" },
    { phrase: "such a relief", reading: "サッチ ア リリーフ", meaning: "本当にほっとする・救われる", note: "such を使った強調表現。「That's a relief.」よりも感情が強く出る。" },
  ],

  104: [
    { phrase: "Long time no see!", reading: "ロング タイム ノー シー", meaning: "お久しぶりです！", note: "久しぶりの再会で使う定番フレーズ。It's been a while! も同じ場面で使われる。" },
    { phrase: "How have you been?", reading: "ハウ ハブ ユー ビーン", meaning: "最近どうでしたか・お元気でしたか", note: "現在完了形で「以前会ってから今まで」の期間を含む近況確認。" },
    { phrase: "I just got back from", reading: "アイ ジャスト ガット バック フロム", meaning: "〜から帰ってきたばかり", note: "just で「たった今・ちょうど」の最近性を強調する。" },
    { phrase: "Oh wow", reading: "オー ワウ", meaning: "わあ・すごい", note: "驚きや興奮を表すカジュアルな感嘆詞。Great! / No way! と同じ感覚で使える。" },
    { phrase: "How was it?", reading: "ハウ ワズ イット", meaning: "どうでしたか", note: "旅行・体験・イベントの感想を尋ねる定番フレーズ。" },
    { phrase: "absolutely amazing", reading: "アブソルートリー アメイジング", meaning: "本当に素晴らしかった", note: "absolutely は感情的な形容詞と組み合わせる強調副詞。absolutely perfect / incredible なども同様。" },
    { phrase: "breathtaking", reading: "ブレステイキング", meaning: "息をのむほどの・圧倒的な", note: "scenery（景色）や体験に使われる強い形容詞。文字通り「息を奪うほど」という意味。" },
    { phrase: "incredibly friendly", reading: "インクレディブリー フレンドリー", meaning: "信じられないほど親切な", note: "incredibly は日常会話で頻出の強調副詞。incredibly beautiful / delicious なども使いやすい。" },
    { phrase: "I'm already thinking about going back", reading: "アイム オールレディ シンキング アバウト ゴーイング バック", meaning: "もう行き直すことを考えている", note: "already で「もう早くも」という驚きやすごさを暗示するニュアンスが出る。" },
  ],

  105: [
    { phrase: "What do you like to do in your free time?", reading: "ホワット ドゥ ユー ライク トゥ ドゥ イン ユア フリー タイム", meaning: "自由な時間に何をするのが好きですか", note: "趣味について聞く定番フレーズ。What are your hobbies? よりも自然な口語表現。" },
    { phrase: "enjoy -ing", reading: "エンジョイ プラス -ing", meaning: "〜を楽しむ", note: "enjoy の後は必ず動名詞（-ing）。enjoy to do とは言わないので注意。" },
    { phrase: "trying out new recipes", reading: "トライング アウト ニュー レシピーズ", meaning: "新しいレシピを試す", note: "try out は「実際に試してみる」というフレーズ動詞。try と比べてより積極的なニュアンス。" },
    { phrase: "What about you?", reading: "ホワット アバウト ユー", meaning: "あなたはどうですか", note: "話題を相手に振るときの定番表現。And you? とほぼ同じ意味。" },
    { phrase: "I'm really into", reading: "アイム リアリー イントゥ", meaning: "〜にとてもはまっている", note: "be into ～ は「〜に熱中している」というカジュアルな表現。I'm obsessed with とも言える。" },
    { phrase: "go out on weekends", reading: "ゴー アウト オン ウィークエンズ", meaning: "週末に外出する", note: "go out は「外出する」の基本表現。go out for dinner（夕食に外出する）なども頻出。" },
    { phrase: "street scenes", reading: "ストリート シーンズ", meaning: "街並み・街の様子", note: "photography（写真撮影）の対象として使われる表現。" },
    { phrase: "That's so cool!", reading: "ザッツ ソー クール", meaning: "それはすごいね！", note: "相手の趣味や話に感心するときのカジュアルな表現。That's awesome! とも言える。" },
    { phrase: "I'd love that", reading: "アイド ラブ ザット", meaning: "それは嬉しいです・ぜひそうしたい", note: "提案や申し出に前向きに応えるフレーズ。I'd love to! と同様に使える。" },
  ],

  106: [
    { phrase: "Did you see", reading: "ディッド ユー シー", meaning: "見ましたか", note: "映画・番組・ニュースなどを見たか確認する定番表現。Have you seen とも言えるが、より口語的。" },
    { phrase: "came out", reading: "ケイム アウト", meaning: "公開された・発売された", note: "映画・音楽・本などが「リリースされた」ことを表すフレーズ動詞。" },
    { phrase: "suspenseful", reading: "サスペンスフル", meaning: "ハラハラする・緊張感のある", note: "映画・本・話を描写するときに使う形容詞。thrilling / gripping も類似表現。" },
    { phrase: "I couldn't figure out", reading: "アイ クドゥント フィギュア アウト", meaning: "わからなかった・解明できなかった", note: "figure out は「理解する・解明する」というフレーズ動詞。I couldn't understand とも言い換えられる。" },
    { phrase: "until the very last minute", reading: "アンティル ザ ベリー ラスト ミニット", meaning: "最後の最後まで", note: "very で「まさに・ちょうど」を強調する。until the last minute だけでも使えるが very で感情が増す。" },
    { phrase: "Me neither", reading: "ミー ニーダー", meaning: "私もそうです（否定文への同意）", note: "前の文が否定のときに使う。肯定文への同意は Me too。" },
    { phrase: "definitely", reading: "デフィニトリー", meaning: "絶対に・確かに", note: "強い肯定や確信を表す副詞。口語では「もちろん！」に近いニュアンスで使われる。" },
    { phrase: "catch all the clues", reading: "キャッチ オール ザ クルーズ", meaning: "すべての手がかりを見つける", note: "catch には「気づく・見つける」という意味もある。Did you catch that? （気づいた？）のように使う。" },
  ],

  107: [
    { phrase: "I was thinking of -ing", reading: "アイ ワズ シンキング オブ", meaning: "〜しようかと思っていた", note: "過去進行形で提案を遠回しに伝える柔らかい表現。直接的な I want to よりも会話で自然。" },
    { phrase: "Have you heard of it?", reading: "ハブ ユー ハード オブ イット", meaning: "〜を知っていますか", note: "場所・人・作品などを知っているか確認する表現。Have you heard about it? とほぼ同義。" },
    { phrase: "I've heard great things about it", reading: "アイブ ハード グレイト シングズ アバウト イット", meaning: "〜について良い評判を聞いています", note: "口コミや評判を伝える便利なフレーズ。I've heard it's really good とも言える。" },
    { phrase: "How about Friday evening?", reading: "ハウ アバウト フライデイ イブニング", meaning: "金曜の夜はどうですか", note: "How about ～? は提案のときの定番フレーズ。What about ～? とも言い換えられる。" },
    { phrase: "That works perfectly for me", reading: "ザット ワークス パーフェクトリー フォー ミー", meaning: "私には完璧に合っています・それで大丈夫です", note: "予定が合うときの自然な表現。That works for me. / That's fine with me. も同義。" },
    { phrase: "make a reservation in advance", reading: "メイク ア レザベーション イン アドバンス", meaning: "事前に予約する", note: "in advance は「前もって・事前に」を意味する重要表現。beforehand と言い換えられる。" },
    { phrase: "downtown", reading: "ダウンタウン", meaning: "街の中心部・繁華街", note: "アメリカ英語で市街地の中心エリアを指す。in the city center とほぼ同義。" },
  ],

  108: [
    { phrase: "I just finished reading", reading: "アイ ジャスト フィニッシュト リーディング", meaning: "読み終えたばかり", note: "finish の後も動名詞（-ing）が来る。just で「たった今」という最近性を強調。" },
    { phrase: "fascinating", reading: "ファシネイティング", meaning: "非常に興味深い・魅了される", note: "interesting より強い。本・映画・人物に使われる。I find it fascinating. の形もよく使う。" },
    { phrase: "What surprised me most", reading: "ホワット サプライズト ミー モスト", meaning: "最も驚いたのは", note: "関係代名詞 what を主語に使った強調表現。What impressed me most も同じ構造。" },
    { phrase: "how advanced … were", reading: "ハウ アドバンスト ウォー", meaning: "いかに進んでいたか", note: "間接疑問文の語順（how ＋ 形容詞 ＋ 主語 ＋ 動詞）に注意。" },
    { phrase: "despite having", reading: "ディスパイト ハビング", meaning: "〜にもかかわらず", note: "despite ＋ -ing は逆接の重要構文。despite の後に名詞・動名詞が続く。" },
    { phrase: "limited technology", reading: "リミテッド テクノロジー", meaning: "限られた技術・乏しい技術", note: "limited は「限定された・制限のある」という意味の形容詞。" },
    { phrase: "well-written", reading: "ウェル リトゥン", meaning: "よく書かれた・文章が良い", note: "ハイフンでつなぐ複合形容詞。well-organized / well-designed なども同じ形。" },
    { phrase: "I would definitely recommend it", reading: "アイ ウッド デフィニトリー レコメンド イット", meaning: "ぜひおすすめします", note: "强い推薦を表すフレーズ。would が丁寧さを加えている。" },
  ],

  109: [
    { phrase: "go to the local supermarket", reading: "ゴー トゥー ザ ローカル スーパーマーケット", meaning: "地元のスーパーマーケットへ行く", note: "local は「地元の・近所の」を意味する形容詞。local restaurant / local park も頻出。" },
    { phrase: "groceries", reading: "グロウサリーズ", meaning: "食料品・日用雑貨", note: "go grocery shopping（食料品の買い物をする）はよく使われる表現。" },
    { phrase: "make a list beforehand", reading: "メイク ア リスト ビフォーハンド", meaning: "事前にリストを作る", note: "beforehand は「前もって」を意味する副詞。in advance とほぼ同義。" },
    { phrase: "so I don't forget anything", reading: "ソー アイ ドント フォーゲット エニシング", meaning: "何も忘れないように", note: "so (that) ～ で目的・結果を表す構文。I don't forget → 否定形に注意。" },
    { phrase: "at the top of my list", reading: "アット ザ トップ オブ マイ リスト", meaning: "リストの最上位に・最優先で", note: "優先事項を表すイディオム。It's at the top of my priority list とも言える。" },
    { phrase: "processed foods", reading: "プロセスト フーズ", meaning: "加工食品", note: "健康の話でよく出る表現。反対語は whole foods / natural foods。" },
    { phrase: "stick to", reading: "スティック トゥー", meaning: "〜を守る・〜に徹する", note: "フレーズ動詞で「〜から離れない」という意味。stick to a diet / stick to a plan など。" },
    { phrase: "wholesome", reading: "ホールサム", meaning: "体に良い・健全な", note: "食べ物の話では「栄養バランスが良い・健康的な」の意味でよく使われる。" },
    { phrase: "as much as possible", reading: "アズ マッチ アズ ポッシブル", meaning: "できるだけ", note: "as ～ as possible の構造で「最大限に〜する」を表す定番表現。" },
  ],

  110: [
    { phrase: "calling to confirm", reading: "コーリング トゥー コンファーム", meaning: "確認のためにお電話しています", note: "電話の冒頭で用件を伝える定番フレーズ。I'm calling to ～ の形で続ける。" },
    { phrase: "appointment", reading: "アポイントメント", meaning: "予約・面会の約束", note: "医療・ビジネスなど公式の予約を指す。make an appointment（予約する）も頻出。" },
    { phrase: "is still on schedule", reading: "イズ スティル オン スケジュール", meaning: "まだ予定通りです", note: "on schedule は「予定通りに」。反対は behind schedule（遅れている）。" },
    { phrase: "let me know if", reading: "レット ミー ノウ イフ", meaning: "〜でしたら教えてください", note: "情報提供をお願いする丁寧なフレーズ。Please inform me if とほぼ同義。" },
    { phrase: "anything I need to bring", reading: "エニシング アイ ニード トゥ ブリング", meaning: "持参するべきもの", note: "anything を疑問・条件文で使うと「何か」の意味になる。" },
    { phrase: "call me back", reading: "コール ミー バック", meaning: "折り返し電話をください", note: "give me a call back とも言う。return my call というフォーマルな表現もある。" },
    { phrase: "at your earliest convenience", reading: "アット ユア アーリエスト コンビニエンス", meaning: "ご都合のよい時に・できるだけ早く", note: "メールや電話でよく使うフォーマルな依頼表現。as soon as possible より丁寧。" },
  ],

  // ── 旅行・移動 ────────────────────────────────────────────────────────────

  201: [
    { phrase: "Excuse me, could you help me", reading: "エクスキューズ ミー クッド ユー ヘルプ ミー", meaning: "すみません、〜を手伝ってもらえますか", note: "見知らぬ人に声をかけるときの丁寧な表現。Excuse me だけで注意を引くこともできる。" },
    { phrase: "Go straight down this street", reading: "ゴー ストレイト ダウン ジス ストリート", meaning: "この道をまっすぐ進んでください", note: "道案内でよく使う表現。go straight（まっすぐ進む）は基本フレーズ。" },
    { phrase: "for two blocks", reading: "フォー トゥー ブロックス", meaning: "2ブロック分", note: "英語の道案内で距離をブロック数で表す表現。One block is roughly 100 meters." },
    { phrase: "turn left at the traffic lights", reading: "ターン レフト アット ザ トラフィック ライツ", meaning: "信号のところで左に曲がる", note: "turn left / right は道案内の基本。at the corner / at the intersection も頻出。" },
    { phrase: "Is it far from here?", reading: "イズ イット ファー フロム ヒア", meaning: "ここから遠いですか", note: "距離を確認する自然な表現。How far is it? とも言える。" },
    { phrase: "on foot", reading: "オン フット", meaning: "徒歩で", note: "by car / by train と同様に交通手段を表す。It takes 10 minutes on foot.（徒歩10分）" },
    { phrase: "You can't miss it", reading: "ユー キャント ミス イット", meaning: "すぐにわかります・見逃しません", note: "目印になる建物や場所を説明するときの定番フレーズ。" },
    { phrase: "red brick building", reading: "レッド ブリック ビルディング", meaning: "赤レンガの建物", note: "建物の外観を説明するときの表現。a large white building など組み合わせ自由。" },
  ],

  202: [
    { phrase: "Could I see your passport", reading: "クッド アイ シー ユア パスポート", meaning: "パスポートを見せていただけますか", note: "空港スタッフがよく使う丁寧な依頼表現。May I see ～? とほぼ同義。" },
    { phrase: "boarding pass", reading: "ボーディング パス", meaning: "搭乗券", note: "空港で必須の語。電子搭乗券は e-boarding pass / mobile boarding pass。" },
    { phrase: "check in (a bag)", reading: "チェック イン", meaning: "（荷物を）預ける", note: "check in a bag で荷物を預けること。ホテルのチェックインとは区別する。" },
    { phrase: "place your bag on the scale", reading: "プレイス ユア バッグ オン ザ スケイル", meaning: "スケールに荷物を乗せてください", note: "put your bag on the scale とも言う。scale は「はかり」。" },
    { phrase: "right at the weight limit", reading: "ライト アット ザ ウェイト リミット", meaning: "ちょうど重量制限ぴったり", note: "right は「ちょうど・まさに」という強調副詞としてよく使われる。" },
    { phrase: "Security is to your right", reading: "セキュリティ イズ トゥー ユア ライト", meaning: "セキュリティゲートはあなたの右手です", note: "to your right / to your left は空港・館内案内の定番表現。" },
    { phrase: "Boarding starts in about forty-five minutes", reading: "ボーディング スターツ イン アバウト フォーティーファイブ ミニッツ", meaning: "搭乗開始まであと約45分です", note: "in ～ minutes で「〜分後に」を表す。in about an hour（約1時間後）も同様。" },
  ],

  203: [
    { phrase: "I'd like to make a reservation", reading: "アイド ライク トゥ メイク ア レザベーション", meaning: "予約をしたいのですが", note: "ホテル・レストランなどで使う丁寧な予約依頼表現。I want to book a room とも言える。" },
    { phrase: "for two nights", reading: "フォー トゥー ナイツ", meaning: "2泊で", note: "宿泊数の表現。for three nights / for a week なども同様。" },
    { phrase: "a room with a double bed", reading: "ア ルーム ウィズ ア ダブル ベッド", meaning: "ダブルベッドの部屋", note: "部屋の希望を伝えるときの表現。with a view of ～（〜の眺めの）も覚えておきたい。" },
    { phrase: "if possible", reading: "イフ ポッシブル", meaning: "もし可能であれば", note: "if possible / if available は丁寧な希望の言い方。" },
    { phrase: "checking out on the seventeenth", reading: "チェッキング アウト オン ザ セブンティーンス", meaning: "17日にチェックアウトする", note: "check out は「ホテルを出る」こと。What time is check-out?（チェックアウトは何時ですか）も頻出。" },
    { phrase: "Is breakfast included in the rate?", reading: "イズ ブレックファスト インクルーデッド イン ザ レイト", meaning: "料金に朝食は含まれていますか", note: "included in the price / rate は「料金込みで」を確認する定番表現。" },
    { phrase: "parking available", reading: "パーキング アベイラブル", meaning: "駐車場がある", note: "Is there parking available? で「駐車場はありますか」と確認できる。" },
  ],

  204: [
    { phrase: "Is this seat taken?", reading: "イズ ジス シート テイクン", meaning: "この席は空いていますか", note: "電車・バス・カフェなどで使う定番フレーズ。Is anyone sitting here? とも言える。" },
    { phrase: "Please go ahead", reading: "プリーズ ゴー アヘッド", meaning: "どうぞ（お座りください）", note: "許可を与えるときの表現。Go ahead and take a seat. などでも使われる。" },
    { phrase: "Are you traveling far today?", reading: "アー ユー トラベリング ファー トゥデイ", meaning: "今日は遠くまで行かれるのですか", note: "初対面の会話を始めるときの自然なきっかけフレーズ。" },
    { phrase: "all the way to Osaka", reading: "オール ザ ウェイ トゥー オーサカ", meaning: "はるばる大阪まで", note: "all the way は「わざわざ・はるばる」という距離の遠さを強調する表現。" },
    { phrase: "quite a journey", reading: "クワイト ア ジャーニー", meaning: "なかなかの旅程・けっこうな距離", note: "quite は「かなり・相当」という強調語。quite a ＋ 名詞で感嘆の意味になる。" },
    { phrase: "once a month", reading: "ワンス ア マンス", meaning: "月に1回", note: "once a week（週1回）/ twice a year（年2回）などの頻度表現。" },
    { phrase: "the food there is incredible", reading: "ザ フード ゼアー イズ インクレディブル", meaning: "そこの食べ物は最高だ", note: "incredible は「信じられないほど素晴らしい」という強い形容詞。amazing / fantastic と同義。" },
  ],

  205: [
    { phrase: "I've been thinking about -ing", reading: "アイブ ビーン シンキング アバウト", meaning: "〜することをずっと考えていた", note: "現在完了進行形で「以前からずっと考えている」という継続を表す。" },
    { phrase: "Where would you recommend?", reading: "ホエア ウッド ユー レコメンド", meaning: "どこがおすすめですか", note: "旅行の行き先を尋ねる自然な表現。What would you recommend? も同様に使える。" },
    { phrase: "I'd suggest starting with", reading: "アイド サジェスト スターティング ウィズ", meaning: "〜から始めることをおすすめします", note: "suggest の後も動名詞（-ing）が続く。I recommend starting with とも言い換えられる。" },
    { phrase: "architecture", reading: "アーキテクチャー", meaning: "建築・建築様式", note: "travel や culture の話でよく出る語。architectural（形容詞形）も覚えておきたい。" },
    { phrase: "absolutely incredible", reading: "アブソルートリー インクレディブル", meaning: "本当に素晴らしい", note: "absolutely は強調副詞として amazing / wonderful / stunning などと組み合わせやすい。" },
    { phrase: "How long do you think I'd need?", reading: "ハウ ロング ドゥ ユー シンク アイド ニード", meaning: "どのくらいの時間が必要だと思いますか", note: "旅行の日程を相談するときの便利なフレーズ。" },
    { phrase: "to experience it properly", reading: "トゥ エクスペリエンス イット プロパリー", meaning: "しっかりと体験するために", note: "properly は「きちんと・十分に」という副詞。see it properly とも言える。" },
    { phrase: "head south to", reading: "ヘッド サウス トゥー", meaning: "南へ〜に向かう", note: "head は方向を示す動詞として便利。head north / east / west なども同様。" },
  ],

  206: [
    { phrase: "I'd like to rent a compact car", reading: "アイド ライク トゥ レント ア コンパクト カー", meaning: "コンパクトカーを借りたいのですが", note: "レンタカー会社でよく使う表現。compact car は小型車。" },
    { phrase: "May I see your driver's license?", reading: "メイ アイ シー ユア ドライバーズ ライセンス", meaning: "運転免許証を見せていただけますか", note: "May I see ～? は丁寧な確認の定番表現。" },
    { phrase: "Does the rental include basic insurance?", reading: "ダズ ザ レンタル インクルード ベーシック インシュランス", meaning: "レンタルには基本的な保険が含まれていますか", note: "include は「含む」を意味する動詞。Is insurance included? とも言える。" },
    { phrase: "basic coverage", reading: "ベーシック カバレッジ", meaning: "基本的な保険の補償", note: "insurance coverage は保険で補償される範囲を指す。full coverage は完全補償。" },
    { phrase: "full protection", reading: "フル プロテクション", meaning: "完全保護・フル補償", note: "full coverage / comprehensive insurance とも呼ばれる。" },
    { phrase: "peace of mind", reading: "ピース オブ マインド", meaning: "安心感", note: "「心の平和・安心」を意味するイディオム。for your peace of mind（安心のために）と使われる。" },
    { phrase: "per day", reading: "パー デイ", meaning: "1日あたり", note: "per は「〜につき」を意味する前置詞。per hour / per person / per kilometer なども頻出。" },
  ],

  207: [
    { phrase: "I can't find my suitcase", reading: "アイ キャント ファインド マイ スーツケース", meaning: "スーツケースが見当たりません", note: "紛失報告の冒頭でよく使う表現。I seem to have lost my suitcase とも言える。" },
    { phrase: "baggage claim area", reading: "バゲッジ クレイム エリア", meaning: "手荷物受取エリア", note: "空港の必須語。baggage carousel（ターンテーブル）とも言う。" },
    { phrase: "I'm very sorry to hear that", reading: "アイム ベリー ソーリー トゥ ヒア ザット", meaning: "それは申し訳ございません・それはお気の毒です", note: "相手のトラブルに共感を示す定番フレーズ。" },
    { phrase: "describe the bag", reading: "ディスクライブ ザ バッグ", meaning: "バッグを説明する", note: "describe は「描写する・説明する」。Could you describe ～? は紛失・捜索の場面で頻出。" },
    { phrase: "tied to the handle", reading: "タイド トゥ ザ ハンドル", meaning: "ハンドルに結びつけられている", note: "tied to ～ で「〜に結ばれている」を表す過去分詞の形容詞的用法。" },
    { phrase: "Let me check our system right away", reading: "レット ミー チェック アワー システム ライト アウェイ", meaning: "すぐにシステムを確認します", note: "Let me ～ は「〜させてください・すぐに〜します」という申し出の表現。" },
    { phrase: "fill out this form", reading: "フィル アウト ジス フォーム", meaning: "この用紙に記入する", note: "fill out / fill in a form は「書類に記入する」の標準表現。" },
    { phrase: "do everything we can to locate it", reading: "ドゥ エブリシング ウィ キャン トゥ ロケイト イット", meaning: "見つけるために全力を尽くします", note: "do everything (one) can to ～ は「〜するために最善を尽くす」という強い表現。" },
  ],

  208: [
    { phrase: "I just arrived in the city", reading: "アイ ジャスト アライブド イン ザ シティ", meaning: "市内に来たばかりです", note: "just で「たった今・ちょうど」の最近性を表す。" },
    { phrase: "things to do", reading: "シングズ トゥ ドゥ", meaning: "やること・見どころ", note: "things to do / things to see / things to eat は旅行の話でよく使われる。" },
    { phrase: "Could you give me a map?", reading: "クッド ユー ギブ ミー ア マップ", meaning: "地図をいただけますか", note: "Could you ～? は Can you ～? より丁寧な依頼表現。" },
    { phrase: "brochures", reading: "ブロウシャーズ", meaning: "パンフレット・案内チラシ", note: "観光案内所や旅行会社でよく使う語。flyers / leaflets とも言う。" },
    { phrase: "local attractions", reading: "ローカル アトラクションズ", meaning: "地元の観光スポット", note: "tourist attractions とも言う。観光の話での必須表現。" },
    { phrase: "particularly interested in", reading: "パーティキュラリー インタレスティッド イン", meaning: "〜に特に興味がある", note: "be interested in ～ に particularly を加えて「特に」を強調する。" },
    { phrase: "local festivals", reading: "ローカル フェスティバルズ", meaning: "地元のお祭り・イベント", note: "旅行先の文化を楽しむ話でよく出る表現。" },
    { phrase: "recommendation for a good restaurant", reading: "レコメンデーション フォー ア グッド レストラン", meaning: "おすすめのレストラン", note: "Could you give me a recommendation? は観光案内でよく使う表現。" },
  ],

  209: [
    { phrase: "One of my favorite things to do", reading: "ワン オブ マイ フェイバリット シングズ トゥ ドゥ", meaning: "私が特に好きなことの一つ", note: "One of my favorite ～ は好みを伝えるときの自然な表現。" },
    { phrase: "when traveling", reading: "ホエン トラベリング", meaning: "旅行をしているとき", note: "when ＋ -ing で「〜しているとき」を短く表す。when I travel とも言える。" },
    { phrase: "fresh produce", reading: "フレッシュ プロデュース", meaning: "新鮮な農産物・野菜や果物", note: "produce は食料品店や市場の新鮮な野菜・果物を指す名詞（プロデュース）。" },
    { phrase: "handmade crafts", reading: "ハンドメイド クラフツ", meaning: "手作りの工芸品", note: "handicrafts とも言う。市場でよく見かける品物を表す。" },
    { phrase: "simply wouldn't find", reading: "シンプリー ウドゥント ファインド", meaning: "とても見つけられない・まず見つからない", note: "simply は「到底・まず」という強調副詞として否定文で使われる。" },
    { phrase: "Talking to the vendors", reading: "トーキング トゥ ザ ヴェンダーズ", meaning: "出店者・売り手に話しかけること", note: "vendor は市場や屋台の売り手を指す。seller / stall owner とも言える。" },
    { phrase: "local culture and way of life", reading: "ローカル カルチャー アンド ウェイ オブ ライフ", meaning: "地元の文化と生活様式", note: "way of life は lifestyle とほぼ同義の表現。" },
    { phrase: "memories of the trip", reading: "メモリーズ オブ ザ トリップ", meaning: "旅の思い出", note: "souvenirs（お土産品）と比較して、memories は心の中の思い出を指す。" },
  ],

  210: [
    { phrase: "we just missed the last train", reading: "ウィー ジャスト ミスト ザ ラスト トレイン", meaning: "終電に乗り遅れてしまった", note: "miss a train / bus / flight で「〜に乗り遅れる」を表す。" },
    { phrase: "Don't panic", reading: "ドント パニック", meaning: "慌てないで・パニックにならないで", note: "Calm down とほぼ同義。Don't worry. よりも緊急場面で使われる。" },
    { phrase: "rideshare app", reading: "ライドシェア アップ", meaning: "ライドシェアアプリ（UberやLyftなど）", note: "ride-hailing app とも言う。現代の移動手段の話でよく出る語。" },
    { phrase: "at this hour", reading: "アット ジス アワー", meaning: "こんな時間に", note: "深夜など特定の時間帯を指す表現。at this time of night とも言える。" },
    { phrase: "Probably around thirty to forty minutes", reading: "プロバブリー アラウンド サーティ トゥー フォーティー ミニッツ", meaning: "おそらく30〜40分くらい", note: "probably と around で不確実な時間の見積もりを示す。" },
    { phrase: "depending on traffic", reading: "ディペンディング オン トラフィック", meaning: "交通状況次第で", note: "depending on ～ は「〜によって・〜次第で」という便利な表現。" },
    { phrase: "split the cost", reading: "スプリット ザ コスト", meaning: "費用を割り勘にする", note: "split the bill / go Dutch（割り勘にする）と同義。" },
  ],

  // ── 仕事・ビジネス ────────────────────────────────────────────────────────

  301: [
    { phrase: "Tell me a little about yourself", reading: "テル ミー ア リトゥル アバウト ユアセルフ", meaning: "あなた自身について少し教えてください", note: "面接の定番の出だし。自己紹介を促す最もよくある質問。" },
    { phrase: "five years of experience in", reading: "ファイブ イヤーズ オブ エクスペリエンス イン", meaning: "〜における5年の経験", note: "職歴を伝えるときの基本表現。I have ＋ years of experience in ～. の形で使う。" },
    { phrase: "passionate about", reading: "パッショネット アバウト", meaning: "〜に情熱を持っている", note: "I'm passionate about ～ は面接で強いアピールになる表現。" },
    { phrase: "brand awareness", reading: "ブランド アウェアネス", meaning: "ブランド認知度", note: "マーケティングの基本用語。raise / build brand awareness（ブランド認知を高める）と使われる。" },
    { phrase: "What would you say is your greatest strength?", reading: "ホワット ウッド ユー セイ イズ ユア グレイテスト ストレングス", meaning: "あなたの最大の強みは何だと思いますか", note: "面接の頻出質問。What do you consider your greatest strength? とも言える。" },
    { phrase: "working under pressure", reading: "ワーキング アンダー プレッシャー", meaning: "プレッシャー下で働くこと", note: "I work well under pressure. は強みを述べるときの定番フレーズ。" },
    { phrase: "meeting tight deadlines", reading: "ミーティング タイト デッドラインズ", meaning: "厳しい締め切りを守ること", note: "meet a deadline（締め切りを守る）は仕事の話で必須の表現。" },
    { phrase: "without sacrificing quality", reading: "ウィズアウト サクリファイジング クオリティ", meaning: "品質を犠牲にせずに", note: "without ＋ -ing で「〜せずに」という逆接の表現。" },
  ],

  302: [
    { phrase: "Thank you all for joining", reading: "サンク ユー オール フォー ジョイニング", meaning: "ご参加いただきありがとうございます", note: "会議の冒頭でよく使う表現。Thank you for being here today とも言える。" },
    { phrase: "reviewing last month's sales figures", reading: "リビューイング ラスト マンスズ セールズ フィギャーズ", meaning: "先月の売上数字を確認する", note: "review the figures / go over the numbers も同義。" },
    { phrase: "exceeded our targets by fifteen percent", reading: "エクシーデッド アワー ターゲッツ バイ フィフティーン パーセント", meaning: "目標を15%上回った", note: "exceed は「超える・上回る」。by ＋ 数字で「〜だけ」の差を示す。" },
    { phrase: "fantastic result", reading: "ファンタスティック リザルト", meaning: "素晴らしい結果", note: "excellent / outstanding / impressive result なども同義。" },
    { phrase: "express my sincere gratitude", reading: "エクスプレス マイ シンシア グラティチュード", meaning: "心からの感謝を伝える", note: "フォーマルな感謝表現。I sincerely appreciate your efforts とも言える。" },
    { phrase: "contributions", reading: "コントリビューションズ", meaning: "貢献・貢献度", note: "your contributions to the team（チームへの貢献）は評価の場面で頻出。" },
    { phrase: "move on to discuss", reading: "ムーブ オン トゥ ディスカス", meaning: "次に〜を議論する", note: "会議の進行で使う表現。Let's move on to the next topic とも言う。" },
    { phrase: "the upcoming quarter", reading: "ザ アップカミング クォーター", meaning: "次の四半期", note: "upcoming は「近づいている・今後の」という意味。quarterly（四半期の）も覚えておきたい。" },
  ],

  303: [
    { phrase: "Could I speak with you for a moment?", reading: "クッド アイ スピーク ウィズ ユー フォー ア モーメント", meaning: "少しお話しできますか", note: "上司や同僚に話しかけるときの丁寧な表現。Do you have a minute? とも言える。" },
    { phrase: "I'd like to request a day off", reading: "アイド ライク トゥ リクエスト ア デイ オフ", meaning: "1日休暇をお願いしたいのですが", note: "request time off / ask for a day off も同義。" },
    { phrase: "a personal matter to take care of", reading: "ア パーソナル マター トゥ テイク ケア オブ", meaning: "処理すべき個人的な用事", note: "take care of ～ は「〜を処理する・対処する」というフレーズ動詞。" },
    { phrase: "I'll make sure all my work is completed beforehand", reading: "アイル メイク シュア オール マイ ワーク イズ コンプリーテッド ビフォーハンド", meaning: "事前に仕事をすべて終わらせておきます", note: "make sure は「〜することを確実にする」という責任ある表現。" },
    { phrase: "That's perfectly fine", reading: "ザッツ パーフェクトリー ファイン", meaning: "それで全く問題ありません", note: "That's fine / No problem と同義だが perfectly でより強調している。" },
    { phrase: "send me a quick email", reading: "センド ミー ア クイック イーメール", meaning: "簡単なメールを送ってください", note: "quick は「手短な・短い」の意味で、メールや報告に使う。" },
    { phrase: "so I have a record", reading: "ソー アイ ハブ ア レコード", meaning: "記録として残しておくために", note: "have a record of ～ で「〜の記録を持つ」。keep a record とも言える。" },
  ],

  304: [
    { phrase: "How are you finding -ing?", reading: "ハウ アー ユー ファインディング", meaning: "〜はどうですか・慣れましたか", note: "How do you like ～? とほぼ同義。体験・状況への感想を聞く表現。" },
    { phrase: "I love it", reading: "アイ ラブ イット", meaning: "大好きです・すごく気に入っています", note: "I enjoy it / I really like it より感情が強い表現。" },
    { phrase: "much more productive", reading: "マッチ モア プロダクティブ", meaning: "はるかに生産的な", note: "much は比較級を強調する副詞。much better / much easier なども頻出。" },
    { phrase: "daily commute", reading: "デイリー コミュート", meaning: "毎日の通勤", note: "commute は通勤・通学を指す。commuting time（通勤時間）も覚えておきたい。" },
    { phrase: "eating into my time", reading: "イーティング イントゥ マイ タイム", meaning: "時間を食いつぶす", note: "eat into ～ は「〜を少しずつ侵食・消費する」というフレーズ動詞。" },
    { phrase: "I feel the opposite", reading: "アイ フィール ザ オポジット", meaning: "私は逆の感じがします", note: "反対の意見を述べるときの表現。I see it differently とも言える。" },
    { phrase: "spontaneous conversations", reading: "スポンテイニアス コンバセーションズ", meaning: "自然発生的な会話", note: "spontaneous は「自発的な・即興の」という形容詞。" },
    { phrase: "It really does depend on", reading: "イット リアリー ダズ ディペンド オン", meaning: "本当に〜次第ですね", note: "does は強調の助動詞。It depends on ～ に really does で強調を加えた形。" },
  ],

  305: [
    { phrase: "I'd like to present", reading: "アイド ライク トゥ プレゼント", meaning: "〜を発表・提案させていただきます", note: "プレゼンの冒頭でよく使う丁寧な表現。Today I'll be presenting ～ とも言える。" },
    { phrase: "expand our online presence", reading: "エクスパンド アワー オンライン プレゼンス", meaning: "オンラインでの存在感を拡大する", note: "online presence はSNSやウェブサイトの存在感。improve / strengthen / boost も同義。" },
    { phrase: "reach a younger demographic", reading: "リーチ ア ヤンガー デモグラフィック", meaning: "若い世代にリーチする", note: "demographic は「人口統計上の層・ターゲット層」を指すマーケティング用語。" },
    { phrase: "targeted social media campaign", reading: "ターゲテッド ソーシャル メディア キャンペーン", meaning: "ターゲットを絞ったSNSキャンペーン", note: "targeted は「的を絞った」という形容詞。" },
    { phrase: "user-friendly on mobile devices", reading: "ユーザー フレンドリー オン モバイル デバイスィズ", meaning: "モバイル端末で使いやすい", note: "user-friendly は「使いやすい・直感的な」という複合形容詞。" },
    { phrase: "Based on our research", reading: "ベイスト オン アワー リサーチ", meaning: "調査結果に基づけば", note: "Based on ～ は論拠を示すときの定番フレーズ。According to our data とも言える。" },
    { phrase: "increase our customer base by at least twenty percent", reading: "インクリース アワー カスタマー ベース バイ アット リースト トゥエンティ パーセント", meaning: "顧客基盤を少なくとも20%増やす", note: "at least（少なくとも）と by ＋ 数値の組み合わせは目標設定でよく使われる。" },
  ],

  306: [
    { phrase: "I hope this message finds you well", reading: "アイ ホープ ジス メッセージ ファインズ ユー ウェル", meaning: "ご健勝のことと存じます", note: "ビジネスメールの冒頭でよく使う丁寧な決まり文句。" },
    { phrase: "follow up on", reading: "フォロー アップ オン", meaning: "〜についてフォローする・続報を確認する", note: "I'm writing to follow up on ～ はビジネスメールの定番表現。" },
    { phrase: "as discussed", reading: "アズ ディスカスト", meaning: "ご相談したとおり・お話した通り", note: "以前の会話や会議の内容を参照するときに使う便利な表現。" },
    { phrase: "I've attached the revised proposal", reading: "アイブ アタッチト ザ リバイズド プロポーザル", meaning: "修正した提案書を添付しました", note: "Please find the attached ～ も同義の丁寧な表現。" },
    { phrase: "Please don't hesitate to reach out", reading: "プリーズ ドント ヘジテイト トゥ リーチ アウト", meaning: "遠慮なくご連絡ください", note: "Feel free to contact me / Please feel free to get in touch とも言える。" },
    { phrase: "schedule a call", reading: "スケジュール ア コール", meaning: "通話の予定を立てる", note: "set up a call / arrange a meeting も同義のビジネス表現。" },
    { phrase: "I look forward to hearing from you", reading: "アイ ルック フォワード トゥ ヒアリング フロム ユー", meaning: "ご連絡をお待ちしています", note: "メールの締めくくりに使う定番表現。look forward to ＋ -ing の形に注意。" },
  ],

  307: [
    { phrase: "I'm very unhappy with", reading: "アイム ベリー アンハッピー ウィズ", meaning: "〜に大変不満です", note: "クレームの場面でよく使われる表現。I'm dissatisfied with とも言える。" },
    { phrase: "This is simply not acceptable", reading: "ジス イズ シンプリー ノット アクセプタブル", meaning: "これは全く許容できません", note: "強いクレームを表す表現。simply で「到底・絶対に」を強調している。" },
    { phrase: "I completely understand your frustration", reading: "アイ コンプリートリー アンダースタンド ユア フラストレーション", meaning: "ご不満は十分理解できます", note: "クレーム対応の共感を示す定番フレーズ。I understand how you feel とも言える。" },
    { phrase: "sincerely apologize for the inconvenience", reading: "シンシアリー アポロジャイズ フォー ジ インコンビニエンス", meaning: "ご不便をおかけして心からお詫び申し上げます", note: "ビジネスでのお詫びの定番表現。We are truly sorry for ～ とも言える。" },
    { phrase: "arrange a full replacement", reading: "アレンジ ア フル リプレイスメント", meaning: "全品交換を手配する", note: "arrange は「手配する・準備する」。replacement は「交換品」。" },
    { phrase: "conduct a thorough review", reading: "コンダクト ア サロー リビュー", meaning: "徹底的な見直しを行う", note: "thorough は「徹底的な・完全な」という形容詞。" },
    { phrase: "quality control process", reading: "クオリティ コントロール プロセス", meaning: "品質管理プロセス", note: "QC process とも略される。製造・サービス業でよく使われる。" },
    { phrase: "to ensure this never happens again", reading: "トゥ インシュア ジス ネバー ハップンズ アゲイン", meaning: "二度と起こらないようにするために", note: "ensure は「確実にする・保証する」。クレーム対応の締めによく使われる。" },
  ],

  308: [
    { phrase: "I'd like to discuss my compensation", reading: "アイド ライク トゥ ディスカス マイ コンペンセーション", meaning: "給与について話し合いたいのですが", note: "compensation は給与・報酬全体を指す。salary raise / pay increase とも言える。" },
    { phrase: "no longer reflects my contributions", reading: "ノー ロンガー リフレクツ マイ コントリビューションズ", meaning: "もはや自分の貢献を反映していない", note: "no longer は「もはや〜でない」という変化を表す表現。" },
    { phrase: "I appreciate you bringing this up directly", reading: "アイ アプリシエイト ユー ブリンギング ジス アップ ダイレクトリー", meaning: "直接話してくれてありがとう", note: "I appreciate you ＋ -ing で「〜してくれてありがとう」という感謝表現。" },
    { phrase: "proven yourself to be", reading: "プルーブン ユアセルフ トゥ ビー", meaning: "〜であることを証明した・立証した", note: "prove oneself は「自分の能力を証明する」という自動詞的な使い方。" },
    { phrase: "valuable team member", reading: "バリュアブル チーム メンバー", meaning: "貴重なチームメンバー", note: "valuable は「価値ある・貴重な」。an asset to the team とも言える。" },
    { phrase: "additional responsibilities", reading: "アディショナル リスポンシビリティーズ", meaning: "追加の業務・職責", note: "take on additional responsibilities（追加業務を引き受ける）は昇給交渉でよく使われる。" },
    { phrase: "beyond my original job description", reading: "ビヨンド マイ オリジナル ジョブ ディスクリプション", meaning: "元の職務記述書の範囲を超えて", note: "go beyond one's job description は「職務範囲を超えて活躍する」こと。" },
    { phrase: "get back to you by Friday", reading: "ゲット バック トゥ ユー バイ フライデイ", meaning: "金曜日までに返答します", note: "get back to someone は「〜に後で返事をする」という口語的な表現。" },
  ],

  309: [
    { phrase: "professional networking events", reading: "プロフェッショナル ネットワーキング イベンツ", meaning: "業界交流イベント", note: "networking は人脈形成を目的とした交流活動。business networking event とも言う。" },
    { phrase: "advance your career", reading: "アドバンス ユア キャリア", meaning: "キャリアを発展させる", note: "advance / boost / further one's career はどれも「キャリアを伸ばす」こと。" },
    { phrase: "You never know who you might meet", reading: "ユー ネバー ノウ フー ユー マイト ミート", meaning: "誰に出会うかわからない", note: "You never know ～ は「〜はわからない・何が起こるかわからない」という表現。" },
    { phrase: "a mentor with invaluable advice", reading: "ア メンター ウィズ インバリュアブル アドバイス", meaning: "貴重なアドバイスを持つメンター", note: "invaluable は「計り知れないほど価値のある」という意味。priceless と同義。" },
    { phrase: "genuinely curious about", reading: "ジェニュインリー キュアリアス アバウト", meaning: "〜について本当に好奇心旺盛な", note: "genuinely は「心から・本当に」という副詞。truly と言い換えられる。" },
    { phrase: "listen carefully to what they have to say", reading: "リスン ケアフリー トゥ ホワット ゼイ ハブ トゥ セイ", meaning: "相手の言うことをよく聞く", note: "what ～ have to say は「〜が言うこと」という名詞節。" },
    { phrase: "follow up with a brief message", reading: "フォロー アップ ウィズ ア ブリーフ メッセージ", meaning: "短いメッセージでフォローする", note: "after an event（イベント後に）フォローアップメッセージを送るのは人脈形成の基本。" },
    { phrase: "keep the relationship alive", reading: "キープ ザ リレーションシップ アライブ", meaning: "関係を維持する", note: "keep ～ alive は「〜を生き続けさせる・維持する」という表現。" },
  ],

  310: [
    { phrase: "Are you coming to the team dinner?", reading: "アー ユー カミング トゥ ザ チーム ディナー", meaning: "チームの食事に来ますか", note: "Are you coming to ～? は確定した予定への出席確認をするカジュアルな表現。" },
    { phrase: "finish up", reading: "フィニッシュ アップ", meaning: "仕上げる・片付ける", note: "finish と同義だが up を加えることで「完全に終える」というニュアンスになる。" },
    { phrase: "What time does it start?", reading: "ホワット タイム ダズ イット スタート", meaning: "何時から始まりますか", note: "イベントや予定の開始時間を確認する定番表現。" },
    { phrase: "You could always join us a little later", reading: "ユー クッド オールウェイズ ジョイン アス ア リトゥル レイター", meaning: "少し遅れて来てもいいですよ", note: "You could always ～ で「〜という手もある」という提案の表現。" },
    { phrase: "I should be wrapped up by six-thirty", reading: "アイ シュッド ビー ラップト アップ バイ シックスサーティ", meaning: "6時半までには終わっているはず", note: "wrap up は「仕事などを終える」というフレーズ動詞。I should finish by ～ と同義。" },
    { phrase: "at the latest", reading: "アット ザ レイテスト", meaning: "遅くとも", note: "by ～ at the latest で「遅くとも〜までに」という最終期限を示す表現。" },
    { phrase: "Text me the address!", reading: "テキスト ミー ザ アドレス", meaning: "住所をメッセージで送って！", note: "text は「メッセージを送る」という動詞として使える。Send me the address とも言える。" },
  ],

  // ── 健康・生活 ────────────────────────────────────────────────────────────

  401: [
    { phrase: "What seems to be the problem?", reading: "ホワット シームズ トゥ ビー ザ プロブレム", meaning: "どうされましたか・どこが悪いですか", note: "医師が診察の最初に使う定番フレーズ。What brings you in today? とも言う。" },
    { phrase: "sore throat", reading: "ソア スロート", meaning: "喉の痛み", note: "I have a sore throat. は体調不良の表現の基本。" },
    { phrase: "slight fever", reading: "スライト フィーバー", meaning: "軽い発熱", note: "slight は「軽い・わずかな」。a high fever（高熱）との対比で覚えよう。" },
    { phrase: "Let me check your throat and temperature", reading: "レット ミー チェック ユア スロート アンド テンペラチャー", meaning: "喉と体温を診てみましょう", note: "Let me ～ は医療場面での「〜させてください」という申し出表現。" },
    { phrase: "Does it hurt when you swallow?", reading: "ダズ イット ハート ホエン ユー スワロー", meaning: "飲み込むときに痛みはありますか", note: "医師が症状を確認するときの定番質問。" },
    { phrase: "quite a bit", reading: "クワイト ア ビット", meaning: "かなり・相当", note: "a bit（少し）より強く、quite a lot（とても）に近いニュアンス。" },
    { phrase: "especially in the morning", reading: "エスペシャリー イン ザ モーニング", meaning: "特に朝は", note: "especially は「特に」という強調副詞。particularly と言い換えられる。" },
    { phrase: "more tired than usual", reading: "モア タイアード ザン ユージュアル", meaning: "いつもより疲れた", note: "than usual で「いつもより」という比較表現。more than usual とも言える。" },
  ],

  402: [
    { phrase: "Do you work out regularly?", reading: "ドゥ ユー ワーク アウト レギュラリー", meaning: "定期的に運動していますか", note: "work out は「運動する・筋トレをする」というフレーズ動詞。" },
    { phrase: "about three times a week", reading: "アバウト スリー タイムズ ア ウィーク", meaning: "週に約3回", note: "～ times a week / month / year で頻度を表す基本表現。" },
    { phrase: "manage stress", reading: "マネッジ ストレス", meaning: "ストレスをコントロールする", note: "manage は「上手に扱う・管理する」。stress management（ストレス管理）も頻出。" },
    { phrase: "clear my head", reading: "クリア マイ ヘッド", meaning: "頭を整理する・気分転換する", note: "clear one's head は「考えを整理する・リフレッシュする」というイディオム。" },
    { phrase: "I've been meaning to start", reading: "アイブ ビーン ミーニング トゥ スタート", meaning: "始めようとずっと思っていた", note: "mean to do は「〜するつもり」。現在完了進行形で「ずっとそう思っていた」を表す。" },
    { phrase: "I'd suggest starting with", reading: "アイド サジェスト スターティング ウィズ", meaning: "〜から始めることをおすすめします", note: "suggest の後は動名詞（-ing）。I'd recommend starting with とも言える。" },
    { phrase: "brisk walking", reading: "ブリスク ウォーキング", meaning: "速歩・ウォーキング", note: "brisk は「活気のある・きびきびした」。brisk walk は適度な運動として勧められる。" },
    { phrase: "makes a huge difference", reading: "メイクス ア ヒュッジ ディファレンス", meaning: "大きな違いをもたらす", note: "make a difference（違いをもたらす）に huge を加えて強調した表現。" },
  ],

  403: [
    { phrase: "Over the past few months", reading: "オーバー ザ パスト フュー マンスズ", meaning: "ここ数ヶ月で", note: "過去の変化を語り始める定番の導入表現。over the past year とも使える。" },
    { phrase: "improve my diet", reading: "インプルーブ マイ ダイエット", meaning: "食生活を改善する", note: "diet は「食事・食習慣」の意味。ダイエット（減量）だけでなく食生活全般を指す。" },
    { phrase: "cut back on", reading: "カット バック オン", meaning: "〜を減らす・控える", note: "reduce と同義だが口語的。cut back on sugar / coffee / expenses など頻出。" },
    { phrase: "whole grains", reading: "ホール グレインズ", meaning: "全粒穀物", note: "whole wheat bread / brown rice なども全粒穀物の例。栄養の話で頻出。" },
    { phrase: "cook at home", reading: "クック アット ホーム", meaning: "自炊する", note: "eat out（外食する）の反対。home cooking（家庭料理）も同じ文脈で使われる。" },
    { phrase: "control exactly what goes into my meals", reading: "コントロール エグザクトリー ホワット ゴーズ イントゥ マイ ミールズ", meaning: "食事に何が入っているかを正確に管理する", note: "what goes into ～ は「〜に入っているもの」という表現。" },
    { phrase: "resisting late-night snacks", reading: "リジスティング レイトナイト スナックス", meaning: "夜食の誘惑に負けない", note: "resist は「〜に抵抗する・我慢する」という動詞。" },
    { phrase: "gradually getting better at it", reading: "グラジュアリー ゲッティング ベター アット イット", meaning: "少しずつ上手くなっている・慣れてきた", note: "get better at ～ で「〜が上手くなる・得意になる」という進歩の表現。" },
  ],

  404: [
    { phrase: "You look a bit tired lately", reading: "ユー ルック ア ビット タイアード レイトリー", meaning: "最近少し疲れて見えますよ", note: "You look ＋ 形容詞は外見から状態を気遣う自然な表現。" },
    { phrase: "I've been under a lot of pressure", reading: "アイブ ビーン アンダー ア ロット オブ プレッシャー", meaning: "ずっとプレッシャーが大きかった", note: "be under pressure / be under stress は仕事や生活の重圧を表す表現。" },
    { phrase: "I just can't seem to switch off", reading: "アイ ジャスト キャント シーム トゥ スウィッチ オフ", meaning: "仕事のことを切り離せない・頭が休まらない", note: "switch off は「電源を切る」が転じて「仕事モードをオフにする」こと。" },
    { phrase: "I know exactly how that feels", reading: "アイ ノウ エグザクトリー ハウ ザット フィールズ", meaning: "その気持ちよくわかります", note: "I know how you feel / I've been there も共感を示す類似表現。" },
    { phrase: "meditation or deep breathing exercises", reading: "メディテーション オア ディープ ブリーシング エクササイズィズ", meaning: "瞑想や深呼吸エクササイズ", note: "ストレス管理の方法として話題に出る語。mindfulness meditation も関連語。" },
    { phrase: "I've always assumed it wouldn't work for me", reading: "アイブ オールウェイズ アシュームド イット ウドゥント ワーク フォー ミー", meaning: "自分には効果がないとずっと思っていた", note: "assume は「〜と思い込む・仮定する」。" },
    { phrase: "worth giving it a proper try", reading: "ワース ギビング イット ア プロパー トライ", meaning: "ちゃんと試してみる価値がある", note: "worth ＋ -ing は「〜する価値がある」という重要構文。" },
  ],

  405: [
    { phrase: "a runny nose", reading: "ア ラニー ノーズ", meaning: "鼻水", note: "have a runny nose が標準表現。a stuffy nose（鼻づまり）とセットで覚えよう。" },
    { phrase: "feel a bit achy all over", reading: "フィール ア ビット エイキー オール オーバー", meaning: "全身がなんとなく痛い・だるい", note: "achy は「痛みのある・だるい」という口語的な形容詞。" },
    { phrase: "mild cold", reading: "マイルド コールド", meaning: "軽い風邪", note: "mild は「軽い・穏やかな」。a severe cold（ひどい風邪）との対比で覚えよう。" },
    { phrase: "over-the-counter medicine", reading: "オーバー ザ カウンター メディスン", meaning: "市販薬（処方箋不要の薬）", note: "OTC medicine とも略される。prescription medicine（処方薬）の反対。" },
    { phrase: "relieve your symptoms", reading: "リリーブ ユア シンプトムズ", meaning: "症状を和らげる", note: "relieve は「（痛みや不快感を）軽くする」という動詞。" },
    { phrase: "every six hours", reading: "エブリー シックス アワーズ", meaning: "6時間ごとに", note: "薬の服用間隔を表す表現。every four to six hours（4〜6時間ごとに）も頻出。" },
    { phrase: "get plenty of rest", reading: "ゲット プレンティ オブ レスト", meaning: "十分に休む", note: "plenty of は「たくさんの・十分な」。get plenty of sleep とも言える。" },
    { phrase: "symptoms worsen", reading: "シンプトムズ ワーセン", meaning: "症状が悪化する", note: "worsen は「悪化する」という動詞。get worse とも言える。" },
  ],

  406: [
    { phrase: "quality sleep", reading: "クオリティ スリープ", meaning: "質の良い睡眠", note: "quality は名詞の前に置くと「質の高い」という形容詞的な使い方になる。" },
    { phrase: "overall health", reading: "オーバーオール ヘルス", meaning: "総合的な健康状態", note: "overall は「全体的な・総合的な」。overall performance / overall score なども頻出。" },
    { phrase: "aim for seven to nine hours", reading: "エイム フォー セブン トゥ ナイン アワーズ", meaning: "7〜9時間を目標にする", note: "aim for ～ は「〜を目指す・目標にする」という動詞表現。" },
    { phrase: "go to bed at the same time", reading: "ゴー トゥ ベッド アット ザ セイム タイム", meaning: "毎晩同じ時間に寝る", note: "体内時計を整えるための習慣を表す。consistent bedtime（一定の就寝時刻）とも言える。" },
    { phrase: "avoid looking at screens", reading: "アボイド ルッキング アット スクリーンズ", meaning: "画面を見るのを避ける", note: "avoid ＋ -ing は「〜することを避ける」という重要構文。" },
    { phrase: "improves dramatically", reading: "インプルーブズ ドラマティカリー", meaning: "劇的に改善する", note: "dramatically は「劇的に・著しく」という副詞。significantly も同義。" },
    { phrase: "a short twenty-minute nap", reading: "ア ショート トゥエンティ ミニット ナップ", meaning: "短い20分の昼寝", note: "nap は短い昼寝を指す。take a nap（昼寝をする）の形でよく使われる。" },
    { phrase: "sharpen your concentration", reading: "シャープン ユア コンセントレーション", meaning: "集中力を高める", note: "sharpen は「磨く・鋭くする」。sharpen one's skills とも使われる。" },
  ],

  407: [
    { phrase: "I'm interested in joining your gym", reading: "アイム インタレスティッド イン ジョイニング ユア ジム", meaning: "ジムに入会したいと思っています", note: "be interested in ＋ -ing で「〜することに興味がある」という表現。" },
    { phrase: "Could you walk me through the membership options?", reading: "クッド ユー ウォーク ミー スルー ザ メンバーシップ オプションズ", meaning: "会員プランを説明していただけますか", note: "walk someone through ～ は「〜を順序立てて説明する」というフレーズ動詞。" },
    { phrase: "monthly plans and annual plans", reading: "マンスリー プランズ アンド アニュアル プランズ", meaning: "月額プランと年間プラン", note: "monthly（月ごとの）と annual（年間の）は費用・契約の話で必須の対比語。" },
    { phrase: "a twenty percent discount", reading: "ア トゥエンティ パーセント ディスカウント", meaning: "20%割引", note: "give / offer a discount（割引を提供する）も覚えておきたい。" },
    { phrase: "compared to paying monthly", reading: "コンペアド トゥ ペイイング マンスリー", meaning: "月払いと比べると", note: "compared to ～ は比較を示す表現。compared with とも言える。" },
    { phrase: "Are group fitness classes included?", reading: "アー グループ フィットネス クラシーズ インクルーデッド", meaning: "グループフィットネスクラスは含まれていますか", note: "included in the membership fee（会費に含まれる）の確認表現。" },
    { phrase: "at no extra cost", reading: "アット ノー エクストラ コスト", meaning: "追加費用なしで", note: "free of charge / at no additional charge とも言い換えられる。" },
  ],

  408: [
    { phrase: "just as important as", reading: "ジャスト アズ インポータント アズ", meaning: "〜と同じくらい重要な", note: "as ～ as の同等比較構文。just で「まさに同様に」という強調が加わる。" },
    { phrase: "looking after your physical health", reading: "ルッキング アフター ユア フィジカル ヘルス", meaning: "身体的健康を気にかけること", note: "look after ～ は「〜の世話をする・気にかける」というフレーズ動詞。" },
    { phrase: "feel overwhelmed or anxious", reading: "フィール オーバーウェルムド オア アングシャス", meaning: "圧倒された・不安な気持ちになる", note: "overwhelmed（圧倒された）と anxious（不安な）はメンタルヘルスの話でよく出る語。" },
    { phrase: "asking for help is a sign of courage", reading: "アスキング フォー ヘルプ イズ ア サイン オブ カレッジ", meaning: "助けを求めることは勇気の証", note: "a sign of ～ は「〜の表れ・しるし」という表現。" },
    { phrase: "spending quality time with loved ones", reading: "スペンディング クオリティ タイム ウィズ ラブド ワンズ", meaning: "大切な人と充実した時間を過ごす", note: "quality time は「充実した時間」。loved ones は「愛する人たち・家族や友人」。" },
    { phrase: "make a profound difference", reading: "メイク ア プロファウンド ディファレンス", meaning: "大きな変化をもたらす", note: "profound は「深い・重大な」という形容詞。a significant difference とも言える。" },
    { phrase: "be kind and patient with yourself", reading: "ビー カインド アンド ペイシェント ウィズ ユアセルフ", meaning: "自分自身に優しく辛抱強く接する", note: "self-compassion（自己思いやり）を表すフレーズ。" },
  ],

  409: [
    { phrase: "It smells wonderful", reading: "イット スメルズ ワンダフル", meaning: "とても良い香りがする", note: "It smells ＋ 形容詞で「〜な匂いがする」。It smells delicious / amazing なども使いやすい。" },
    { phrase: "grilled salmon", reading: "グリルド サーモン", meaning: "グリルしたサーモン", note: "grilled（焼いた）/ baked（オーブン焼き）/ steamed（蒸した）など調理法の表現。" },
    { phrase: "roasted vegetables", reading: "ロウステッド ベジタブルズ", meaning: "ローストした野菜", note: "roast は「オーブンや高温で焼く」こと。roasted ＋ food で調理法を表す。" },
    { phrase: "nutritious", reading: "ニュートリシャス", meaning: "栄養価が高い", note: "healthy / nourishing / wholesome も同義の形容詞。" },
    { phrase: "from start to finish", reading: "フロム スタート トゥ フィニッシュ", meaning: "最初から最後まで・全工程で", note: "所要時間や作業全体を表すときに使う表現。" },
    { phrase: "I'll send you the recipe", reading: "アイル センド ユー ザ レシピ", meaning: "レシピを送ります", note: "I'll ＋ 動詞は近い将来の意図・申し出を表す。" },
    { phrase: "much simpler than it looks", reading: "マッチ シンプラー ザン イット ルックス", meaning: "見た目よりずっと簡単", note: "than it looks / seems は「見た目とは違って」を表す表現。" },
  ],

  410: [
    { phrase: "Giving up a bad habit", reading: "ギビング アップ ア バッド ハビット", meaning: "悪い習慣をやめること", note: "give up ～ は「〜をやめる・諦める」というフレーズ動詞。quit とも言える。" },
    { phrase: "one of the most rewarding things", reading: "ワン オブ ザ モスト リワーディング シングズ", meaning: "最もやりがいのあることの一つ", note: "rewarding は「報われる・やりがいのある」。fulfilling / satisfying とも言い換えられる。" },
    { phrase: "cutting down on sugar", reading: "カッティング ダウン オン シュガー", meaning: "砂糖を減らす", note: "cut down on ～ と cut back on ～ はどちらも「〜を減らす」というフレーズ動詞。" },
    { phrase: "start with small, manageable steps", reading: "スタート ウィズ スモール マネッジャブル ステップス", meaning: "小さくて実行可能なステップから始める", note: "manageable は「管理できる・無理のない」。achievable / realistic とも言える。" },
    { phrase: "be patient with yourself", reading: "ビー ペイシェント ウィズ ユアセルフ", meaning: "自分に辛抱強く接する", note: "habit change（習慣の変化）の話でよく使われる自己思いやりの表現。" },
    { phrase: "Setting clear goals", reading: "セッティング クリア ゴールズ", meaning: "明確な目標を設定すること", note: "set clear / specific goals は目標設定の基本表現。SMART goals とも関連する。" },
    { phrase: "tracking your daily progress", reading: "トラッキング ユア デイリー プログレス", meaning: "日々の進歩を記録する", note: "track は「追跡する・記録する」。keep track of ～（〜の記録をつける）も同義。" },
    { phrase: "if you slip up occasionally", reading: "イフ ユー スリップ アップ オケイジョナリー", meaning: "たまに失敗してしまっても", note: "slip up は「うっかり失敗する・ミスをする」というフレーズ動詞。" },
    { phrase: "keep on trying", reading: "キープ オン トライング", meaning: "試し続ける・諦めない", note: "keep on ＋ -ing は「〜し続ける」。keep trying / never give up と同義。" },
  ],

  // ── 社会・文化 ────────────────────────────────────────────────────────────

  501: [
    { phrase: "more and more visible", reading: "モア アンド モア ビジブル", meaning: "ますます目に見えるようになっている", note: "more and more ＋ 形容詞で「だんだん〜になっている」という変化を表す表現。" },
    { phrase: "in our everyday lives", reading: "イン アワー エブリデイ ライブズ", meaning: "日常生活の中で", note: "in daily life とほぼ同義。everyday は形容詞として「日常の」を意味する。" },
    { phrase: "weather patterns", reading: "ウェザー パターンズ", meaning: "気象パターン・天気の傾向", note: "気候変動の議論でよく使われる。weather patterns have changed（気象パターンが変わった）。" },
    { phrase: "over the past decade", reading: "オーバー ザ パスト デケイド", meaning: "過去10年間で", note: "decade は10年間。over the past few years / century なども同じ構造。" },
    { phrase: "ordinary individuals", reading: "オーディナリー インディビジュアルズ", meaning: "一般の個人", note: "ordinary people とほぼ同義。" },
    { phrase: "make a difference", reading: "メイク ア ディファレンス", meaning: "変化をもたらす・貢献する", note: "社会問題や環境の話でよく出る表現。make a real difference（本当に変化をもたらす）も頻出。" },
    { phrase: "reducing plastic use", reading: "リデューシング プラスティック ユース", meaning: "プラスチックの使用を減らす", note: "reduce plastic consumption / waste とも言える。環境の話の基本表現。" },
    { phrase: "cutting back on meat consumption", reading: "カッティング バック オン ミート コンサンプション", meaning: "肉の消費を減らす", note: "cut back on は「〜を削減する」。consumption は「消費（量）」。" },
  ],

  502: [
    { phrase: "fundamentally changed", reading: "ファンダメンタリー チェインジド", meaning: "根本的に変えた", note: "fundamentally は「根本的に・本質的に」という副詞。" },
    { phrase: "form our sense of identity", reading: "フォーム アワー センス オブ アイデンティティ", meaning: "アイデンティティの感覚を形成する", note: "sense of identity は「自己認識・自分らしさ」。" },
    { phrase: "stay connected with", reading: "ステイ コネクテッド ウィズ", meaning: "〜とつながり続ける", note: "stay in touch with とほぼ同義。SNSが普及した現代でよく使う表現。" },
    { phrase: "the spread of misinformation", reading: "ザ スプレッド オブ ミスインフォメーション", meaning: "誤情報の拡散", note: "misinformation（意図しない誤情報）と disinformation（意図的な偽情報）は区別されることがある。" },
    { phrase: "cyberbullying", reading: "サイバーブリイング", meaning: "ネットいじめ・サイバーいじめ", note: "SNSやオンライン上での嫌がらせを指す。online harassment とも言う。" },
    { phrase: "use social media mindfully and critically", reading: "ユーズ ソーシャル メディア マインドフリー アンド クリティカリー", meaning: "SNSを意識的かつ批判的に使う", note: "mindfully（意識的に）と critically（批判的に）は情報リテラシーの話でよく出る副詞。" },
    { phrase: "passively scrolling through your feed", reading: "パッシブリー スクローリング スルー ユア フィード", meaning: "受動的にフィードをスクロールする", note: "passively（受動的に）は actively（積極的に）の反対。scroll through ～ は「〜をスクロールする」。" },
    { phrase: "its impact depends entirely on how we choose to use it", reading: "イッツ インパクト ディペンズ エンタイアリー オン ハウ ウィー チューズ トゥ ユーズ イット", meaning: "その影響は私たちの使い方次第", note: "depends on how ～ は「〜の仕方次第」という表現。entirely で全面的な依存を強調。" },
  ],

  503: [
    { phrase: "cultural differences", reading: "カルチャラル ディファレンシィズ", meaning: "文化的な違い", note: "cross-cultural communication（異文化間コミュニケーション）の話でよく出る語。" },
    { phrase: "since you moved to a new country", reading: "シンス ユー ムーブト トゥ ア ニュー カントリー", meaning: "新しい国に引っ越してから", note: "since ＋ 過去形で「〜してからずっと」という時間の起点を表す。" },
    { phrase: "express respect", reading: "エクスプレス リスペクト", meaning: "敬意を表す", note: "show respect / demonstrate respect とも言える。" },
    { phrase: "what I grew up with", reading: "ホワット アイ グルー アップ ウィズ", meaning: "私が育った環境・慣れ親しんできたもの", note: "grow up with ～ は「〜と一緒に育つ・〜に慣れ親しんで育つ」。" },
    { phrase: "Could you give me a specific example?", reading: "クッド ユー ギブ ミー ア スペシフィック エグザンプル", meaning: "具体的な例を挙げてもらえますか", note: "議論や説明を深めるときの定番フレーズ。" },
    { phrase: "bow slightly", reading: "バウ スライトリー", meaning: "軽くお辞儀をする", note: "bow は「お辞儀をする」という動詞。slightly（わずかに）で軽いお辞儀を表す。" },
    { phrase: "in a position of authority", reading: "イン ア ポジション オブ オーソリティ", meaning: "権威ある立場にある", note: "authority は「権限・権威」。someone in authority / a person of authority とも言う。" },
    { phrase: "a firm handshake and direct eye contact", reading: "ア ファーム ハンドシェイク アンド ダイレクト アイ コンタクト", meaning: "しっかりした握手と直接的なアイコンタクト", note: "firm（しっかりした）handshake は欧米のビジネスマナーの基本。" },
  ],

  504: [
    { phrase: "volunteering at a local food bank", reading: "ボランティアリング アット ア ローカル フード バンク", meaning: "地元のフードバンクでボランティアをする", note: "food bank は食料を必要な人に提供する施設。volunteer at ～（〜でボランティアをする）。" },
    { phrase: "every other Saturday", reading: "エブリー アザー サタデイ", meaning: "隔週土曜日に", note: "every other ～ は「1つおきの〜・隔〜」という表現。every other day（隔日）も頻出。" },
    { phrase: "one of the most meaningful things I do", reading: "ワン オブ ザ モスト ミーニングフル シングズ アイ ドゥ", meaning: "自分がする中で最もやりがいのあること", note: "meaningful は「意味深い・やりがいのある」という形容詞。" },
    { phrase: "the impact … is genuinely significant", reading: "ザ インパクト イズ ジェニュインリー シグニフィカント", meaning: "その影響は本当に大きい", note: "genuinely（本当に）と significant（重大な）を組み合わせた強調表現。" },
    { phrase: "depend on the food bank", reading: "ディペンド オン ザ フード バンク", meaning: "フードバンクに頼る", note: "depend on ～ は「〜に依存する・頼る」。rely on とほぼ同義。" },
    { phrase: "get through difficult periods", reading: "ゲット スルー ディフィカルト ピアリオッズ", meaning: "困難な時期を乗り越える", note: "get through ～ は「〜を乗り越える・切り抜ける」。survive / overcome と同義。" },
    { phrase: "a new and humbling perspective", reading: "ア ニュー アンド ハンブリング パースペクティブ", meaning: "新しく謙虚にさせる視点", note: "humbling は「謙虚にさせる・自分を小さく感じさせる」という形容詞。" },
    { phrase: "deeply connected to my local community", reading: "ディープリー コネクテッド トゥ マイ ローカル コミュニティ", meaning: "地域社会と深くつながった", note: "feel connected to ～ は「〜とつながりを感じる」という重要表現。" },
  ],

  505: [
    { phrase: "as effective as", reading: "アズ エフェクティブ アズ", meaning: "〜と同じくらい効果的な", note: "as ～ as の同等比較構文。as good as / as efficient as なども同様。" },
    { phrase: "traditional classroom education", reading: "トラディショナル クラスルーム エデュケーション", meaning: "従来の教室での教育", note: "face-to-face learning / in-person learning とも言われる。" },
    { phrase: "it really depends on the individual learner", reading: "イット リアリー ディペンズ オン ジ インディビジュアル ラーナー", meaning: "個々の学習者次第です", note: "It depends on ～ は「〜次第」という便利な表現。" },
    { phrase: "learning style", reading: "ラーニング スタイル", meaning: "学習スタイル・学び方の好み", note: "visual / auditory / kinesthetic learner などの学習スタイルの分類がある。" },
    { phrase: "thrive in a self-directed environment", reading: "スライブ イン ア セルフ ダイレクテッド エンバイアロンメント", meaning: "自主学習環境で成果を出す", note: "thrive は「繁栄する・活躍する」。self-directed learning（自律学習）も関連語。" },
    { phrase: "benefit greatly from face-to-face interaction", reading: "ベネフィット グレイトリー フロム フェイス トゥ フェイス インタラクション", meaning: "対面交流から大きく恩恵を受ける", note: "benefit from ～ は「〜から恩恵を受ける・〜が役立つ」。" },
    { phrase: "a thoughtful combination of both approaches", reading: "ア ソートフル コンビネーション オブ ボウス アプローチィズ", meaning: "両方のアプローチの思慮ある組み合わせ", note: "thoughtful は「思慮深い・よく考えられた」。blended learning（ブレンデッド学習）という概念と関連。" },
  ],

  506: [
    { phrase: "Spending an extended period of time living abroad", reading: "スペンディング アン エクステンデッド ピアリオッド オブ タイム リビング アブロード", meaning: "海外で長期間生活すること", note: "extended period は「長期間」。an extended stay とも言える。" },
    { phrase: "You're constantly exposed to", reading: "ユーアー コンスタントリー エクスポーズト トゥ", meaning: "〜に絶えずさらされている", note: "be exposed to ～ は「〜にさらされる・触れる」という重要表現。" },
    { phrase: "challenge your most deeply held assumptions", reading: "チャレンジ ユア モスト ディープリー ヘルド アサンプションズ", meaning: "深く根ざした思い込みに挑戦する", note: "assumption は「思い込み・仮定」。challenge assumptions（思い込みに疑問を投げかける）はよく使う表現。" },
    { phrase: "language barriers", reading: "ランゲッジ バリアーズ", meaning: "言語の壁", note: "overcome language barriers（言葉の壁を乗り越える）はよく使われるフレーズ。" },
    { phrase: "homesickness", reading: "ホームシックネス", meaning: "ホームシック・望郷の念", note: "feel homesick（ホームシックになる）とも言う。" },
    { phrase: "remarkable resilience", reading: "リマーカブル リジリアンス", meaning: "並外れた回復力・立ち直る力", note: "resilience は「困難からの回復力」。build resilience（回復力を養う）も頻出。" },
    { phrase: "a deeper sense of empathy", reading: "ア ディーパー センス オブ エンパシー", meaning: "より深い共感力", note: "empathy（共感）と sympathy（同情）は区別して使う。develop empathy とも言える。" },
    { phrase: "the single most transformative experience", reading: "ザ シングル モスト トランスフォーマティブ エクスペリエンス", meaning: "唯一最も変革的な体験", note: "single most は「他に並ぶものがない最も〜」という最上級の強調表現。" },
  ],

  507: [
    { phrase: "Don't you find it a little unsettling", reading: "ドント ユー ファインド イット ア リトゥル アンセトリング", meaning: "少し不安に思いませんか", note: "Don't you ～? は共感を求める否定疑問文。unsettling は「不安にさせる・落ち着かなくなるような」。" },
    { phrase: "personal data", reading: "パーソナル デイタ", meaning: "個人データ・個人情報", note: "privacy（プライバシー）の話での基本語。personal information とほぼ同義。" },
    { phrase: "companies collect about us", reading: "カンパニーズ コレクト アバウト アス", meaning: "企業が私たちについて収集する", note: "collect data on users（ユーザーのデータを収集する）もよく使われる表現。" },
    { phrase: "Every app we download seems to want access to", reading: "エブリー アップ ウィー ダウンロード シームズ トゥ ウォント アクセス トゥ", meaning: "ダウンロードするすべてのアプリが〜へのアクセスを求めているようだ", note: "seem to ～ は「〜のように思える」という控えめな表現。" },
    { phrase: "reading the terms and conditions", reading: "リーディング ザ タームズ アンド コンディションズ", meaning: "利用規約を読む", note: "T&C / terms of service（利用規約）とも呼ばれる。" },
    { phrase: "before clicking 'agree'", reading: "ビフォー クリッキング アグリー", meaning: "「同意する」をクリックする前に", note: "デジタル社会の具体的な場面を表す表現。" },
    { phrase: "a really good habit to develop", reading: "ア リアリー グッド ハビット トゥ ディベロップ", meaning: "身につけるべきとても良い習慣", note: "develop a habit（習慣を身につける）はよく使われる表現。" },
    { phrase: "without thinking twice", reading: "ウィズアウト シンキング トワイス", meaning: "よく考えずに・即座に", note: "think twice は「よく考える・躊躇する」。without thinking twice は「深く考えずに」。" },
  ],

  508: [
    { phrase: "opens up a remarkable world of opportunities", reading: "オープンズ アップ ア リマーカブル ワールド オブ オポチュニティーズ", meaning: "素晴らしい機会の世界を開く", note: "open up opportunities は「機会を広げる」。remarkable で強調している。" },
    { phrase: "Not only does it allow you to", reading: "ノット オンリー ダズ イット アロウ ユー トゥ", meaning: "〜できるだけでなく", note: "Not only A but also B（AだけでなくBも）の構文。倒置により強調。" },
    { phrase: "a far wider range of people", reading: "ア ファー ワイダー レンジ オブ ピープル", meaning: "はるかに広い範囲の人々", note: "far は比較級を強調する副詞。a far greater impact / far more options なども頻出。" },
    { phrase: "a deeper and more nuanced understanding", reading: "ア ディーパー アンド モア ニュアンスト アンダースタンディング", meaning: "より深くニュアンスのある理解", note: "nuanced は「微妙な差異を含む・複雑な」という形容詞。" },
    { phrase: "research has consistently shown", reading: "リサーチ ハズ コンシステントリー ショウン", meaning: "研究が一貫して示している", note: "研究や調査の結果を引用するときの定番表現。Studies have shown / Research suggests とも言える。" },
    { phrase: "bilingual people", reading: "バイリンガル ピープル", meaning: "二言語話者・バイリンガルの人", note: "bilingual（二言語）/ multilingual（多言語）は言語学習の話でよく出る。" },
    { phrase: "it's never too late to start", reading: "イッツ ネバー トゥー レイト トゥ スタート", meaning: "始めるのに遅すぎることはない", note: "励ましや後押しの定番フレーズ。It's never too late to ＋ 動詞原形。" },
    { phrase: "make a huge and meaningful difference", reading: "メイク ア ヒュッジ アンド ミーニングフル ディファレンス", meaning: "大きく意義のある変化をもたらす", note: "make a difference の強調版。huge と meaningful を重ねて強調している。" },
  ],

  509: [
    { phrase: "making a real effort to", reading: "メイキング ア リアル エフォート トゥ", meaning: "〜するために本当に努力している", note: "make an effort（努力する）に real を加えて強調した表現。" },
    { phrase: "live more sustainably", reading: "リブ モア サステイナブリー", meaning: "より持続可能な生活をする", note: "sustainably は「持続可能な方法で」という副詞。sustainable lifestyle も関連語。" },
    { phrase: "composting my food waste", reading: "コンポスティング マイ フード ウェイスト", meaning: "食品廃棄物をコンポスト（堆肥化）する", note: "composting は有機ゴミを肥料にすること。zero-waste lifestyle の一部。" },
    { phrase: "reusable water bottle", reading: "リユーザブル ウォーター ボトゥル", meaning: "繰り返し使える水筒", note: "reusable は「再利用可能な」。reusable bags / reusable containers も関連語。" },
    { phrase: "Those are such great steps", reading: "ゾーズ アー サッチ グレイト ステップス", meaning: "それらは本当に素晴らしい取り組みですね", note: "such ＋ 形容詞 ＋ 名詞で感情を込めた強調表現。" },
    { phrase: "locally grown produce", reading: "ローカリー グロウン プロデュース", meaning: "地元で栽培された農産物", note: "locally sourced / locally produced も同義。farm-to-table（農場から食卓へ）と関連する概念。" },
    { phrase: "Every small action genuinely counts", reading: "エブリー スモール アクション ジェニュインリー カウンツ", meaning: "小さな行動のひとつひとつが本当に重要", note: "every little bit counts（少しでも積み重なれば意味がある）という表現の強調版。" },
    { phrase: "for future generations", reading: "フォー フューチャー ジェネレーションズ", meaning: "将来の世代のために", note: "環境・社会問題の議論でよく出る表現。" },
  ],

  510: [
    { phrase: "deeply woven into our everyday lives", reading: "ディープリー ウォウブン イントゥ アワー エブリデイ ライブズ", meaning: "日常生活に深く組み込まれた", note: "be woven into ～ は「〜に織り込まれている・組み込まれている」という比喩表現。" },
    { phrase: "voice assistants", reading: "ボイス アシスタンツ", meaning: "音声アシスタント（SiriやAlexaなど）", note: "virtual assistants とも言う。AI技術の話でよく出る語。" },
    { phrase: "recommendation algorithms", reading: "レコメンデーション アルゴリズムズ", meaning: "推薦アルゴリズム", note: "NetflixやYouTubeなどが使う「あなたへのおすすめ」を生成する仕組み。" },
    { phrase: "raises urgent questions about", reading: "レイジズ アージェント クエスチョンズ アバウト", meaning: "〜について緊急の問題を提起する", note: "raise a question は「疑問を提起する」。urgent（緊急の）で重要性を強調。" },
    { phrase: "who is ultimately responsible for", reading: "フー イズ アルティメットリー リスポンシブル フォー", meaning: "最終的に誰が〜に責任を持つか", note: "ultimately（最終的に）と responsible for（〜に責任がある）の組み合わせ。" },
    { phrase: "at a rapid pace", reading: "アット ア ラピッド ペイス", meaning: "急速なペースで", note: "rapidly / at an unprecedented pace なども同義。" },
    { phrase: "it's vital for society to have", reading: "イッツ バイタル フォー ソサイエティ トゥ ハブ", meaning: "社会が〜を持つことが不可欠だ", note: "vital（不可欠な）は essential / crucial と同義の強い形容詞。" },
    { phrase: "open and honest conversations", reading: "オープン アンド オネスト コンバセーションズ", meaning: "オープンで誠実な議論", note: "transparent discussions / frank dialogue とも言える。" },
    { phrase: "governed, and regulated", reading: "ガバンド アンド レギュレイテッド", meaning: "管理され、規制される", note: "govern（統治する）と regulate（規制する）はAI・テクノロジー政策の話でよく出るペア。" },
  ],


  // ── 日常会話 追加 ─────────────────────────────────────────────────────────

  111: [
    { phrase: "I wanted to say I'm really sorry", reading: "アイ ウォンテッド トゥ セイ アイム リアリー ソーリー", meaning: "本当に申し訳なかったと言いたかった", note: "過去進行形 wanted で「ずっと言いたかった」という誠意が伝わる謝罪表現。" },
    { phrase: "I shouldn't have said what I said", reading: "アイ シュドゥント ハブ セッド ホワット アイ セッド", meaning: "あんなことを言うべきではなかった", note: "shouldn't have ＋ 過去分詞で「〜すべきではなかった（後悔）」を表す重要構文。" },
    { phrase: "I appreciate you saying that", reading: "アイ アプリシエイト ユー セイイング ザット", meaning: "そう言ってくれてありがとう", note: "I appreciate ＋ 動名詞で感謝を表す。Thank you for saying that とほぼ同義。" },
    { phrase: "I was pretty upset at the time", reading: "アイ ワズ プリティ アプセット アット ザ タイム", meaning: "その時はかなり動揺していた", note: "at the time は「その当時・その時点では」という時間を特定する表現。" },
    { phrase: "I've had a chance to think it over", reading: "アイブ ハッド ア チャンス トゥ シンク イット オーバー", meaning: "じっくり考える時間ができた", note: "think it over は「じっくり考え直す」というフレーズ動詞。" },
    { phrase: "that's no excuse", reading: "ザッツ ノー エクスキューズ", meaning: "それは言い訳にならない", note: "自分のふるまいを反省して認める誠実な表現。No excuse for that とも言える。" },
    { phrase: "I accept your apology", reading: "アイ アクセプト ユア アポロジー", meaning: "謝罪を受け入れます", note: "謝罪を受け入れるときの丁寧な表現。Apology accepted とも言う。" },
    { phrase: "let's just move forward", reading: "レッツ ジャスト ムーブ フォワード", meaning: "前に進みましょう", note: "過去のことを引きずらずに先へ進もうという前向きな提案表現。" },
  ],

  112: [
    { phrase: "quiet residential area", reading: "クワイエット レジデンシャル エリア", meaning: "静かな住宅街", note: "residential は「住宅の・居住用の」という形容詞。residential neighborhood とも言う。" },
    { phrase: "just around the corner", reading: "ジャスト アラウンド ザ コーナー", meaning: "すぐ近くに・角を曲がったところに", note: "物理的な近さを表すイディオム。It's just around the corner.（すぐそこだよ）" },
    { phrase: "a genuine sense of community", reading: "ア ジェニュイン センス オブ コミュニティ", meaning: "本物のコミュニティ意識", note: "genuine は「本物の・真の」。a strong sense of community とも言える。" },
    { phrase: "farmer's market", reading: "ファーマーズ マーケット", meaning: "農産物直売市場", note: "地元の農家が直接販売するマーケット。地域のコミュニティの象徴としてよく使われる表現。" },
    { phrase: "public transport could be better", reading: "パブリック トランスポート クッド ビー ベター", meaning: "公共交通機関がもっと良ければいいのに", note: "could be better は婉曲的に「十分ではない」と批判する表現。" },
    { phrase: "I usually drive to work", reading: "アイ ユージュアリー ドライブ トゥ ワーク", meaning: "たいてい車で通勤する", note: "drive to work / take the train to work などの通勤手段の表現。" },
    { phrase: "the only downside", reading: "ザ オンリー ダウンサイド", meaning: "唯一の欠点・デメリット", note: "downside は「欠点・マイナス面」。the only downside is で唯一の問題点を挙げる表現。" },
  ],

  113: [
    { phrase: "I hate to ask", reading: "アイ ヘイト トゥ アスク", meaning: "頼みにくいのですが", note: "お願いをする前の前置き表現。I'm sorry to ask とも言える。依頼をやわらかくする効果がある。" },
    { phrase: "Would you be able to help me", reading: "ウッド ユー ビー エイブル トゥ ヘルプ ミー", meaning: "手伝っていただけますか", note: "Could you help me? より丁寧な依頼表現。be able to で能力・可能性をやわらかく問う。" },
    { phrase: "move some furniture", reading: "ムーブ サム ファーニチャー", meaning: "家具を移動する", note: "furniture は不可算名詞。some furniture / a piece of furniture のように使う。" },
    { phrase: "if that works for you", reading: "イフ ザット ワークス フォー ユー", meaning: "もしご都合がよければ", note: "相手の都合を確認する丁寧な付け足し表現。if that's okay with you とも言える。" },
    { phrase: "It shouldn't take more than a couple of hours", reading: "イット シュドゥント テイク モア ザン ア カップル オブ アワーズ", meaning: "2〜3時間もあれば十分なはず", note: "a couple of は「2〜3の・少しの」という表現。shouldn't take long とも言える。" },
    { phrase: "Just send me your address", reading: "ジャスト センド ミー ユア アドレス", meaning: "住所を送ってください", note: "Just は「〜するだけでいい」という軽い命令・お願いの表現。" },
    { phrase: "Do you need help with anything else?", reading: "ドゥ ユー ニード ヘルプ ウィズ エニシング エルス", meaning: "他に何か手伝えることはありますか", note: "Is there anything else I can do? と同義の気遣い表現。" },
  ],

  114: [
    { phrase: "fondest memories", reading: "フォンデスト メモリーズ", meaning: "最も懐かしい・大切な思い出", note: "fond は「好きな・懐かしい」という形容詞。fondly remember（懐かしく思い出す）も関連表現。" },
    { phrase: "spending summers at", reading: "スペンディング サマーズ アット", meaning: "〜で夏を過ごすこと", note: "spend + 時間 + at / in + 場所で「場所で時間を過ごす」を表す基本表現。" },
    { phrase: "We would wake up early", reading: "ウィー ウッド ウェイク アップ アーリー", meaning: "早起きをしたものだった", note: "would ＋ 動詞原形で過去の習慣的行為を表す。used to とほぼ同義。" },
    { phrase: "exploring the fields and forests", reading: "エクスプローリング ザ フィールズ アンド フォレスツ", meaning: "野原や森を探検する", note: "explore は「探検する・調べる」。exploring nature（自然を探索する）は子供時代の描写でよく使われる。" },
    { phrase: "a big home-cooked dinner", reading: "ア ビッグ ホームクックト ディナー", meaning: "大きな手料理の夕食", note: "home-cooked は「家庭で作った」というハイフン複合形容詞。home-cooked meal とも言える。" },
    { phrase: "the value of slowing down", reading: "ザ バリュー オブ スローイング ダウン", meaning: "ゆっくりすることの価値", note: "slow down は「ペースを落とす・ゆっくりする」というフレーズ動詞。" },
    { phrase: "appreciating the little things", reading: "アプリシエイティング ザ リトゥル シングズ", meaning: "小さなことに感謝する", note: "appreciate the little things in life（人生の小さなことを大切にする）は英語でよく使われる表現。" },
  ],

  115: [
    { phrase: "throwing a surprise birthday party", reading: "スローイング ア サプライズ バースデー パーティー", meaning: "サプライズ誕生日パーティーを開く", note: "throw a party は「パーティーを開く・主催する」という口語表現。" },
    { phrase: "How many people are you planning to invite?", reading: "ハウ メニー ピープル アー ユー プランニング トゥ インバイト", meaning: "何人招待するつもりですか", note: "イベントの規模を確認する自然な質問。How many guests are you expecting? とも言える。" },
    { phrase: "renting the private room", reading: "レンティング ザ プライベート ルーム", meaning: "個室を借りる", note: "rent out a room / book a private dining room なども同様の表現。" },
    { phrase: "downtown", reading: "ダウンタウン", meaning: "街の中心部・繁華街", note: "in the city center とほぼ同義。in the heart of the city とも言える。" },
    { phrase: "That sounds perfect", reading: "ザット サウンズ パーフェクト", meaning: "それは完璧ですね", note: "提案・アイデアへの強い賛同を示すフレーズ。That sounds great / amazing なども同様。" },
    { phrase: "I can handle the decorations", reading: "アイ キャン ハンドル ザ デコレーションズ", meaning: "デコレーションは私が担当できます", note: "handle は「担当する・対処する」。I'll take care of the decorations とも言える。" },
    { phrase: "if you take care of", reading: "イフ ユー テイク ケア オブ", meaning: "あなたが〜を担当してくれるなら", note: "take care of ～ は「〜の担当をする・〜を処理する」という便利なフレーズ動詞。" },
  ],

  116: [
    { phrase: "Have you tried that new coffee shop?", reading: "ハブ ユー トライド ザット ニュー コーヒー ショップ", meaning: "その新しいコーヒーショップに行ってみましたか", note: "Have you tried ～? は新しい場所や体験を勧める定番フレーズ。" },
    { phrase: "I keep walking past it", reading: "アイ キープ ウォーキング パスト イット", meaning: "いつも素通りしてしまう", note: "keep ＋ -ing は「〜し続けている」という継続を表す。" },
    { phrase: "haven't had the chance to go in", reading: "ハブント ハッド ザ チャンス トゥ ゴー イン", meaning: "中に入る機会がなかった", note: "have a chance to ～（〜する機会がある）の否定形。I haven't gotten around to it とも言える。" },
    { phrase: "the atmosphere is really cozy", reading: "ジ アトモスフィア イズ リアリー コウジー", meaning: "雰囲気がとても居心地よい", note: "cozy は「暖かく快適な・居心地のよい」。British English では cosy と綴られる。" },
    { phrase: "comfortable armchairs", reading: "カンフォータブル アームチェアーズ", meaning: "快適な肘掛け椅子", note: "café や読書スペースの描写でよく使われる。" },
    { phrase: "work remotely", reading: "ワーク リモートリー", meaning: "リモートワークをする", note: "work from home / work remotely はどちらも在宅・遠隔勤務を指す。" },
    { phrase: "Maybe we could go together", reading: "メイビー ウィー クッド ゴー トゥゲザー", meaning: "一緒に行けるかもしれませんね", note: "maybe と could で丁寧さとやわらかい提案のニュアンスを出す表現。" },
  ],

  117: [
    { phrase: "How would you like your hair cut?", reading: "ハウ ウッド ユー ライク ユア ヘア カット", meaning: "どのようにカットしますか", note: "美容師が最初に使う定番フレーズ。What style are you looking for? とも言える。" },
    { phrase: "a bit shorter on the sides", reading: "ア ビット ショーター オン ザ サイズ", meaning: "サイドを少し短く", note: "散髪の指示表現。shorter on top（トップを短く）/ longer in the back（後ろを長く）なども頻出。" },
    { phrase: "just a trim on top", reading: "ジャスト ア トリム オン トップ", meaning: "上はほんの少し整える程度", note: "trim は「わずかにカットする・整える」。just a trim で「少しだけ切る」という意味。" },
    { phrase: "take about three centimeters off", reading: "テイク アバウト スリー センティミーターズ オフ", meaning: "約3センチ切る", note: "take ～ off は「〜を取り除く・カットする」。How much would you like me to take off? と聞かれることも。" },
    { phrase: "keep the same style", reading: "キープ ザ セイム スタイル", meaning: "同じスタイルをキープする", note: "I'd like to keep the same style.（同じスタイルでお願いします）は散髪でよく使う表現。" },
    { phrase: "neaten up the back", reading: "ニートゥン アップ ザ バック", meaning: "後ろをきれいに整える", note: "neaten up は「きれいに整える」というフレーズ動詞。tidy up とほぼ同義。" },
    { phrase: "It's been getting quite long", reading: "イッツ ビーン ゲッティング クワイト ロング", meaning: "かなり長くなってきた", note: "現在完了進行形で「だんだん〜になってきた」という変化の継続を表す。" },
  ],

  118: [
    { phrase: "You have a dog, don't you?", reading: "ユー ハブ ア ドッグ ドント ユー", meaning: "犬を飼っていましたよね？", note: "付加疑問文（tag question）で確認や会話のきっかけを作る表現。" },
    { phrase: "a golden retriever", reading: "ア ゴールデン リトリーバー", meaning: "ゴールデンレトリーバー（犬の犬種）", note: "犬の犬種を紹介するときの表現。What breed is it?（何の犬種ですか）も覚えておきたい。" },
    { phrase: "just turned two years old", reading: "ジャスト ターンド トゥー イヤーズ オールド", meaning: "ちょうど2歳になった", note: "turn ＋ 年齢で「〜歳になる」を表す。She just turned thirty（ちょうど30歳になった）など。" },
    { phrase: "high-maintenance", reading: "ハイ メインテナンス", meaning: "手のかかる・世話が大変な", note: "ペットや人・物の手間を表す形容詞。high-maintenance dog / high-maintenance relationship など。" },
    { phrase: "need quite a bit of exercise and attention", reading: "ニード クワイト ア ビット オブ エクササイズ アンド アテンション", meaning: "かなりの運動と注意が必要", note: "quite a bit of は「かなりの量の」という表現。" },
    { phrase: "the love and joy they bring", reading: "ザ ラブ アンド ジョイ ゼイ ブリング", meaning: "彼らがもたらす愛情と喜び", note: "bring joy（喜びをもたらす）は感情を表す便利な動詞表現。" },
    { phrase: "completely worth it", reading: "コンプリートリー ワース イット", meaning: "完全にその価値がある", note: "It's worth it（それだけの価値がある）に completely を加えた強調表現。" },
  ],

  119: [
    { phrase: "forty-five minutes each way", reading: "フォーティーファイブ ミニッツ イーチ ウェイ", meaning: "片道45分", note: "each way は「片道」。It takes 45 minutes each way / one way どちらも使える。" },
    { phrase: "take the subway to", reading: "テイク ザ サブウェイ トゥ", meaning: "地下鉄で〜へ行く", note: "take the train / bus / subway は交通手段の基本表現。" },
    { phrase: "At first I found it exhausting", reading: "アット ファースト アイ ファウンド イット エグゾースティング", meaning: "最初はとても疲れると感じた", note: "At first は「最初は」という時間の対比表現。find it ＋ 形容詞は感想・評価を述べる構文。" },
    { phrase: "I've learned to enjoy it", reading: "アイブ ラーンド トゥ エンジョイ イット", meaning: "楽しめるようになった", note: "learn to ～ は「〜できるようになる・〜するのが身についた」という成長の表現。" },
    { phrase: "use the time to", reading: "ユーズ ザ タイム トゥ", meaning: "その時間を〜に使う", note: "use (one's) time to ～ で「〜のために時間を活用する」という効率的な使い方の表現。" },
    { phrase: "podcasts or audiobooks", reading: "ポッドキャスツ オア オーディオブックス", meaning: "ポッドキャストや音声ブック", note: "通勤中のインプット方法として現代英会話でよく出る語彙。" },
    { phrase: "look forward to", reading: "ルック フォワード トゥ", meaning: "〜を楽しみにしている", note: "look forward to ＋ 名詞または -ing 形。前向きな期待を表す重要表現。" },
  ],

  120: [
    { phrase: "moved into a new apartment", reading: "ムーブド イントゥ ア ニュー アパートメント", meaning: "新しいアパートに引っ越した", note: "move into ～（〜に引っ越す）と move out of ～（〜から引っ越す）をセットで覚えよう。" },
    { phrase: "much closer to work", reading: "マッチ クロウサー トゥ ワーク", meaning: "職場にずっと近い", note: "much ＋ 比較級で差を強調する。much better / much easier なども同様。" },
    { phrase: "getting rid of things", reading: "ゲッティング リッド オブ シングズ", meaning: "物を処分すること", note: "get rid of ～ は「〜を取り除く・処分する」という重要フレーズ動詞。" },
    { phrase: "holding onto for years", reading: "ホールディング オントゥ フォー イヤーズ", meaning: "何年も持ち続けていた", note: "hold onto ～ は「〜を手放さずにいる・しがみつく」というフレーズ動詞。" },
    { phrase: "simplifying my belongings", reading: "シンプリファイング マイ ビロングングズ", meaning: "持ち物をシンプルにすること", note: "belongings は「所持品・持ち物」という意味の名詞（複数形）。possessions とも言える。" },
    { phrase: "feel lighter and more organized", reading: "フィール ライター アンド モア オーガナイズド", meaning: "より軽やかで整理された気分になる", note: "物を処分した後の気持ちを表す表現。feel free / feel refreshed なども同様に使える。" },
    { phrase: "a good clear-out", reading: "ア グッド クリアー アウト", meaning: "すっきりした片付け", note: "clear-out は「大掃除・断捨離」を指すイギリス英語の表現。declutter とほぼ同義。" },
    { phrase: "every now and then", reading: "エブリー ナウ アンド ゼン", meaning: "時々・たまに", note: "occasionally / from time to time と同義の口語表現。" },
  ],

  // ── 旅行・移動 追加 ───────────────────────────────────────────────────────

  211: [
    { phrase: "I'd like to check out", reading: "アイド ライク トゥ チェック アウト", meaning: "チェックアウトしたいのですが", note: "ホテルを出るときの基本表現。check in（チェックイン）と対になる表現。" },
    { phrase: "How was your stay?", reading: "ハウ ワズ ユア ステイ", meaning: "滞在はいかがでしたか", note: "ホテルスタッフがよく使う定番の挨拶フレーズ。Did you enjoy your stay? とも言う。" },
    { phrase: "a printed receipt for my records", reading: "ア プリンテッド リシート フォー マイ レコーズ", meaning: "記録用の印刷領収書", note: "for my records は「記録・書類として」という目的を表す表現。" },
    { phrase: "charges from the minibar", reading: "チャージィズ フロム ザ ミニバー", meaning: "ミニバーの利用料金", note: "hotel charges（ホテルの請求額）は宿泊会計の話でよく出る表現。" },
    { phrase: "should already be on my card", reading: "シュッド オールレディ ビー オン マイ カード", meaning: "すでにカードで処理されているはず", note: "on my card で「カードに記録・請求されている」ことを表す口語表現。" },
    { phrase: "room service", reading: "ルーム サービス", meaning: "ルームサービス", note: "ホテルで部屋に食事や飲み物を届けるサービス。order room service（ルームサービスを頼む）。" },
    { phrase: "Otherwise", reading: "アザーワイズ", meaning: "それ以外は・そうでなければ", note: "otherwise は「それ以外の点では」という副詞として文頭に使いやすい。" },
  ],

  212: [
    { phrase: "Could I have a look at the menu?", reading: "クッド アイ ハブ ア ルック アット ザ メニュー", meaning: "メニューを見せていただけますか", note: "May I see the menu? / Can I get the menu? より少し丁寧な表現。" },
    { phrase: "Are you ready to order?", reading: "アー ユー レディ トゥ オーダー", meaning: "ご注文はお決まりですか", note: "レストランウエイターの定番フレーズ。What can I get for you? とも言う。" },
    { phrase: "I'll have the grilled fish", reading: "アイル ハブ ザ グリルド フィッシュ", meaning: "グリルした魚をいただきます", note: "I'll have ～ はレストランでの注文の最も自然な表現。I'd like ～ よりカジュアル。" },
    { phrase: "with a side salad", reading: "ウィズ ア サイド サラッド", meaning: "サイドサラダ付きで", note: "with a side of ～ で「〜を添えて」という注文の補足表現。" },
    { phrase: "a glass of sparkling water", reading: "ア グラス オブ スパークリング ウォーター", meaning: "スパークリングウォーター1杯", note: "sparkling water（炭酸水）と still water（非炭酸水）の区別は海外レストランでよく問われる。" },
    { phrase: "Excellent choice", reading: "エクセレント チョイス", meaning: "素晴らしいお選びですね", note: "店員・ウエイターがよく使うサービス表現。Good choice / Great choice とも言う。" },
    { phrase: "start with any appetizer", reading: "スタート ウィズ エニー アペタイザー", meaning: "前菜から始める", note: "appetizer（前菜・オードブル）は starter（イギリス英語）とも呼ばれる。" },
  ],

  213: [
    { phrase: "How much is this?", reading: "ハウ マッチ イズ ジス", meaning: "これはいくらですか", note: "値段を尋ねる最も基本的な表現。What's the price? / How much does it cost? とも言える。" },
    { phrase: "hand-woven", reading: "ハンド ウォウブン", meaning: "手織りの", note: "hand- ＋ 過去分詞で「手作りの・手による」を表すハイフン複合語。handmade とほぼ同義。" },
    { phrase: "traditional local techniques", reading: "トラディショナル ローカル テクニークス", meaning: "伝統的な地元の技法", note: "工芸品や土産物を説明するときによく使われる表現。" },
    { phrase: "Do you offer a discount if I buy two?", reading: "ドゥ ユー オファー ア ディスカウント イフ アイ バイ トゥー", meaning: "2つ買えば割引がありますか", note: "値引き交渉でよく使うフレーズ。Is there a bulk discount? とも言える。" },
    { phrase: "bring the total to", reading: "ブリング ザ トータル トゥ", meaning: "合計を〜にする", note: "bring the total to ～ で「合計金額が〜になる」という計算の表現。" },
    { phrase: "ten percent discount", reading: "テン パーセント ディスカウント", meaning: "10%割引", note: "a 10% off discount / 10 percent off とも言える。" },
    { phrase: "That would bring the total to", reading: "ザット ウッド ブリング ザ トータル トゥ", meaning: "それで合計は〜になります", note: "条件付きの価格計算を提示するときの表現。would で「そうすれば〜になる」という条件を示す。" },
  ],

  214: [
    { phrase: "Does this bus go to", reading: "ダズ ジス バス ゴー トゥ", meaning: "このバスは〜に行きますか", note: "バス・電車の行き先を確認する定番表現。Does this train stop at ～? も同様。" },
    { phrase: "right in front of the main square", reading: "ライト イン フロント オブ ザ メイン スクエア", meaning: "メイン広場のすぐ前に", note: "right は「ちょうど・まさに」という位置の強調副詞。right next to / right behind なども使いやすい。" },
    { phrase: "a fifteen-minute ride", reading: "ア フィフティーン ミニット ライド", meaning: "15分の乗車", note: "a ＋ 時間 ＋ ride / walk / drive で「〜分の移動」を表す。" },
    { phrase: "How much is the fare?", reading: "ハウ マッチ イズ ザ フェア", meaning: "運賃はいくらですか", note: "fare は交通機関の「運賃」。price / cost とは使い分ける。" },
    { phrase: "per journey", reading: "パー ジャーニー", meaning: "1乗車あたり", note: "per は「〜につき」を意味する前置詞。per trip / per ride も同義。" },
    { phrase: "pay with coins or tap your card", reading: "ペイ ウィズ コインズ オア タップ ユア カード", meaning: "コインで払うかカードをタッチする", note: "tap your card は交通系ICカードのような「カードをタッチする」という現代的な支払い表現。" },
    { phrase: "when you board", reading: "ホエン ユー ボード", meaning: "乗車するときに", note: "board は「（乗り物に）乗り込む」という動詞。boarding（乗車）もよく使われる。" },
  ],

  215: [
    { phrase: "Could you state the purpose of your visit?", reading: "クッド ユー ステイト ザ パーパス オブ ユア ビジット", meaning: "訪問の目的を教えてください", note: "入国審査の定番の質問。state は「明確に述べる」という動詞。" },
    { phrase: "I'm here for tourism", reading: "アイム ヒア フォー ツーリズム", meaning: "観光目的で来ました", note: "I'm here for business / for a conference など目的を簡潔に答える表現。" },
    { phrase: "proof of accommodation", reading: "プルーフ オブ アコモデーション", meaning: "宿泊先の証明", note: "proof of ～ で「〜の証明書・証拠」を表す。proof of identity / proof of income なども頻出。" },
    { phrase: "e-ticket", reading: "イーティケット", meaning: "電子チケット・Eチケット", note: "electronic ticket の略。航空券・コンサートなどの電子証明書を指す。" },
    { phrase: "hotel booking confirmation", reading: "ホテル ブッキング コンファメーション", meaning: "ホテルの予約確認書", note: "confirmation（確認書）は入国審査や旅行でよく必要となる書類の名前。" },
    { phrase: "Everything looks fine", reading: "エブリシング ルックス ファイン", meaning: "問題ありません", note: "入国審査官や係員が使う承認の表現。Everything seems in order とも言える。" },
    { phrase: "Enjoy your stay", reading: "エンジョイ ユア ステイ", meaning: "良い滞在をお楽しみください", note: "入国時や到着時の定番の別れの挨拶。Have a great trip / Enjoy your visit とも言える。" },
  ],

  216: [
    { phrase: "a little daunting", reading: "ア リトゥル ドーンティング", meaning: "少し怖気づく・気がかりな", note: "daunting は「恐ろしい・気おくれする」という形容詞。intimidating と同義。" },
    { phrase: "completely free to follow your own schedule", reading: "コンプリートリー フリー トゥ フォロウ ユア オウン スケジュール", meaning: "自分のスケジュールに完全に自由に従える", note: "be free to ～ は「自由に〜できる」という表現。" },
    { phrase: "at a moment's notice", reading: "アット ア モーメンツ ノーティス", meaning: "即座に・ほとんど通知なしに", note: "at a moment's notice は「突然・即座に」というイディオム。" },
    { phrase: "you'd never have met otherwise", reading: "ユード ネバー ハブ メット アザーワイズ", meaning: "そうでなければ絶対に会わなかっただろう", note: "otherwise（そうでなければ）は仮定法過去完了と組み合わせて使う表現。" },
    { phrase: "be more open to new experiences", reading: "ビー モア オープン トゥ ニュー エクスペリエンシィズ", meaning: "新しい体験により開かれている", note: "be open to ～ は「〜に対して受け入れる姿勢がある」という表現。" },
    { phrase: "stay aware of your surroundings", reading: "ステイ アウェア オブ ユア サラウンディングズ", meaning: "周囲に気を払い続ける", note: "be aware of ～（〜に気づいている）に stay を加えて「常に気をつける」を表す。" },
    { phrase: "embrace the unexpected moments", reading: "エンブレイス ジ アンエクスペクテッド モーメンツ", meaning: "予想外の瞬間を受け入れる", note: "embrace は「受け入れる・喜んで迎える」という積極的な動詞。" },
  ],

  217: [
    { phrase: "delayed by three hours", reading: "ディレイド バイ スリー アワーズ", meaning: "3時間遅延している", note: "delayed by ＋ 時間で「〜の時間だけ遅れている」を表す。The flight has been delayed. も頻出。" },
    { phrase: "Is there anything you can do for us?", reading: "イズ ゼアー エニシング ユー キャン ドゥ フォー アス", meaning: "何か対応していただけますか", note: "問題解決や補償をお願いするときの丁寧な表現。" },
    { phrase: "meal vouchers", reading: "ミール バウチャーズ", meaning: "食事券・ミールバウチャー", note: "遅延時に航空会社が提供する補償の一つ。voucher は「クーポン・引換券」を意味する。" },
    { phrase: "connecting flight", reading: "コネクティング フライト", meaning: "乗り継ぎ便", note: "connection / connecting flight は旅行でよく出る重要語。miss a connection（乗り継ぎを逃す）も頻出。" },
    { phrase: "We'll almost certainly miss it", reading: "ウィール オールモスト サートゥンリー ミス イット", meaning: "ほぼ確実に乗り遅れます", note: "almost certainly（ほぼ確実に）は強い確信を表す副詞表現。" },
    { phrase: "service desk", reading: "サービス デスク", meaning: "サービスカウンター・案内デスク", note: "customer service counter / help desk とほぼ同義。" },
    { phrase: "rebook you at no extra charge", reading: "リブック ユー アット ノー エクストラ チャージ", meaning: "追加料金なしで再予約します", note: "at no extra charge は「追加費用なしで」。free of charge とほぼ同義。" },
  ],

  218: [
    { phrase: "I'd like to get to Edinburgh from London", reading: "アイド ライク トゥ ゲット トゥ エジンバラ フロム ロンドン", meaning: "ロンドンからエジンバラに行きたいのですが", note: "get to ～ は「〜に到着する・行く」という口語的な移動表現。" },
    { phrase: "What's my best option?", reading: "ホワッツ マイ ベスト オプション", meaning: "最善の方法は何ですか", note: "複数の選択肢の中から最善を聞く便利なフレーズ。What would you recommend? とも言える。" },
    { phrase: "the fastest route", reading: "ザ ファーステスト ルート", meaning: "最速ルート", note: "the quickest route / the most direct route とも言える。route の発音は「ルート」または「ラウト」（米）。" },
    { phrase: "depending on when you leave", reading: "ディペンディング オン ホエン ユー リーブ", meaning: "出発時間によって", note: "depending on ～ は「〜次第で」という便利な表現。" },
    { phrase: "roughly every hour", reading: "ラフリー エブリー アワー", meaning: "おおよそ1時間ごとに", note: "roughly（おおよそ）は時刻や数量の概算を示す副詞。approximately と同義。" },
    { phrase: "I'd recommend booking in advance", reading: "アイド レコメンド ブッキング イン アドバンス", meaning: "事前に予約することをおすすめします", note: "recommend ＋ -ing で「〜することを勧める」。in advance（前もって）は重要表現。" },
    { phrase: "a cheaper fare", reading: "ア チーパー フェア", meaning: "より安い運賃", note: "fare（運賃）は交通機関特有の語。cheaper ticket / discounted ticket とも言える。" },
  ],

  219: [
    { phrase: "uniquely liberating", reading: "ユニークリー リバレイティング", meaning: "独特に解放感がある", note: "liberating は「解放する・自由な気分にさせる」という形容詞。" },
    { phrase: "stopping wherever looked interesting", reading: "ストッピング ホエアーエバー ルックト インタレスティング", meaning: "面白そうなところで立ち止まりながら", note: "wherever は「どこでも〜なところに」という関係副詞。" },
    { phrase: "hidden beaches", reading: "ヒドゥン ビーチィズ", meaning: "隠れたビーチ・穴場のビーチ", note: "hidden gem（隠れた逸品・穴場）はよく使われる表現。hidden beaches は旅の魅力を表す。" },
    { phrase: "you'd never find on a travel website", reading: "ユード ネバー ファインド オン ア トラベル ウェブサイト", meaning: "旅行サイトでは絶対に見つからない", note: "口コミや偶然の発見の価値を表す表現。" },
    { phrase: "The key to a great road trip is", reading: "ザ キー トゥ ア グレイト ロード トリップ イズ", meaning: "素晴らしいロードトリップの鍵は", note: "the key to ＋ 名詞 is ～ は「〜の秘訣は〜だ」という構文。" },
    { phrase: "a rough route in mind", reading: "ア ラフ ルート イン マインド", meaning: "おおまかなルートを頭の中に持って", note: "have ～ in mind（〜を念頭に置く）は計画の話でよく使われる表現。rough は「おおまかな」。" },
    { phrase: "detours and spontaneous discoveries", reading: "ディトゥアーズ アンド スポンテイニアス ディスカバリーズ", meaning: "寄り道と自然発生的な発見", note: "detour（寄り道・迂回路）と spontaneous（自発的な）は旅行の文脈でよく使われる語。" },
  ],

  220: [
    { phrase: "thinking carefully about the environmental impact", reading: "シンキング ケアフリー アバウト ジ エンバイロンメンタル インパクト", meaning: "環境への影響について慎重に考える", note: "environmental impact（環境への影響）は環境問題の基本表現。" },
    { phrase: "for shorter distances", reading: "フォー ショーター ディスタンシィズ", meaning: "短い距離の移動では", note: "距離や移動の選択に関する条件表現。for short-haul trips とも言える。" },
    { phrase: "locally-owned guesthouses", reading: "ローカリー オウンド ゲストハウジズ", meaning: "地元経営のゲストハウス", note: "locally-owned（地元が所有する）は地域経済を支援するエコツーリズムの文脈でよく使われる。" },
    { phrase: "single-use plastics", reading: "シングル ユース プラスティックス", meaning: "使い捨てプラスチック", note: "環境問題の定番表現。avoid / ban / reduce single-use plastics とよく組み合わせられる。" },
    { phrase: "offsetting my carbon footprint", reading: "オフセッティング マイ カーボン フットプリント", meaning: "カーボンフットプリントを相殺する", note: "carbon footprint（炭素排出量）は環境の話の必須語。carbon offset（カーボンオフセット）も関連語。" },
    { phrase: "Responsible travel", reading: "リスポンシブル トラベル", meaning: "責任ある旅行", note: "sustainable tourism / eco-tourism と関連する概念。環境・地域社会を意識した旅の姿勢を指す。" },
    { phrase: "being more thoughtful about how you have them", reading: "ビーイング モア ソートフル アバウト ハウ ユー ハブ ゼム", meaning: "どのように体験するかをより思慮深く考える", note: "thoughtful（思慮深い）は mindful（意識的な）と組み合わせて使われることも多い。" },
  ],

  // ── 仕事・ビジネス 追加 ───────────────────────────────────────────────────

  311: [
    { phrase: "Do you have a moment?", reading: "ドゥ ユー ハブ ア モーメント", meaning: "少し時間はありますか", note: "上司や同僚に声をかけるときの丁寧な表現。Do you have a minute? とほぼ同義。" },
    { phrase: "share some feedback on", reading: "シェア サム フィードバック オン", meaning: "〜についてフィードバックを伝える", note: "give / provide feedback とも言う。share はよりオープンなニュアンスがある。" },
    { phrase: "I'm always looking for ways to improve", reading: "アイム オールウェイズ ルッキング フォー ウェイズ トゥ インプルーブ", meaning: "常に改善策を探しています", note: "成長意欲を示す表現。be open to feedback（フィードバックを受け入れる姿勢がある）とも関連する。" },
    { phrase: "the content is strong", reading: "ザ コンテント イズ ストロング", meaning: "内容はしっかりしている", note: "strong（力強い・しっかりした）は仕事の評価でよく使われる形容詞。" },
    { phrase: "the executive summary", reading: "ジ エグゼキュティブ サマリー", meaning: "要約・エグゼクティブサマリー", note: "ビジネス文書の冒頭にある要約部分。abstract とも呼ばれる。" },
    { phrase: "a bit more concise", reading: "ア ビット モア コンサイス", meaning: "もう少し簡潔に", note: "concise は「簡潔な・要を得た」という形容詞。brief / to the point とも言える。" },
    { phrase: "I tend to over-explain things", reading: "アイ テンド トゥ オーバー エクスプレイン シングズ", meaning: "説明しすぎる傾向がある", note: "tend to ～ は「〜する傾向がある」という重要表現。I have a tendency to ～ と言い換えられる。" },
    { phrase: "I'll revise it before the end of the day", reading: "アイル リバイズ イット ビフォー ザ エンド オブ ザ デイ", meaning: "今日中に修正します", note: "before the end of the day は「今日中に」という締め切りの表現。" },
  ],

  312: [
    { phrase: "there's an echo on the line", reading: "ゼアーズ アン エコー オン ザ ライン", meaning: "回線にエコーがかかっている", note: "on the line は「回線上で・通話中に」。電話・オンライン会議の音声問題でよく使われる。" },
    { phrase: "the audio is cutting in and out", reading: "ジ オーディオ イズ カッティング イン アンド アウト", meaning: "音声が途切れ途切れになっている", note: "cut in and out は「断続的に切れる」というフレーズ。breaking up とも言う。" },
    { phrase: "Let me disconnect and rejoin", reading: "レット ミー ディスコネクト アンド リジョイン", meaning: "一度切断して再接続します", note: "オンライン会議でのトラブル対応に使う表現。I'll drop and rejoin とも言う。" },
    { phrase: "One moment, please", reading: "ワン モーメント プリーズ", meaning: "少々お待ちください", note: "Just a moment. / Bear with me. も同じ場面で使われる丁寧な待ち表現。" },
    { phrase: "While we wait", reading: "ホワイル ウィー ウェイト", meaning: "待っている間に", note: "待ち時間を活用するときの自然な接続表現。" },
    { phrase: "feel free to review", reading: "フィール フリー トゥ リビュー", meaning: "自由に確認してください", note: "feel free to ～ は「遠慮なく〜してください」という丁寧な許可の表現。" },
    { phrase: "handout", reading: "ハンドアウト", meaning: "配布資料・プリント", note: "会議や授業で配られる資料。handouts / meeting materials とも言う。" },
  ],

  313: [
    { phrase: "prioritize effectively", reading: "プライオリタイズ エフェクティブリー", meaning: "効果的に優先順位をつける", note: "prioritize は「優先順位をつける」という動詞。effective prioritization とも言える。" },
    { phrase: "the three most important tasks", reading: "ザ スリー モスト インポータント タスクス", meaning: "最も重要な3つのタスク", note: "タスク管理の「Big 3」という考え方を表す表現。" },
    { phrase: "before anything else", reading: "ビフォー エニシング エルス", meaning: "何よりも先に", note: "最優先事項を表す表現。first things first（まず大事なことから）とも言える。" },
    { phrase: "your inbox is full", reading: "ユア インボックス イズ フル", meaning: "受信箱がいっぱいになっている", note: "email inbox が膨大なメールで埋まっている状態。inbox overload と言われることもある。" },
    { phrase: "keeps you grounded", reading: "キープス ユー グラウンデッド", meaning: "足をしっかり地につかせる・落ち着かせる", note: "grounded は「現実的な・冷静な」という形容詞。stay grounded（落ち着きを保つ）も頻出。" },
    { phrase: "protect at least ninety minutes", reading: "プロテクト アット リースト ナインティ ミニッツ", meaning: "少なくとも90分を確保する", note: "protect time（時間を守る・確保する）はタスク管理でよく使われる表現。" },
    { phrase: "deep, focused work", reading: "ディープ フォーカスト ワーク", meaning: "深く集中した作業", note: "Cal Newport の「Deep Work」から広まった概念。集中して質の高い作業をすること。" },
  ],

  314: [
    { phrase: "I wanted to flag that", reading: "アイ ウォンテッド トゥ フラッグ ザット", meaning: "〜を知らせておきたかった・報告したかった", note: "flag は「注意を引く・知らせる」という動詞。flag an issue（問題を報告する）は仕事でよく使う。" },
    { phrase: "hit the original deadline", reading: "ヒット ザ オリジナル デッドライン", meaning: "当初の締め切りを守る", note: "hit a deadline / meet a deadline はどちらも「締め切りを守る」。" },
    { phrase: "I thought we were on track", reading: "アイ ソート ウィー ワー オン トラック", meaning: "順調に進んでいると思っていた", note: "on track は「順調に・予定通りに進んでいる」という表現。off track（軌道を外れた）の反対。" },
    { phrase: "waiting on some data from the client", reading: "ウェイティング オン サム データ フロム ザ クライアント", meaning: "クライアントからのデータを待っている", note: "waiting on ～ は「〜を待っている」というビジネス口語。waiting for とほぼ同義。" },
    { phrase: "running late", reading: "ランニング レイト", meaning: "遅れている", note: "The data is running late.（データが遅れている）のように物・人の遅延に広く使える。" },
    { phrase: "request a one-week extension", reading: "リクエスト ア ワン ウィーク エクステンション", meaning: "1週間の延長を依頼する", note: "ask for an extension（延長をお願いする）は締め切りの交渉でよく使われる表現。" },
    { phrase: "keep the client informed", reading: "キープ ザ クライアント インフォームド", meaning: "クライアントに情報を共有し続ける", note: "keep someone informed（情報を更新し続ける）はビジネスでの連絡・報告の基本表現。" },
  ],

  315: [
    { phrase: "Welcome to the team!", reading: "ウェルカム トゥ ザ チーム", meaning: "チームへようこそ！", note: "新メンバーを歓迎するときの定番フレーズ。" },
    { phrase: "How was your first morning?", reading: "ハウ ワズ ユア ファースト モーニング", meaning: "最初の午前中はどうでしたか", note: "新入りの人の感想を聞くときの自然な会話表現。How's it going so far? とも言える。" },
    { phrase: "There's a lot to take in", reading: "ゼアーズ ア ロット トゥ テイク イン", meaning: "覚えることがたくさんある", note: "take in は「吸収する・理解する」というフレーズ動詞。There's a lot to learn とも言える。" },
    { phrase: "Don't hesitate to ask questions", reading: "ドント ヘジテイト トゥ アスク クエスチョンズ", meaning: "遠慮なく質問してください", note: "Please feel free to ask とほぼ同義。新メンバーへの励ましでよく使われる。" },
    { phrase: "no question is too basic", reading: "ノー クエスチョン イズ トゥー ベーシック", meaning: "基本的すぎる質問なんてない", note: "初心者や新人を安心させるためによく使うフレーズ。" },
    { phrase: "walk me through", reading: "ウォーク ミー スルー", meaning: "順を追って説明してくれる", note: "walk someone through ～ は「〜を順序立てて説明する」というフレーズ動詞。" },
    { phrase: "I haven't worked with it before", reading: "アイ ハブント ワークト ウィズ イット ビフォー", meaning: "以前は使ったことがない", note: "初めてのツールや経験について述べるときの自然な表現。" },
  ],

  316: [
    { phrase: "overwhelmed by email", reading: "オーバーウェルムド バイ イーメール", meaning: "メールに圧倒される", note: "be overwhelmed by ～ は「〜に圧倒される・手に負えない」という表現。" },
    { phrase: "nearly a third of their working day", reading: "ニアリー ア サード オブ ゼア ワーキング デイ", meaning: "勤務時間のほぼ3分の1", note: "a third of ～（〜の3分の1）は分数の表現。a quarter of ～（4分の1）なども頻出。" },
    { phrase: "checking email only at set times", reading: "チェッキング イーメール オンリー アット セット タイムズ", meaning: "決まった時間だけメールを確認する", note: "set times（決まった時間・設定した時間）は習慣やルールを表すときによく使われる。" },
    { phrase: "rather than responding every time a notification appears", reading: "ラーザー ザン リスポンディング エブリー タイム", meaning: "通知が来るたびに返信するのではなく", note: "rather than ＋ -ing で「〜する代わりに・〜ではなく」という選択を表す構文。" },
    { phrase: "folders and labels", reading: "フォールダーズ アンド レイブルズ", meaning: "フォルダーとラベル", note: "メール管理の整理ツール。organize by labels / sort into folders とも言える。" },
    { phrase: "the two-minute rule", reading: "ザ トゥー ミニット ルール", meaning: "2分ルール", note: "GTD（Getting Things Done）という生産性手法の有名な概念。2分以内にできることはすぐやる。" },
    { phrase: "deal with it immediately", reading: "ディール ウィズ イット イミーディアトリー", meaning: "すぐに対処する", note: "deal with ～ は「〜に対処する・取り組む」というフレーズ動詞。handle it right away とも言える。" },
  ],

  317: [
    { phrase: "We've reviewed your proposal", reading: "ウィーブ リビュード ユア プロポーザル", meaning: "あなたの提案を検討しました", note: "review a proposal（提案を審査する）は契約・ビジネス交渉でよく使われる表現。" },
    { phrase: "the timeline feels a little tight", reading: "ザ タイムライン フィールズ ア リトゥル タイト", meaning: "スケジュールが少しタイトに感じる", note: "tight（きつい・余裕がない）は締め切りやスケジュールの話でよく使われる形容詞。" },
    { phrase: "What would be a more comfortable timeframe?", reading: "ホワット ウッド ビー ア モア カンフォータブル タイムフレーム", meaning: "より無理のないスケジュールはどれくらいですか", note: "comfortable timeframe（無理のないスケジュール・余裕のある期間）は交渉表現。" },
    { phrase: "from the contract signing date", reading: "フロム ザ コントラクト サイニング デイト", meaning: "契約締結日から", note: "contract signing（契約締結）は法的・ビジネス的な重要表現。" },
    { phrase: "That's workable from our side", reading: "ザッツ ワーカブル フロム アワー サイド", meaning: "こちらとしては対応可能です", note: "workable は「実行可能な・対応できる」という形容詞。That works for us とも言える。" },
    { phrase: "ready to move forward", reading: "レディ トゥ ムーブ フォワード", meaning: "前進する準備ができている", note: "move forward（前進する・進める）はビジネスの交渉や計画で頻出のフレーズ。" },
    { phrase: "If we can agree on that", reading: "イフ ウィー キャン アグリー オン ザット", meaning: "その点で合意できれば", note: "agree on ～（〜について合意する）は交渉の場面でよく使われる表現。" },
  ],

  318: [
    { phrase: "You did a great job", reading: "ユー ディッド ア グレイト ジョブ", meaning: "よくできました・素晴らしかった", note: "仕事・発表・パフォーマンスを褒めるときの定番表現。Well done! とほぼ同義。" },
    { phrase: "The audience was really engaged", reading: "ジ オーディエンス ワズ リアリー エンゲイジド", meaning: "聴衆がとても引き込まれていた", note: "engaged（引き込まれた・関与している）はプレゼンの評価でよく使われる形容詞。" },
    { phrase: "once I got into it", reading: "ワンス アイ ガット イントゥ イット", meaning: "話し始めると・内容に入ってしまうと", note: "get into it は「（活動に）入り込む・慣れてくる」というフレーズ動詞。" },
    { phrase: "handled the questions very well", reading: "ハンドルド ザ クエスチョンズ ベリー ウェル", meaning: "質問をうまく対処した", note: "handle questions（質問に対処する）はプレゼン後のQ&Aの評価表現。" },
    { phrase: "caught me off guard", reading: "コート ミー オフ ガード", meaning: "不意をついた・不意打ちだった", note: "catch someone off guard は「油断させる・不意をつく」というイディオム。" },
    { phrase: "stay calm", reading: "ステイ カーム", meaning: "落ち着きを保つ", note: "remain calm / keep calm とほぼ同義。プレッシャー下での対応でよく使われる表現。" },
    { phrase: "be honest if I don't have all the answers", reading: "ビー オネスト イフ アイ ドント ハブ オール ザ アンサーズ", meaning: "すべての答えを持っていないときは正直に言う", note: "I don't have all the answers right now but I'll find out.（今はわかりませんが調べます）のような対応表現。" },
  ],

  319: [
    { phrase: "Investing in your own professional development", reading: "インベスティング イン ユア オウン プロフェッショナル ディベロップメント", meaning: "自分自身のキャリア開発に投資すること", note: "professional development（専門能力開発）は仕事の成長の話でよく出る表現。" },
    { phrase: "attending industry conferences", reading: "アテンディング インダストリー コンファレンシィズ", meaning: "業界カンファレンスに参加する", note: "attend a conference / industry event は業界でのネットワーク形成の重要活動。" },
    { phrase: "finding a mentor", reading: "ファインディング ア メンター", meaning: "メンターを見つける", note: "mentor（指導者・助言者）を持つことの重要性はキャリア開発でよく語られる。" },
    { phrase: "expands your network", reading: "エクスパンドズ ユア ネットワーク", meaning: "人脈を広げる", note: "expand / build / grow your network は人脈形成の表現。networking opportunities とも関連する。" },
    { phrase: "set aside at least one hour a week", reading: "セット アサイド アット リースト ワン アワー ア ウィーク", meaning: "週に最低1時間を確保する", note: "set aside time for ～（〜のための時間を確保する）は時間管理の重要表現。" },
    { phrase: "small, consistent efforts", reading: "スモール コンシステント エフォーツ", meaning: "小さく一貫した努力", note: "consistent は「一貫した・継続的な」。consistency（継続性）はスキル習得の鍵とされる。" },
    { phrase: "add up to significant growth", reading: "アッド アップ トゥ シグニフィカント グロウス", meaning: "積み重なって大きな成長になる", note: "add up to ～ は「積み重なって〜になる」というフレーズ動詞。" },
  ],

  320: [
    { phrase: "I wanted to speak with you privately", reading: "アイ ウォンテッド トゥ スピーク ウィズ ユー プライベートリー", meaning: "個人的にお話ししたかったのですが", note: "privately（プライベートに・二人だけで）は機密性の高い話を切り出す際の表現。" },
    { phrase: "I've decided to resign from my position", reading: "アイブ ディサイデッド トゥ リザイン フロム マイ ポジション", meaning: "退職することを決めました", note: "resign from a position は「役職・職を辞する」というフォーマルな表現。quit とも言えるがより丁寧。" },
    { phrase: "effective next month", reading: "エフェクティブ ネクスト マンス", meaning: "来月付けで", note: "effective + 日付は「〜の日付をもって有効・施行」という公式表現。effective immediately（即日有効）も頻出。" },
    { phrase: "This is unexpected", reading: "ジス イズ アンエクスペクテッド", meaning: "これは予期していませんでした", note: "驚きを示す表現。I wasn't expecting this. とほぼ同義。" },
    { phrase: "May I ask what's driving the decision?", reading: "メイ アイ アスク ホワッツ ドライビング ザ ディシジョン", meaning: "決断の理由を聞いてもよいですか", note: "what's driving ～（〜の原動力は何か）は丁寧に理由を聞く表現。" },
    { phrase: "aligns more closely with", reading: "アラインズ モア クロウズリー ウィズ", meaning: "〜とより密接に合致している", note: "align with ～（〜と方向性が合う）はキャリアやビジョンの話でよく使われる表現。" },
    { phrase: "I wish you all the best", reading: "アイ ウィッシュ ユー オール ザ ベスト", meaning: "ご活躍をお祈りします", note: "別れや退職の際に使う温かい締めくくりの表現。Best of luck in the future とも言える。" },
  ],

  // ── 健康・生活 追加 ───────────────────────────────────────────────────────

  411: [
    { phrase: "I've just started doing yoga", reading: "アイブ ジャスト スターテッド ドゥーイング ヨーガ", meaning: "ヨガを始めたばかりです", note: "have just started ＋ -ing で「〜し始めたばかり」という直近の開始を表す現在完了表現。" },
    { phrase: "Have you ever tried it?", reading: "ハブ ユー エバー トライド イット", meaning: "やったことはありますか", note: "Have you ever ＋ 過去分詞? は経験を尋ねる現在完了の定番質問。" },
    { phrase: "I've been practicing for about two years", reading: "アイブ ビーン プラクティシング フォー アバウト トゥー イヤーズ", meaning: "約2年間練習しています", note: "現在完了進行形で「〜し続けている」という継続を表す。" },
    { phrase: "flexibility and stress relief", reading: "フレクシビリティ アンド ストレス リリーフ", meaning: "柔軟性とストレス解消", note: "ヨガやストレッチの効果を説明するときの定番ペア表現。" },
    { phrase: "Do you recommend any particular style?", reading: "ドゥ ユー レコメンド エニー パーティキュラー スタイル", meaning: "特定のスタイルはおすすめですか", note: "Would you recommend ～? と同義。particular（特定の・特別な）は質問を絞るときに便利な形容詞。" },
    { phrase: "for beginners", reading: "フォー ビギナーズ", meaning: "初心者向け", note: "beginner-friendly / for beginners はどちらも「初心者向け」を示す表現。" },
    { phrase: "slower-paced", reading: "スロウアー ペイスト", meaning: "よりゆっくりしたペースの", note: "ハイフン複合形容詞。fast-paced（テンポの速い）の反対。" },
    { phrase: "fundamentals of breathing and alignment", reading: "ファンダメンタルズ オブ ブリーシング アンド アラインメント", meaning: "呼吸とアライメントの基本", note: "fundamentals（基礎・基本）はスポーツや武道の話でよく使われる語。" },
  ],

  412: [
    { phrase: "increasingly aware of", reading: "インクリーシングリー アウェア オブ", meaning: "ますます〜を意識するようになった", note: "increasingly（ますます）は変化を表す副詞。gradually / more and more と近い意味。" },
    { phrase: "adding up to well over ten hours a day", reading: "アディング アップ トゥ ウェル オーバー テン アワーズ ア デイ", meaning: "1日に優に10時間を超えるほどになっていた", note: "add up to ～（積み重なって〜になる）と well over ～（〜を大きく超えて）の組み合わせ。" },
    { phrase: "set some clear boundaries", reading: "セット サム クリア バウンダリーズ", meaning: "明確な境界線を設ける", note: "set boundaries（境界を設ける）はデジタルウェルネスやメンタルヘルスの話でよく出る表現。" },
    { phrase: "no phone for the first hour", reading: "ノー フォン フォー ザ ファースト アワー", meaning: "最初の1時間はスマホを使わない", note: "digital detox（デジタルデトックス）の具体的な実践例を表す表現。" },
    { phrase: "difficult at first", reading: "ディフィカルト アット ファースト", meaning: "最初は難しかった", note: "at first は「最初は」という時間の対比。but then / over time と組み合わせて変化を表す。" },
    { phrase: "feel more present in conversations", reading: "フィール モア プレゼント イン コンバセーションズ", meaning: "会話においてより存在感を持てる・話に集中できる", note: "be present（今この瞬間に集中する）はマインドフルネスの概念。" },
    { phrase: "hobbies I'd abandoned", reading: "ホビーズ アイド アバンダンド", meaning: "やめてしまっていた趣味", note: "abandon（放棄する・やめる）はやや強い表現。give up / neglect とも言える。" },
  ],

  413: [
    { phrase: "I always start the week with good intentions", reading: "アイ オールウェイズ スタート ザ ウィーク ウィズ グッド インテンションズ", meaning: "毎週良い意図を持って始める", note: "with good intentions（良い意図を持って）は理想と現実のギャップを表すときによく使われる。" },
    { phrase: "slipped back into old habits", reading: "スリップト バック イントゥ オールド ハビッツ", meaning: "元の習慣に逆戻りしてしまった", note: "slip back into ～ は「〜に逆戻りする」というフレーズ。relapse into old habits とも言える。" },
    { phrase: "What seems to be the hardest part?", reading: "ホワット シームズ トゥ ビー ザ ハーデスト パート", meaning: "最も難しい部分は何ですか", note: "What seems to be ～? は相手の問題を優しく掘り下げる質問表現。" },
    { phrase: "keeping up with meal prep and exercise", reading: "キーピング アップ ウィズ ミール プレップ アンド エクササイズ", meaning: "食事準備と運動を続けること", note: "keep up with ～（〜についていく・続ける）はフレーズ動詞として重要。meal prep（食事の下準備）も現代英語の頻出語。" },
    { phrase: "appointments you can't cancel", reading: "アポイントメンツ ユー キャント キャンセル", meaning: "キャンセルできない約束", note: "健康習慣を優先事項として扱うメタファー。" },
    { phrase: "Schedule them in your calendar", reading: "スケジュール ゼム イン ユア カレンダー", meaning: "カレンダーに予定として入れる", note: "schedule something in（スケジュールに組み込む）はタイム管理の重要フレーズ。" },
    { phrase: "even if it's just thirty minutes", reading: "エブン イフ イッツ ジャスト サーティ ミニッツ", meaning: "たった30分でも", note: "even if ～（たとえ〜でも）は条件を受け入れる表現。小さなことでも価値があると伝えるニュアンス。" },
  ],

  414: [
    { phrase: "itchy eyes and a runny nose", reading: "イッチー アイズ アンド ア ラニー ノーズ", meaning: "目のかゆみと鼻水", note: "アレルギーの典型的な症状の表現。itchy（かゆい）/ runny nose（鼻水）は体調不良の基本語彙。" },
    { phrase: "almost every day", reading: "オールモスト エブリー デイ", meaning: "ほぼ毎日", note: "almost（ほぼ・もう少しで）は频度や量を表すときに便利な副詞。" },
    { phrase: "classic signs of seasonal allergies", reading: "クラシック サインズ オブ シーズナル アレルジーズ", meaning: "季節性アレルギーの典型的な症状", note: "seasonal allergies（花粉症・季節性アレルギー）は春によく話題になる表現。" },
    { phrase: "Has anything changed in your environment?", reading: "ハズ エニシング チェインジド イン ユア エンバイロンメント", meaning: "周囲の環境で何か変わりましたか", note: "医師が原因を探るときの質問パターン。environment は「環境・周囲」の意味。" },
    { phrase: "allergy testing", reading: "アレルジー テスティング", meaning: "アレルギー検査", note: "undergo allergy testing（アレルギー検査を受ける）のように使われる。" },
    { phrase: "identify the exact cause", reading: "アイデンティファイ ジ エグザクト コーズ", meaning: "正確な原因を特定する", note: "identify は「特定する・見分ける」。identify the source / identify the problem なども頻出。" },
    { phrase: "over-the-counter antihistamine", reading: "オーバー ザ カウンター アンチヒスタミン", meaning: "市販の抗ヒスタミン薬", note: "antihistamine はアレルギーや花粉症の治療薬。OTC antihistamine とも言う。" },
  ],

  415: [
    { phrase: "one of the most underestimated forms of exercise", reading: "ワン オブ ザ モスト アンダーエスティメイテッド フォームズ オブ エクササイズ", meaning: "最も過小評価されている運動形式の一つ", note: "underestimate（過小評価する）は「実際より低く見る」という動詞。" },
    { phrase: "significantly reduce the risk of heart disease", reading: "シグニフィカントリー リデュース ザ リスク オブ ハート ディジーズ", meaning: "心臓病のリスクを大幅に減らす", note: "reduce the risk of ～（〜のリスクを低下させる）は健康の話での定番表現。" },
    { phrase: "requires no equipment", reading: "リクワイアーズ ノー エクイップメント", meaning: "器具が不要", note: "require（必要とする）の否定形。no equipment needed / equipment-free とも言える。" },
    { phrase: "getting off the train one stop early", reading: "ゲッティング オフ ザ トレイン ワン ストップ アーリー", meaning: "電車を1駅手前で降りる", note: "get off the train（電車を降りる）に one stop early を加えた具体的な行動習慣の表現。" },
    { phrase: "the cumulative benefits", reading: "ザ キュミュラティブ ベネフィッツ", meaning: "累積的な効果・積み重なるメリット", note: "cumulative は「累積的な・積み重なる」という形容詞。cumulative effect とも言う。" },
    { phrase: "boost energy levels", reading: "ブースト エナジー レベルズ", meaning: "エネルギーレベルを高める", note: "boost は「増加させる・高める」という動詞。boost metabolism / boost immunity も頻出。" },
    { phrase: "have been remarkable", reading: "ハブ ビーン リマーカブル", meaning: "目を見張るほどだった", note: "remarkable は「注目に値する・素晴らしい」という形容詞。striking / impressive と同義。" },
  ],

  416: [
    { phrase: "My back has been really aching", reading: "マイ バック ハズ ビーン リアリー エイキング", meaning: "ずっと背中が痛い", note: "現在完了進行形で継続している痛みを表す。ache は「鈍い痛み・うずき」を指す動詞・名詞。" },
    { phrase: "from sitting at my desk all day", reading: "フロム シッティング アット マイ デスク オール デイ", meaning: "一日中デスクに座っているせいで", note: "from ＋ -ing で「〜することの結果」という原因・理由を表す。" },
    { phrase: "how your workstation is set up", reading: "ハウ ユア ワークステーション イズ セット アップ", meaning: "ワークステーションのセッティング", note: "workstation（作業環境）の set up（セッティング・配置）はエルゴノミクスの話でよく出る。" },
    { phrase: "whatever chair and desk are available", reading: "ホワットエバー チェア アンド デスク アー アベイラブル", meaning: "使える椅子と机ならどれでも", note: "whatever ～（〜であれ何でも）は選択の無頓着さを表す。" },
    { phrase: "at eye level", reading: "アット アイ レベル", meaning: "目の高さに合わせて", note: "目とスクリーンの高さを合わせることはデスクワーク環境の重要なポイント。" },
    { phrase: "support your lower back", reading: "サポート ユア ロウワー バック", meaning: "腰を支える", note: "lumbar support（腰部サポート）とも言われる。ergonomic chair（人間工学的な椅子）と関連。" },
    { phrase: "Even small adjustments can make a big difference", reading: "エブン スモール アジャストメンツ キャン メイク ア ビッグ ディファレンス", meaning: "小さな調整でも大きな違いをもたらすことができる", note: "make a difference（違いをもたらす）はよく使われる表現で、big を加えて強調している。" },
  ],

  417: [
    { phrase: "underestimate the importance of", reading: "アンダーエスティメイト ジ インポータンス オブ", meaning: "〜の重要性を過小評価する", note: "underestimate（過小評価する）はビタミン・睡眠・水分などの話でよく使われる。" },
    { phrase: "Even mild dehydration", reading: "エブン マイルド ディハイドレーション", meaning: "わずかな脱水状態でも", note: "mild dehydration（軽度の脱水）は健康の話での基本表現。even で「〜でさえ」という強調を加えている。" },
    { phrase: "difficulty concentrating", reading: "ディフィカルティ コンセントレイティング", meaning: "集中困難", note: "difficulty ＋ -ing で「〜することが難しい」という表現。difficulty sleeping / difficulty breathing なども頻出。" },
    { phrase: "eight glasses of water per day", reading: "エイト グラシィズ オブ ウォーター パー デイ", meaning: "1日8杯の水", note: "一般的に言われる水分摂取の目安。the recommended amount は「推奨量」。" },
    { phrase: "depending on body size and activity level", reading: "ディペンディング オン ボディ サイズ アンド アクティビティ レベル", meaning: "体の大きさと活動量によって", note: "depending on ～（〜によって）は条件の違いを示すときの便利な表現。" },
    { phrase: "as a constant reminder", reading: "アズ ア コンスタント リマインダー", meaning: "常に思い出させるものとして", note: "reminder（思い出させるもの）は習慣形成のコツを話すときに使われる表現。" },
    { phrase: "My energy levels have stabilized", reading: "マイ エナジー レベルズ ハブ スタビライズド", meaning: "エネルギーが安定してきた", note: "stabilize は「安定する・一定になる」という動詞。" },
  ],

  418: [
    { phrase: "How's your knee holding up?", reading: "ハウズ ユア ニー ホールディング アップ", meaning: "膝の調子はどうですか", note: "hold up は「持ちこたえる・元気でいる」というフレーズ動詞。体の状態を気遣う表現。" },
    { phrase: "You were limping last week", reading: "ユー ワー リンピング ラスト ウィーク", meaning: "先週は足を引きずっていましたね", note: "limp（足を引きずる・びっこをひく）は怪我の観察を表す動詞。" },
    { phrase: "physiotherapy exercises", reading: "フィジオセラピー エクササイジィズ", meaning: "理学療法の運動・リハビリ運動", note: "physiotherapy（理学療法・リハビリ）/ physical therapy（米）。PT exercises とも言う。" },
    { phrase: "get back to running", reading: "ゲット バック トゥ ランニング", meaning: "走ることに戻る・ランニングを再開する", note: "get back to ～（〜に戻る・〜を再開する）は活動再開を表すフレーズ動詞。" },
    { phrase: "Not quite", reading: "ノット クワイト", meaning: "まだそこまでは・もう少しで", note: "完全な否定ではなく「もう少し」というニュアンスの表現。Not yet / Almost とも近い意味。" },
    { phrase: "gradually start again", reading: "グラジュアリー スタート アゲイン", meaning: "少しずつ再開する", note: "gradually（少しずつ・徐々に）は回復や変化の話でよく使われる副詞。" },
    { phrase: "risk making it worse", reading: "リスク メイキング イット ワース", meaning: "悪化させるリスクを冒す", note: "risk ＋ -ing は「〜するリスクを冒す」という構文。don't risk it（リスクを冒さないで）も使いやすい。" },
  ],

  419: [
    { phrase: "a proactive and consistent approach", reading: "ア プロアクティブ アンド コンシステント アプローチ", meaning: "積極的で一貫したアプローチ", note: "proactive（先を見越した・積極的な）は健康・キャリアなど幅広い文脈で使われる形容詞。" },
    { phrase: "staying socially connected", reading: "ステイング ソーシャリー コネクテッド", meaning: "社会的なつながりを保つ", note: "健康的な老化の重要な要素として研究で繰り返し示されている概念。" },
    { phrase: "maintaining both physical and mental well-being", reading: "メインテイニング ボウス フィジカル アンド メンタル ウェルビーイング", meaning: "身体的・精神的な健康を両方維持すること", note: "well-being（幸福・健康状態）はhealth とは区別して「総合的な良い状態」を指す語。" },
    { phrase: "stay engaged with their community", reading: "ステイ エンゲイジド ウィズ ゼア コミュニティ", meaning: "地域社会への関与を続ける", note: "be engaged with ～（〜に積極的に関わっている）は健康的な生活の重要要素。" },
    { phrase: "continue learning new skills", reading: "コンティニュー ラーニング ニュー スキルズ", meaning: "新しいスキルを学び続ける", note: "lifelong learning（生涯学習）の概念。continue ＋ -ing で継続を表す。" },
    { phrase: "a greater sense of purpose", reading: "ア グレイター センス オブ パーパス", meaning: "より大きな目的意識・生きがい", note: "sense of purpose（目的意識・生きがい）は精神的健康の重要な要素。" },
    { phrase: "lead to a much higher quality of life", reading: "リード トゥ ア マッチ ハイアー クオリティ オブ ライフ", meaning: "はるかに高い生活の質につながる", note: "quality of life（生活の質・QOL）はwell-beingと関連する重要な概念。" },
  ],

  420: [
    { phrase: "cut sugar out of my diet", reading: "カット シュガー アウト オブ マイ ダイエット", meaning: "食事から砂糖を取り除く", note: "cut ～ out of your diet は「食事から〜を除く」という表現。eliminate sugar from your diet とも言える。" },
    { phrase: "I keep craving sweet things", reading: "アイ キープ クレイビング スウィート シングズ", meaning: "甘いものをずっと食べたくなってしまう", note: "keep ＋ -ing（〜し続ける）と crave（渇望する・強く欲しがる）の組み合わせ。" },
    { phrase: "blood sugar might be dipping", reading: "ブラッド シュガー マイト ビー ディッピング", meaning: "血糖値が下がっているかもしれない", note: "blood sugar（血糖値）と dip（急激に下がる）は健康・栄養の話の基本表現。" },
    { phrase: "triggers the cravings", reading: "トリガーズ ザ クレイビングズ", meaning: "渇望感を引き起こす", note: "trigger は「引き金になる・引き起こす」という動詞。trigger a reaction / trigger cravings のように使う。" },
    { phrase: "a protein-rich snack", reading: "ア プロテイン リッチ スナック", meaning: "タンパク質が豊富なスナック", note: "protein-rich は「タンパク質が豊富な」という複合形容詞。nutrient-rich / fiber-rich なども同様。" },
    { phrase: "mid-afternoon", reading: "ミッドアフタヌーン", meaning: "昼過ぎ・午後の中頃", note: "mid- ＋ 時間帯の複合語。mid-morning / mid-evening なども同様に使える。" },
    { phrase: "stabilize your blood sugar", reading: "スタビライズ ユア ブラッド シュガー", meaning: "血糖値を安定させる", note: "stabilize（安定させる）は健康・金融などの文脈で使われる動詞。" },
    { phrase: "keep the cravings at bay", reading: "キープ ザ クレイビングズ アット ベイ", meaning: "渇望感を抑える", note: "keep ～ at bay は「〜を寄せ付けない・抑える」というイディオム。keep the hunger at bay とも言える。" },
  ],

  // ── 社会・文化 追加 ───────────────────────────────────────────────────────

  511: [
    { phrase: "Did you get a chance to visit", reading: "ディッド ユー ゲット ア チャンス トゥ ビジット", meaning: "〜を訪れる機会がありましたか", note: "get a chance to ～（〜する機会を得る）は日常会話でよく使われる表現。" },
    { phrase: "truly thought-provoking", reading: "トゥルーリー ソートプロボウキング", meaning: "本当に考えさせられる・深く考えるきっかけになる", note: "thought-provoking は「思考を刺激する」という複合形容詞。art・文学・映画の批評でよく使われる。" },
    { phrase: "I'll admit I didn't understand all of it", reading: "アイル アドミット アイ ディドゥント アンダースタンド オール オブ イット", meaning: "全部は理解できなかったと認めます", note: "I'll admit ～ は「正直に言うと〜」という솔직한 告白表現。to be honest と同義。" },
    { phrase: "Art doesn't always have to be immediately understood", reading: "アート ダズント オールウェイズ ハブ トゥ ビー イミーディアトリー アンダーストゥッド", meaning: "アートは必ずしもすぐに理解される必要はない", note: "doesn't have to（〜する必要はない）は義務の否定を表す重要構文。" },
    { phrase: "to be meaningful", reading: "トゥ ビー ミーニングフル", meaning: "意味を持つために", note: "meaningful（意義のある・深い意味のある）はアートや体験の評価でよく使われる。" },
    { phrase: "That's a good way to look at it", reading: "ザッツ ア グッド ウェイ トゥ ルック アット イット", meaning: "それは良い見方ですね", note: "相手の視点・解釈を評価する表現。That's an interesting perspective とも言える。" },
    { phrase: "standing in front of one painting for almost twenty minutes", reading: "スタンディング イン フロント オブ ワン ペインティング フォー オールモスト トゥエンティ ミニッツ", meaning: "1枚の絵の前にほぼ20分立っていた", note: "アートへの深い没入を表すシーンの表現。" },
  ],

  512: [
    { phrase: "faster than at any point in recent history", reading: "ファスター ザン アット エニー ポイント イン リセント ヒストリー", meaning: "近現代史のいかなる時点よりも速い", note: "at any point in ～（〜のいかなる時点においても）という比較表現。" },
    { phrase: "reshaping entire industries", reading: "リシェイピング エンタイア インダストリーズ", meaning: "業界全体を再構築している", note: "reshape（再構成する・形を変える）は社会変化を描写するときの強い動詞。" },
    { phrase: "permanently altered our expectations", reading: "パーマネントリー オールタード アワー エクスペクテーションズ", meaning: "私たちの期待を永遠に変えた", note: "permanently（永続的に）とalter（変える・変容する）の組み合わせ。" },
    { phrase: "meaningful work isn't just about salary", reading: "ミーニングフル ワーク イズント ジャスト アバウト サラリー", meaning: "意義ある仕事は給与だけの話ではない", note: "meaningful work（やりがいのある仕事）は現代のキャリア論でよく使われる概念。" },
    { phrase: "flexibility, purpose, and a healthy work-life balance", reading: "フレクシビリティ パーパス アンド ア ヘルシー ワークライフ バランス", meaning: "柔軟性、目的、健全なワークライフバランス", note: "現代の働き手が求める3つの価値観を並べた表現。" },
    { phrase: "adapt quickly", reading: "アダプト クウィックリー", meaning: "素早く適応する", note: "adapt to change（変化に適応する）はビジネスや社会変化の話の必須表現。" },
    { phrase: "holding onto the things that make work genuinely rewarding", reading: "ホールディング オントゥ ザ シングズ ザット メイク ワーク ジェニュインリー リワーディング", meaning: "仕事を本当にやりがいのあるものにする要素を守り続けること", note: "hold onto ～（〜を手放さない・守る）と rewarding（報われる・やりがいのある）の組み合わせ。" },
  ],

  513: [
    { phrase: "real progress in gender equality", reading: "リアル プログレス イン ジェンダー イクオリティ", meaning: "ジェンダー平等における本当の進歩", note: "gender equality（ジェンダー平等）は現代社会の重要な話題。gender gap（ジェンダーギャップ）も関連語。" },
    { phrase: "over the past decade", reading: "オーバー ザ パスト デケイド", meaning: "過去10年間で", note: "decade（10年）はよく使われる時間単位。over the past few years / century なども同様の構造。" },
    { phrase: "the gap is still significant", reading: "ザ ギャップ イズ スティル シグニフィカント", meaning: "格差はまだ大きい", note: "gap（格差・差）とsignificant（重大な・大きな）は社会問題の議論でよく出るペア表現。" },
    { phrase: "especially at senior levels", reading: "エスペシャリー アット シニア レベルズ", meaning: "特に上位職レベルでは", note: "senior levels（上位職・管理職レベル）は組織のヒエラルキーを指す。" },
    { phrase: "There's still a long way to go", reading: "ゼアーズ スティル ア ロング ウェイ トゥ ゴー", meaning: "まだまだ先は長い", note: "「改善はあるが、まだ達成には程遠い」を表すイディオム。We've made progress, but there's still a long way to go.のように使う。" },
    { phrase: "visible leadership", reading: "ビジブル リーダーシップ", meaning: "見える形でのリーダーシップ・目に見えるロールモデル", note: "representation（代表・代表されること）の重要性を示す概念。" },
    { phrase: "sends a powerful message about what's possible", reading: "センズ ア パワフル メッセージ アバウト ホワッツ ポッシブル", meaning: "何が可能かについて強力なメッセージを送る", note: "send a message（メッセージを伝える）は比喩的に「何かを示す」という意味でよく使われる。" },
  ],

  514: [
    { phrase: "universal forms of human expression", reading: "ユニバーサル フォームズ オブ ヒューマン エクスプレッション", meaning: "人間の表現の普遍的な形式", note: "universal（普遍的な）とhuman expression（人間の表現）は文化・芸術の論考でよく出る表現。" },
    { phrase: "to celebrate, grieve, worship, and connect", reading: "トゥ セレブレイト グリーブ ウォーシップ アンド コネクト", meaning: "祝い、悲しみ、礼拝し、つながるために", note: "音楽の社会的機能を列挙した表現。grieve（悲しむ）worship（礼拝する）は少し高度な語彙。" },
    { phrase: "cross language barriers", reading: "クロス ランゲッジ バリアーズ", meaning: "言語の壁を超える", note: "cross barriers（壁を越える）はよく使われる比喩表現。" },
    { phrase: "an immediate emotional response", reading: "アン イミーディアット エモーショナル レスポンス", meaning: "即座の感情的な反応", note: "elicit / evoke an emotional response（感情的反応を引き出す）とも言われる。" },
    { phrase: "reflect who we are as a society", reading: "リフレクト フー ウィー アー アズ ア ソサイエティ", meaning: "社会としての私たちを映し出す", note: "reflect（反映する・映し出す）は文化・芸術が社会を映すという比喩的な使い方。" },
    { phrase: "rise and fall in popularity", reading: "ライズ アンド フォール イン ポピュラリティ", meaning: "人気が上下する", note: "rise and fall（興亡・盛衰）はイディオムとして使われることが多い。" },
    { phrase: "mirror the values and anxieties of their time", reading: "ミラー ザ バリューズ アンド アングザイエティーズ オブ ゼア タイム", meaning: "その時代の価値観と不安を映し出す", note: "mirror（鏡のように映す）は比喩的な動詞。reflect とほぼ同義。" },
  ],

  515: [
    { phrase: "losing their uniqueness", reading: "ルーズィング ゼア ユニークネス", meaning: "独自性を失う", note: "lose one's uniqueness / distinctive character はグローバル化の文脈でよく使われる表現。" },
    { phrase: "as the world becomes more globalized", reading: "アズ ザ ワールド ビカムズ モア グローバライズド", meaning: "世界がよりグローバル化するにつれて", note: "as ～ becomes（〜になるにつれて）は変化を表す重要な接続詞の使い方。" },
    { phrase: "help preserve cultures", reading: "ヘルプ プリザーブ カルチャーズ", meaning: "文化の保存を助ける", note: "preserve（保存する・維持する）はculture / tradition / heritage とよく組み合わされる動詞。" },
    { phrase: "by giving them a wider audience", reading: "バイ ギビング ゼム ア ワイダー オーディエンス", meaning: "より幅広い聴衆・視聴者を与えることで", note: "by ＋ -ing で手段・方法を表す。wider audience（より広い視聴者層）はメディアの話でも使われる。" },
    { phrase: "the economic means to sustain their traditions", reading: "ジ エコノミック ミーンズ トゥ サステイン ゼア トラディションズ", meaning: "伝統を維持するための経済的手段", note: "means（手段・方法）は可算・不可算両方で使われる語。sustain（維持する・継続させる）も重要動詞。" },
    { phrase: "local artisans, musicians, and storytellers", reading: "ローカル アーティザンズ ミュージシャンズ アンド ストーリーテラーズ", meaning: "地元の職人、音楽家、語り部", note: "artisan（職人・手工芸家）はcraftsperson とも言う。地域文化の担い手を指す語群。" },
    { phrase: "have a real chance of surviving", reading: "ハブ ア リアル チャンス オブ サバイビング", meaning: "生き残る本当の可能性がある", note: "have a chance of ＋ -ing で「〜する可能性がある」という表現。" },
  ],

  516: [
    { phrase: "The purpose of education is evolving", reading: "ザ パーパス オブ エデュケーション イズ エボルビング", meaning: "教育の目的は進化している", note: "evolve（進化する・変化する）は社会・技術の話でよく出る動詞。" },
    { phrase: "freely available to anyone with an internet connection", reading: "フリーリー アベイラブル トゥ エニワン ウィズ アン インターネット コネクション", meaning: "インターネット接続があれば誰でも自由に利用できる", note: "freely available（自由に利用できる）はオープンアクセスの概念を表す表現。" },
    { phrase: "critical thinking, creativity, collaboration, and adaptability", reading: "クリティカル シンキング クリエイティビティ コラボレーション アンド アダプタビリティ", meaning: "批判的思考、創造性、協調性、適応能力", note: "21世紀型スキル（21st century skills）として教育界でよく言及される4つのC。" },
    { phrase: "harder to measure but far more valuable", reading: "ハーダー トゥ メジャー バット ファー モア バリュアブル", meaning: "測定しにくいが、はるかに価値がある", note: "harder to measure（測りにくい）はソフトスキルを説明するときの常套表現。" },
    { phrase: "shift their focus toward", reading: "シフト ゼア フォーカス トウォード", meaning: "焦点を〜へ移す", note: "shift focus（焦点を移す）は変化・方向転換を表すビジネス・教育の文脈で頻出。" },
    { phrase: "how to question", reading: "ハウ トゥ クエスチョン", meaning: "疑問を持つ方法・批判的に問う方法", note: "question assumptions（思い込みを疑う）はクリティカルシンキングの核心。" },
    { phrase: "the ability to keep growing", reading: "ジ アビリティ トゥ キープ グロウイング", meaning: "成長し続ける能力", note: "growth mindset（成長マインドセット）の概念と関連する表現。" },
  ],

  517: [
    { phrase: "focusing on experiences rather than things", reading: "フォーカシング オン エクスペリエンシィズ ラーザー ザン シングズ", meaning: "モノではなく体験に集中する", note: "experiences over things（モノより体験）はミニマリズムや幸福研究のキーコンセプト。" },
    { phrase: "Have you ever tried minimalism?", reading: "ハブ ユー エバー トライド ミニマリズム", meaning: "ミニマリズムを試したことはありますか", note: "Have you ever ～?（〜したことはありますか）は経験を尋ねる現在完了の定番形。" },
    { phrase: "I decluttered my apartment", reading: "アイ ディクラタード マイ アパートメント", meaning: "アパートを片付けた・断捨離した", note: "declutter（不用品を処分してスッキリさせる）はミニマリズムの基本動詞。" },
    { phrase: "donated about half my belongings", reading: "ドネイテッド アバウト ハーフ マイ ビロングングズ", meaning: "持ち物の約半分を寄付した", note: "donate（寄付する）は使わなくなった物の処分方法として言及されることが多い。" },
    { phrase: "surprisingly liberating", reading: "サプライジングリー リバレイティング", meaning: "驚くほど解放感があった", note: "liberating（解放的な・自由にしてくれる）は断捨離の感想でよく使われる形容詞。" },
    { phrase: "hold on to things 'just in case'", reading: "ホールド オン トゥ シングズ ジャスト イン ケース", meaning: "念のためにモノを取っておく", note: "just in case（念のために・万一のために）はものを捨てられない理由としてよく使われる表現。" },
    { phrase: "once you realize you haven't missed most of what you got rid of", reading: "ワンス ユー リアライズ ユー ハブント ミスト モスト オブ ホワット ユー ガット リッド オブ", meaning: "処分したもののほとんどを惜しんでいないと気づいたとき", note: "miss（惜しむ・恋しく思う）は物を処分した後の気持ちを表す動詞。" },
  ],

  518: [
    { phrase: "develop empathy", reading: "ディベロップ エンパシー", meaning: "共感力を育てる", note: "develop（育てる・発達させる）とempathy（共感）は文学・教育の話でよく出るペア。" },
    { phrase: "broaden your understanding of the world", reading: "ブロードゥン ユア アンダースタンディング オブ ザ ワールド", meaning: "世界への理解を広げる", note: "broaden（広げる）はhorizons / perspective / knowledge とよく組み合わされる動詞。" },
    { phrase: "follow a character through difficult decisions", reading: "フォロウ ア キャラクター スルー ディフィカルト ディシジョンズ", meaning: "キャラクターが困難な決断を経る過程を追う", note: "follow a character（登場人物を追う）は読書・物語の話でよく使われる表現。" },
    { phrase: "a richer view of human experience", reading: "ア リッチャー ビュー オブ ヒューマン エクスペリエンス", meaning: "人間の経験についてより豊かな見方", note: "richer view（より豊かな視点）はnarrow view（狭い視点）との対比で使われる。" },
    { phrase: "read fiction regularly", reading: "リード フィクション レギュラリー", meaning: "フィクションを定期的に読む", note: "fiction（小説・フィクション）はnon-fiction（ノンフィクション）と対をなす語。" },
    { phrase: "understanding others' emotions and perspectives", reading: "アンダースタンディング アザーズ エモーションズ アンド パースペクティブス", meaning: "他者の感情や視点を理解すること", note: "empathy の具体的な内容を示す表現。perspective-taking（視点取得）とも関連する。" },
    { phrase: "increasingly divided", reading: "インクリーシングリー ディバイデッド", meaning: "ますます分断されている", note: "a divided society（分断された社会）は現代の社会問題の文脈でよく使われる。" },
    { phrase: "truly listening to other voices", reading: "トゥルーリー リスニング トゥ アザー ボイシィズ", meaning: "他者の声に本当に耳を傾けること", note: "listen to other voices（他者の意見に耳を傾ける）は対話と相互理解の重要性を示す表現。" },
  ],

  519: [
    { phrase: "such a complex and often divisive topic", reading: "サッチ ア コンプレックス アンド オーフン ディバイシブ トピック", meaning: "非常に複雑でしばしば意見が分かれる話題", note: "divisive（意見を分ける・対立を引き起こす）は政治・社会の議題を描写するときの形容詞。" },
    { phrase: "often gets oversimplified", reading: "オーフン ゲッツ オーバーシンプリファイド", meaning: "しばしば過度に単純化される", note: "oversimplify（過度に単純化する）は複雑な問題を議論するときの重要動詞。" },
    { phrase: "behind the statistics, there are real individuals and families", reading: "ビハインド ザ スタティスティックス ゼアー アー リアル インディビジュアルズ アンド ファミリーズ", meaning: "統計の背後には現実の個人と家族がいる", note: "behind the statistics（数字の背後に）は人間の側面を強調するときの表現。" },
    { phrase: "My parents immigrated here thirty years ago", reading: "マイ ペアレンツ イミグレイテッド ヒア サーティ イヤーズ アゴー", meaning: "私の両親は30年前にここに移民してきた", note: "immigrate（移民する）はemigrate（出身国を離れる）との違いに注意。immigrate to ～（〜に移民する）。" },
    { phrase: "contributed so much to this community", reading: "コントリビューテッド ソー マッチ トゥ ジス コミュニティ", meaning: "この地域社会に多大な貢献をした", note: "contribute to ～（〜に貢献する）は社会参加の文脈でよく使われる表現。" },
    { phrase: "That's a perspective that often gets lost", reading: "ザッツ ア パースペクティブ ザット オーフン ゲッツ ロスト", meaning: "それは見落とされがちな視点です", note: "get lost（見落とされる・無視される）は議論の中で見過ごされるものを表す表現。" },
    { phrase: "Understanding personal stories can really change how people think", reading: "アンダースタンディング パーソナル ストーリーズ キャン リアリー チェインジ ハウ ピープル シンク", meaning: "個人の物語を理解することで人の考え方が本当に変わることがある", note: "personal stories（個人の体験談）が持つ力を表す表現。narrative（物語・体験談）とも関連。" },
  ],

  520: [
    { phrase: "one of the most significant changes in working life", reading: "ワン オブ ザ モスト シグニフィカント チェインジズ イン ワーキング ライフ", meaning: "働き方の中で最も重要な変化の一つ", note: "significant change（重大な変化）はsocial / cultural change の話でよく使われる表現。" },
    { phrase: "a better work-life balance", reading: "ア ベター ワークライフ バランス", meaning: "より良いワークライフバランス", note: "work-life balance はキャリアと私生活の調和を指す現代の重要概念。" },
    { phrase: "live wherever they choose", reading: "リブ ホエアーエバー ゼイ チューズ", meaning: "どこでも好きな場所に住む", note: "wherever they choose（自分が選んだどこでも）はリモートワークの自由を表す表現。" },
    { phrase: "feelings of isolation", reading: "フィーリングズ オブ アイソレーション", meaning: "孤立感", note: "isolation（孤立・孤独）はリモートワークの課題としてよく議論される。" },
    { phrase: "the blurring of boundaries between work and home life", reading: "ザ ブラーリング オブ バウンダリーズ ビトウィーン ワーク アンド ホーム ライフ", meaning: "仕事と家庭生活の境界線が曖昧になること", note: "blur boundaries（境界を曖昧にする）は在宅勤務の課題を表す表現。" },
    { phrase: "spontaneous collaboration", reading: "スポンテイニアス コラボレーション", meaning: "自然発生的な協力・コラボレーション", note: "watercooler moments（給水機の前での何気ない会話）のような偶発的な交流を指す。" },
    { phrase: "navigate this new reality", reading: "ナビゲイト ジス ニュー リアリティ", meaning: "この新しい現実を切り抜ける", note: "navigate（切り抜ける・対処する）は困難な状況への対応を表す動詞。navigate challenges とも使われる。" },
    { phrase: "build cultures that thrive both in person and online", reading: "ビルド カルチャーズ ザット スライブ ボウス イン パーソン アンド オンライン", meaning: "対面とオンライン両方で活躍できる文化を構築する", note: "thrive（繁栄する・活躍する）はflourish とほぼ同義。in person（対面で）は対面コミュニケーションの重要語。" },
  ],

};
