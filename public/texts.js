'use strict';

const CATEGORIES = [
  { id: 'daily',   label: '日常会話',       icon: '💬' },
  { id: 'travel',  label: '旅行・移動',     icon: '✈️' },
  { id: 'work',    label: '仕事・ビジネス', icon: '💼' },
  { id: 'health',  label: '健康・生活',     icon: '🌿' },
  { id: 'culture', label: '社会・文化',     icon: '🌍' },
];

const PRACTICE_TEXTS = [

  // ── 日常会話 ─────────────────────────────────────────────────────────────────
  {
    id: 101, category: 'daily', title: 'Morning Routine', titleJa: '朝のルーティン',
    text: `I wake up at seven o'clock every morning. After brushing my teeth, I make a cup of coffee and read the news on my phone. I prefer to have a light breakfast, usually toast with butter or a bowl of yogurt with fresh fruit. Getting a good start to the day really helps me stay focused and productive.`
  },
  {
    id: 102, category: 'daily', title: 'Weekend Plans', titleJa: '週末の予定',
    text: `A: Do you have any plans for this weekend?
B: I'm thinking of going hiking with some friends. Would you like to join us?
A: That sounds great! I haven't been hiking in a long time.
B: Perfect. We're meeting at the park entrance at nine in the morning. Don't forget to bring some water and snacks.`
  },
  {
    id: 103, category: 'daily', title: 'Talking About the Weather', titleJa: '天気の話',
    text: `A: Can you believe how hot it's been lately?
B: I know! I've been drinking water constantly just to stay hydrated.
A: Same here. I really hope it cools down soon.
B: Apparently there's a chance of rain this weekend, which would be such a relief.`
  },
  {
    id: 104, category: 'daily', title: 'Catching Up with a Friend', titleJa: '友人との近況報告',
    text: `A: Long time no see! How have you been?
B: Really good, thanks! I just got back from a trip to Canada last week.
A: Oh wow, how was it?
B: It was absolutely amazing. The scenery was breathtaking, and the people were incredibly friendly. I'm already thinking about going back.`
  },
  {
    id: 105, category: 'daily', title: 'Talking About Hobbies', titleJa: '趣味について',
    text: `A: What do you like to do in your free time?
B: I enjoy cooking and trying out new recipes from different countries. What about you?
A: I'm really into photography. I often go out on weekends to take pictures of nature and street scenes.
B: That's so cool! Maybe you could take some photos of my cooking sometime. I'd love that.`
  },
  {
    id: 106, category: 'daily', title: 'Talking About a Movie', titleJa: '映画の話',
    text: `A: Did you see that new thriller that came out last week?
B: Yes! I watched it on Friday night. What did you think of it?
A: I thought it was really suspenseful. I couldn't figure out the ending until the very last minute.
B: Me neither. I definitely want to watch it again to catch all the clues I missed the first time.`
  },
  {
    id: 107, category: 'daily', title: 'Making Plans for Dinner', titleJa: '夕食の約束',
    text: `A: I was thinking of trying that new Italian restaurant downtown. Have you heard of it?
B: Oh yes, I've heard great things about it. When were you thinking of going?
A: How about Friday evening? Around seven o'clock?
B: That works perfectly for me. Should I make a reservation in advance?`
  },
  {
    id: 108, category: 'daily', title: 'Recommending a Book', titleJa: '本のおすすめ',
    text: `I just finished reading a fascinating book about the history of ancient civilizations. What surprised me most was how advanced some of these societies were, despite having limited technology. The book was well-written and easy to understand, even for someone who isn't a history expert. I would definitely recommend it to anyone who enjoys learning about the past.`
  },
  {
    id: 109, category: 'daily', title: 'Grocery Shopping', titleJa: '食料品の買い物',
    text: `Every Saturday morning, I go to the local supermarket to buy groceries for the week. I always make a list beforehand so I don't forget anything important. Fresh vegetables, fruits, and some protein are always at the top of my list. I try to avoid buying too many processed foods and stick to natural, wholesome ingredients as much as possible.`
  },
  {
    id: 110, category: 'daily', title: 'Leaving a Voicemail', titleJa: '留守番電話のメッセージ',
    text: `Hi, this is Sarah Johnson calling to confirm my appointment for tomorrow afternoon. I have a meeting scheduled at three o'clock, and I just wanted to make sure everything is still on schedule. Could you also let me know if there's anything I need to bring? Please call me back at your earliest convenience. Thank you so much.`
  },

  // ── 旅行・移動 ────────────────────────────────────────────────────────────────
  {
    id: 201, category: 'travel', title: 'Asking for Directions', titleJa: '道を聞く',
    text: `A: Excuse me, could you help me find the city museum?
B: Of course. Go straight down this street for two blocks, then turn left at the traffic lights.
A: Is it far from here?
B: Not at all. It should take about ten minutes on foot. You can't miss it — it's a large red brick building.`
  },
  {
    id: 202, category: 'travel', title: 'At the Airport Check-In', titleJa: '空港のチェックイン',
    text: `A: Could I see your passport and boarding pass, please?
B: Sure, here you go. I also have one bag to check in.
A: No problem. Please place your bag on the scale. You're right at the weight limit.
B: Great. Which gate do I need to go to for my flight?
A: Gate C12. Security is to your right. Boarding starts in about forty-five minutes.`
  },
  {
    id: 203, category: 'travel', title: 'Booking a Hotel Room', titleJa: 'ホテルの予約',
    text: `Good afternoon. I'd like to make a reservation for two nights, please. I'm looking for a room with a double bed and a view of the city if possible. We'll be arriving on the fifteenth and checking out on the seventeenth. Could you also tell me whether breakfast is included in the rate, and if there's parking available?`
  },
  {
    id: 204, category: 'travel', title: 'On the Train', titleJa: '電車の中で',
    text: `A: Excuse me, is this seat taken?
B: No, please go ahead. Are you traveling far today?
A: I'm going all the way to Osaka. It takes about three hours from here.
B: Oh, that's quite a journey. Is this your first time visiting Osaka?
A: No, I go there for work once a month. I actually love it — the food there is incredible.`
  },
  {
    id: 205, category: 'travel', title: 'Planning a Trip Abroad', titleJa: '海外旅行の計画',
    text: `A: I've been thinking about visiting Europe this summer. Where would you recommend?
B: I'd suggest starting with Spain. The food, architecture, and culture are absolutely incredible.
A: That sounds wonderful. How long do you think I'd need to see the highlights?
B: At least two weeks to experience it properly. Start in Barcelona, then head south to Seville and Granada.`
  },
  {
    id: 206, category: 'travel', title: 'Renting a Car', titleJa: 'レンタカー',
    text: `A: I'd like to rent a compact car for three days, please.
B: Certainly. May I see your driver's license and credit card?
A: Here you go. Does the rental include basic insurance?
B: Yes, basic coverage is included. However, we recommend adding full protection for extra peace of mind. It's only ten dollars more per day.`
  },
  {
    id: 207, category: 'travel', title: 'Reporting Lost Luggage', titleJa: '荷物の紛失',
    text: `A: Excuse me, I can't find my suitcase at the baggage claim area.
B: I'm very sorry to hear that. Could you tell me your flight number and describe the bag?
A: It was flight BA205 from London. The suitcase is large, dark blue, with a red ribbon tied to the handle.
B: Let me check our system right away. Could you fill out this form while you wait? We'll do everything we can to locate it.`
  },
  {
    id: 208, category: 'travel', title: 'At a Tourist Information Center', titleJa: '観光案内所で',
    text: `Good afternoon. I just arrived in the city and I'm looking for things to do over the next four days. Could you give me a map and some brochures about local attractions? I'm particularly interested in museums, historical sites, and any local festivals that might be happening. I'd also appreciate a recommendation for a good restaurant in the area.`
  },
  {
    id: 209, category: 'travel', title: 'Visiting a Local Market', titleJa: '地元の市場',
    text: `One of my favorite things to do when traveling is visit the local market. You can find fresh produce, handmade crafts, and delicious street food that you simply wouldn't find in a regular store. Talking to the vendors is also a wonderful way to learn about the local culture and way of life. I always try to buy a few small, handmade items to bring home as memories of the trip.`
  },
  {
    id: 210, category: 'travel', title: 'Missing the Last Train', titleJa: '終電を逃す',
    text: `A: Oh no, I think we just missed the last train home.
B: Don't panic. We can take a taxi or use a rideshare app.
A: How long do you think it would take by taxi at this hour?
B: Probably around thirty to forty minutes, depending on traffic. It won't be too expensive if we split the cost.`
  },

  // ── 仕事・ビジネス ────────────────────────────────────────────────────────────
  {
    id: 301, category: 'work', title: 'Job Interview', titleJa: '就職面接',
    text: `A: Tell me a little about yourself and why you're interested in this position.
B: I have five years of experience in marketing, and I've always been passionate about building strong customer relationships and growing brand awareness.
A: That's impressive. What would you say is your greatest professional strength?
B: I'm very good at working under pressure and consistently meeting tight deadlines without sacrificing quality.`
  },
  {
    id: 302, category: 'work', title: 'Opening a Team Meeting', titleJa: 'チームミーティングの開始',
    text: `Good morning, everyone. Thank you all for joining today's meeting. I'd like to start by reviewing last month's sales figures, which exceeded our targets by fifteen percent. That's a fantastic result, and I want to express my sincere gratitude for each of your contributions. Now, let's move on to discuss our strategy for the upcoming quarter.`
  },
  {
    id: 303, category: 'work', title: 'Requesting Time Off', titleJa: '休暇申請',
    text: `A: Could I speak with you for a moment? I'd like to request a day off this coming Friday.
B: Sure, is everything okay?
A: Yes, I just have a personal matter to take care of. I'll make sure all my work is completed beforehand.
B: That's perfectly fine. Please send me a quick email to confirm it so I have a record.`
  },
  {
    id: 304, category: 'work', title: 'Working from Home', titleJa: 'テレワーク',
    text: `A: How are you finding working from home these days?
B: Honestly, I love it. I'm much more productive without the daily commute eating into my time.
A: I feel the opposite, actually. I miss the energy of the office and the spontaneous conversations with colleagues.
B: I completely understand. It really does depend on your personal working style and home environment.`
  },
  {
    id: 305, category: 'work', title: 'Presenting a Project Proposal', titleJa: '提案のプレゼン',
    text: `Today I'd like to present our new project proposal to expand our online presence and reach a younger demographic. We plan to launch a targeted social media campaign and redesign our website to make it more user-friendly on mobile devices. Based on our research, I believe this strategy will increase our customer base by at least twenty percent within the next six months.`
  },
  {
    id: 306, category: 'work', title: 'Writing a Follow-Up Email', titleJa: 'フォローアップメール',
    text: `Dear Mr. Thompson, I hope this message finds you well. I'm writing to follow up on our meeting last Tuesday regarding the new product launch. As discussed, I've attached the revised proposal for your review. Please don't hesitate to reach out if you have any questions or would like to schedule a call to discuss the details further. I look forward to hearing from you soon.`
  },
  {
    id: 307, category: 'work', title: 'Handling a Difficult Client', titleJa: 'クレーム対応',
    text: `A: I'm very unhappy with the quality of the last delivery. This is simply not acceptable.
B: I completely understand your frustration, and I sincerely apologize for the inconvenience this has caused.
A: What exactly are you going to do to fix this situation?
B: We'll arrange a full replacement immediately and conduct a thorough review of our quality control process to ensure this never happens again.`
  },
  {
    id: 308, category: 'work', title: 'Discussing a Salary Raise', titleJa: '昇給の交渉',
    text: `A: I'd like to discuss my compensation. I feel my current salary no longer reflects my contributions to the team.
B: I appreciate you bringing this up directly. You have certainly proven yourself to be a very valuable team member.
A: I've taken on a number of additional responsibilities over the past year, beyond my original job description.
B: That's absolutely true. Let me review your performance records this week and get back to you by Friday.`
  },
  {
    id: 309, category: 'work', title: 'Networking Event', titleJa: 'ネットワーキング',
    text: `Attending professional networking events can be one of the most effective ways to advance your career. You never know who you might meet — a future employer, a business partner, or a mentor with invaluable advice. The key is to be genuinely curious about other people and to listen carefully to what they have to say. Always follow up with a brief message after the event to keep the relationship alive.`
  },
  {
    id: 310, category: 'work', title: 'After-Work Dinner', titleJa: '仕事後の食事',
    text: `A: Are you coming to the team dinner tonight?
B: I'd love to, but I still have a few things to finish up before I can leave. What time does it start?
A: We're meeting at the restaurant around seven. You could always join us a little later if you need to.
B: That sounds great. I should be wrapped up by six-thirty at the latest. Text me the address!`
  },

  // ── 健康・生活 ────────────────────────────────────────────────────────────────
  {
    id: 401, category: 'health', title: "At the Doctor's Office", titleJa: '診察室で',
    text: `A: So, what seems to be the problem today?
B: I've had a sore throat and a slight fever since yesterday evening.
A: I see. Let me check your throat and temperature. Does it hurt when you swallow?
B: Yes, quite a bit, especially in the morning when I wake up. I've also been feeling more tired than usual.`
  },
  {
    id: 402, category: 'health', title: 'Talking About Exercise', titleJa: '運動の話',
    text: `A: Do you work out regularly these days?
B: I try to go to the gym about three times a week. It really helps me manage stress and clear my head.
A: That's great. I've been meaning to start, but I'm not sure where to begin.
B: I'd suggest starting with just thirty minutes of brisk walking every day. That alone makes a huge difference to how you feel.`
  },
  {
    id: 403, category: 'health', title: 'Healthy Eating Habits', titleJa: '食生活の改善',
    text: `Over the past few months, I've been working hard to improve my diet. I've cut back on sugar and processed foods, and I'm eating a lot more vegetables and whole grains. I also try to cook at home as often as possible, which helps me control exactly what goes into my meals. The hardest part has been resisting late-night snacks, but I'm gradually getting better at it.`
  },
  {
    id: 404, category: 'health', title: 'Dealing with Stress', titleJa: 'ストレス対処',
    text: `A: You look a bit tired lately. Are you doing okay?
B: To be honest, I've been under a lot of pressure at work. I just can't seem to switch off, even at home.
A: I know exactly how that feels. Have you ever tried meditation or deep breathing exercises?
B: Not really — I've always assumed it wouldn't work for me. But maybe it's worth giving it a proper try.`
  },
  {
    id: 405, category: 'health', title: 'At the Pharmacy', titleJa: '薬局で',
    text: `A: I have a headache, a runny nose, and I feel a bit achy all over. What would you recommend?
B: It sounds like you may have a mild cold. This over-the-counter medicine should help relieve your symptoms.
A: How often should I take it?
B: Take one tablet every six hours with plenty of water, and make sure you get plenty of rest. If your symptoms worsen after two days, please see a doctor.`
  },
  {
    id: 406, category: 'health', title: 'The Importance of Sleep', titleJa: '睡眠の重要性',
    text: `Getting enough quality sleep is one of the most important things you can do for your overall health. Adults should aim for seven to nine hours per night. I've noticed that when I go to bed at the same time every evening and avoid looking at screens for an hour before sleep, the quality of my rest improves dramatically. Even a short twenty-minute nap in the afternoon can help restore your energy and sharpen your concentration.`
  },
  {
    id: 407, category: 'health', title: 'Joining a Gym', titleJa: 'ジムに入会する',
    text: `A: I'm interested in joining your gym. Could you walk me through the membership options?
B: Of course! We have monthly plans and annual plans. The annual membership gives you a twenty percent discount compared to paying monthly.
A: Are group fitness classes included in the membership fee?
B: Yes, all of our classes — including yoga, spin cycling, and HIIT — are included at no extra cost.`
  },
  {
    id: 408, category: 'health', title: 'Mental Health Awareness', titleJa: 'メンタルヘルス',
    text: `Taking care of your mental health is just as important as looking after your physical health. It's completely okay to feel overwhelmed or anxious sometimes, and asking for help is a sign of courage, not weakness. Simple practices like spending quality time with loved ones, getting outdoors in nature, and talking to a professional therapist can make a profound difference. Always remember to be kind and patient with yourself, especially during difficult times.`
  },
  {
    id: 409, category: 'health', title: 'Cooking a Healthy Dinner', titleJa: '健康的な夕食',
    text: `A: What are you making for dinner tonight? It smells wonderful.
B: I'm making grilled salmon with roasted vegetables and brown rice. It's quick, delicious, and really nutritious.
A: That sounds amazing. How long does the whole thing take to prepare?
B: About thirty minutes from start to finish. I'll send you the recipe — it's much simpler than it looks.`
  },
  {
    id: 410, category: 'health', title: 'Breaking a Bad Habit', titleJa: '悪い習慣を断つ',
    text: `Giving up a bad habit is never easy, but it's one of the most rewarding things you can do for yourself. Whether it's cutting down on sugar, spending less time on your phone, or quitting smoking, the key is to start with small, manageable steps and to be patient with yourself along the way. Setting clear goals and tracking your daily progress can keep you motivated. Don't give up if you slip up occasionally — what truly matters is that you keep on trying.`
  },

  // ── 日常会話 追加 ─────────────────────────────────────────────────────────
  {
    id: 111, category: 'daily', title: 'Apologizing to a Friend', titleJa: '友人への謝罪',
    text: `A: Hey, I wanted to say I'm really sorry about what happened last weekend. I shouldn't have said what I said.
B: I appreciate you saying that. Honestly, I was pretty upset at the time, but I've had a chance to think it over.
A: I was stressed about work, but that's no excuse. You didn't deserve to be treated that way.
B: I understand. We all have rough days. I accept your apology — let's just move forward.`
  },
  {
    id: 112, category: 'daily', title: 'Describing Your Neighborhood', titleJa: '近所の紹介',
    text: `I live in a quiet residential area about twenty minutes from the city center. There's a small park just around the corner where I walk every evening. The neighbors are friendly, and there's a genuine sense of community here. We even have a local farmer's market every Sunday morning, which is one of my favorite things about living in this area. The only downside is that public transport could be better, so I usually drive to work.`
  },
  {
    id: 113, category: 'daily', title: 'Asking for a Favor', titleJa: 'お願いをする',
    text: `A: I hate to ask, but would you be able to help me move some furniture this Saturday?
B: Sure, I'd be happy to help. What time are you thinking?
A: Around ten in the morning, if that works for you. It shouldn't take more than a couple of hours.
B: That's fine. Just send me your address and I'll be there. Do you need help with anything else?`
  },
  {
    id: 114, category: 'daily', title: 'Childhood Memories', titleJa: '子供の頃の思い出',
    text: `One of my fondest memories from childhood is spending summers at my grandparents' house in the countryside. We would wake up early, help with the vegetable garden, and spend the afternoons exploring the fields and forests nearby. In the evenings, my grandmother would make a big home-cooked dinner for the whole family. Those simple moments taught me to slow down and appreciate the little things in life.`
  },
  {
    id: 115, category: 'daily', title: 'Planning a Surprise Party', titleJa: 'サプライズパーティーの計画',
    text: `A: I'm thinking of throwing a surprise birthday party for Kenji next Friday. Can you help me plan it?
B: I'd love to! How many people are you planning to invite?
A: Around fifteen to twenty close friends. I was thinking of renting the private room at that Italian place downtown.
B: That sounds perfect. I can handle the decorations if you take care of the invitations and the cake.`
  },
  {
    id: 116, category: 'daily', title: 'Trying a New Café', titleJa: '新しいカフェ',
    text: `A: Have you tried that new coffee shop that opened near the station?
B: Not yet — I keep walking past it but haven't had the chance to go in. Is it any good?
A: It's wonderful, actually. The coffee is excellent and the atmosphere is really cozy. They have big windows and comfortable armchairs.
B: That sounds lovely. I need a quiet place to work remotely sometimes. Maybe we could go together this weekend?`
  },
  {
    id: 117, category: 'daily', title: 'Getting a Haircut', titleJa: '散髪',
    text: `A: How would you like your hair cut today?
B: I'd like it a bit shorter on the sides, and just a trim on top. Maybe take about three centimeters off.
A: Would you like to keep the same style, or are you thinking of something different?
B: The same style is fine. Oh, and could you also neaten up the back? It's been getting quite long.`
  },
  {
    id: 118, category: 'daily', title: 'Talking About Pets', titleJa: 'ペットの話',
    text: `A: You have a dog, don't you? What breed is it?
B: Yes! He's a golden retriever named Maple. He just turned two years old.
A: Oh, how lovely. Are they high-maintenance dogs?
B: They need quite a bit of exercise and attention, but the love and joy they bring makes it completely worth it.`
  },
  {
    id: 119, category: 'daily', title: 'The Daily Commute', titleJa: '毎日の通勤',
    text: `My commute to work takes about forty-five minutes each way. I take the subway to the main station, then walk ten minutes to the office. At first I found it exhausting, but over time I've learned to enjoy it. I use the time to listen to podcasts or audiobooks, so it's actually become one of my favorite parts of the day. Sometimes I even look forward to that quiet time before the workday begins.`
  },
  {
    id: 120, category: 'daily', title: 'Moving to a New Place', titleJa: '引っ越し',
    text: `Last month I moved into a new apartment, and while the experience was stressful, I'm so glad I did it. My new place is smaller than before, but it's much closer to work and surrounded by great cafes, restaurants, and a large park. The hardest part was getting rid of things I'd been holding onto for years. In the end, simplifying my belongings made me feel lighter and more organized. I highly recommend a good clear-out every now and then.`
  },

  // ── 旅行・移動 追加 ───────────────────────────────────────────────────────
  {
    id: 211, category: 'travel', title: 'Hotel Check-Out', titleJa: 'ホテルのチェックアウト',
    text: `A: Good morning. I'd like to check out of room 412, please.
B: Of course. How was your stay?
A: Very pleasant, thank you. Could I get a printed receipt for my records?
B: Certainly. Were there any charges from the minibar or room service?
A: Just a bottle of water from the minibar. Otherwise everything should already be on my card.`
  },
  {
    id: 212, category: 'travel', title: 'Ordering Food Abroad', titleJa: '海外でのレストラン注文',
    text: `A: Excuse me, could I have a look at the menu, please?
B: Of course, here you go. Are you ready to order, or do you need a few more minutes?
A: I think I'm ready. I'll have the grilled fish with a side salad and a glass of sparkling water.
B: Excellent choice. Would you like to start with any soup or appetizer today?
A: No, thank you. The main course will be plenty.`
  },
  {
    id: 213, category: 'travel', title: 'Buying Souvenirs', titleJa: 'お土産を買う',
    text: `A: Excuse me, how much is this handmade scarf?
B: That one is thirty euros. It's hand-woven using traditional local techniques.
A: It's beautiful. Do you offer a discount if I buy two?
B: For two pieces I can give you a ten percent discount. That would bring the total to fifty-four euros.`
  },
  {
    id: 214, category: 'travel', title: 'Getting Around by Bus', titleJa: 'バスでの移動',
    text: `A: Excuse me, does this bus go to the old town area?
B: Yes, it stops right in front of the main square. It's about a fifteen-minute ride from here.
A: Perfect. How much is the fare?
B: It's two euros fifty per journey. You can pay with coins or tap your card at the reader when you board.`
  },
  {
    id: 215, category: 'travel', title: 'At Immigration', titleJa: '入国審査',
    text: `A: Could you state the purpose of your visit, please?
B: I'm here for tourism. I plan to stay for ten days.
A: Do you have a return ticket and proof of accommodation?
B: Yes, here is my e-ticket and hotel booking confirmation.
A: Everything looks fine. Enjoy your stay.`
  },
  {
    id: 216, category: 'travel', title: 'Traveling Solo', titleJa: '一人旅',
    text: `Traveling alone for the first time can feel a little daunting, but it's one of the most rewarding experiences you'll ever have. You're completely free to follow your own schedule, change your plans at a moment's notice, and connect with people you'd never have met otherwise. I've found that solo travelers tend to be more open to new experiences and conversations. The key is to stay aware of your surroundings, trust your instincts, and embrace the unexpected moments that make travel so memorable.`
  },
  {
    id: 217, category: 'travel', title: 'Dealing with a Flight Delay', titleJa: 'フライトの遅延',
    text: `A: Excuse me, our flight to Rome has been delayed by three hours. Is there anything you can do for us?
B: I'm terribly sorry for the inconvenience. We can offer you meal vouchers to use at any of the airport restaurants.
A: That's helpful. What about our connecting flight? We'll almost certainly miss it.
B: If you do miss your connection, please come to our service desk on arrival and we'll rebook you at no extra charge.`
  },
  {
    id: 218, category: 'travel', title: 'Train Station Enquiry', titleJa: '駅の案内',
    text: `A: Hi, I'd like to get to Edinburgh from London today. What's my best option?
B: The fastest route is the direct train from King's Cross. The journey takes between four and five hours.
A: And how often do the trains run?
B: There's a train roughly every hour. I'd recommend booking in advance to get a cheaper fare.`
  },
  {
    id: 219, category: 'travel', title: 'Road Trip Planning', titleJa: 'ロードトリップの計画',
    text: `There's something uniquely liberating about a road trip. Last summer, a friend and I drove along the coast for five days, stopping wherever looked interesting. We found hidden beaches, tiny fishing villages, and amazing roadside restaurants you'd never find on a travel website. The key to a great road trip is staying flexible — have a rough route in mind, but leave plenty of room for detours and spontaneous discoveries.`
  },
  {
    id: 220, category: 'travel', title: 'Eco-Friendly Travel', titleJa: 'エコな旅行',
    text: `More and more travelers are thinking carefully about the environmental impact of their trips. Simple choices like taking the train instead of flying for shorter distances, staying in locally-owned guesthouses, and avoiding single-use plastics can make a real difference. I've started offsetting my carbon footprint when I do have to fly, and I always bring a reusable bag and water bottle wherever I go. Responsible travel doesn't mean giving up great experiences — it just means being more thoughtful about how you have them.`
  },

  // ── 仕事・ビジネス 追加 ───────────────────────────────────────────────────
  {
    id: 311, category: 'work', title: 'Giving Feedback', titleJa: 'フィードバックを伝える',
    text: `A: Do you have a moment? I'd like to share some feedback on the report you submitted yesterday.
B: Of course, go ahead. I'm always looking for ways to improve.
A: Overall the content is strong and the analysis is thorough. I'd just suggest making the executive summary a bit more concise — around half a page.
B: That's really helpful. I tend to over-explain things. I'll revise it before the end of the day.`
  },
  {
    id: 312, category: 'work', title: 'Technical Issues on a Call', titleJa: '通話中の技術的トラブル',
    text: `A: Sorry everyone, I think there's an echo on the line. Can you all hear me clearly?
B: We can hear you, but the audio is cutting in and out a little.
A: Let me disconnect and rejoin. One moment, please.
B: No problem. While we wait, everyone feel free to review page three of the handout.`
  },
  {
    id: 313, category: 'work', title: 'Setting Daily Priorities', titleJa: '仕事の優先順位',
    text: `One skill that has made a huge difference in my career is learning how to prioritize effectively. At the start of each day, I write down the three most important tasks I need to complete, and I focus on those before anything else. It sounds simple, but when your inbox is full and everyone seems to need something urgently, having a clear list of priorities keeps you grounded. I also try to protect at least ninety minutes of uninterrupted time in the morning for deep, focused work.`
  },
  {
    id: 314, category: 'work', title: 'Discussing a Project Deadline', titleJa: 'プロジェクトの締め切り',
    text: `A: I wanted to flag that we might not be able to hit the original deadline for the Johnson project.
B: What's the issue? I thought we were on track.
A: We mostly are, but we're waiting on some data from the client that's running late.
B: I see. Let's request a one-week extension and keep the client informed. I'll send them an email today.`
  },
  {
    id: 315, category: 'work', title: 'Onboarding a New Team Member', titleJa: '新メンバーの受け入れ',
    text: `A: Welcome to the team! How was your first morning?
B: Really good, thanks. Everyone has been very welcoming. There's a lot to take in, but I'm excited.
A: That's completely normal at first. Don't hesitate to ask questions — no question is too basic here.
B: I appreciate that. Could you walk me through the project management tool you use? I haven't worked with it before.`
  },
  {
    id: 316, category: 'work', title: 'Managing Your Email Inbox', titleJa: 'メールの管理',
    text: `If you feel overwhelmed by email, you're not alone. The average professional spends nearly a third of their working day reading and responding to messages. One strategy that has worked for me is checking email only at set times — usually three times a day — rather than responding every time a notification appears. I also use folders and labels to stay organized, and I apply the two-minute rule: if a message takes less than two minutes to respond to, I deal with it immediately.`
  },
  {
    id: 317, category: 'work', title: 'Negotiating a Contract', titleJa: '契約の交渉',
    text: `A: We've reviewed your proposal and we're very interested, but the timeline feels a little tight for our team.
B: I understand your concern. What would be a more comfortable timeframe?
A: We'd need at least twelve weeks from the contract signing date.
B: That's workable from our side. If we can agree on that, I think we're ready to move forward.`
  },
  {
    id: 318, category: 'work', title: 'After a Presentation', titleJa: 'プレゼン後の振り返り',
    text: `A: You did a great job with the presentation today. The audience was really engaged.
B: Thank you! I was pretty nervous at first, but once I got into it I started to relax.
A: You handled the questions at the end very well, especially the tough one about the budget.
B: That one caught me off guard, but I've learned to stay calm and be honest when I don't have all the answers right away.`
  },
  {
    id: 319, category: 'work', title: 'Professional Development', titleJa: 'キャリア開発',
    text: `Investing in your own professional development is one of the best things you can do for your long-term career. Whether it's attending industry conferences, completing an online course, or finding a mentor, each step builds your skills and expands your network. I try to set aside at least one hour a week for learning — reading industry articles, watching webinars, or practicing a new skill. Over time, these small consistent efforts add up to significant growth.`
  },
  {
    id: 320, category: 'work', title: 'Resigning Professionally', titleJa: '退職の伝え方',
    text: `A: I wanted to speak with you privately. I've decided to resign from my position, effective next month.
B: I'm sorry to hear that. This is unexpected. May I ask what's driving the decision?
A: I've received an offer that aligns more closely with where I want to take my career. It wasn't an easy decision.
B: I understand, and I respect that. You've been a valuable member of this team and I wish you all the best.`
  },

  // ── 健康・生活 追加 ───────────────────────────────────────────────────────
  {
    id: 411, category: 'health', title: 'Starting Yoga', titleJa: 'ヨガを始める',
    text: `A: I've just started doing yoga. Have you ever tried it?
B: Yes, I've been practicing for about two years. I find it really helps with both flexibility and stress relief.
A: That's exactly what I'm hoping for. Do you recommend any particular style for beginners?
B: Hatha yoga is great for beginners — it's slower-paced and focuses on the fundamentals of breathing and alignment.`
  },
  {
    id: 412, category: 'health', title: 'Reducing Screen Time', titleJa: 'スクリーンタイムを減らす',
    text: `Over the past year, I've become increasingly aware of how much time I spend looking at screens. Between work, social media, and streaming, it was adding up to well over ten hours a day. I decided to set some clear boundaries: no phone for the first hour after waking up, and no screens after nine in the evening. The change was difficult at first, but now I sleep much better, feel more present in conversations, and actually have time for hobbies I'd abandoned.`
  },
  {
    id: 413, category: 'health', title: 'Sticking to Healthy Habits', titleJa: '健康習慣を続けるコツ',
    text: `A: I always start the week with good intentions, but by Wednesday I've slipped back into old habits.
B: I know that feeling. What seems to be the hardest part for you?
A: Keeping up with meal prep and exercise when work gets busy. There's just never enough time.
B: Try treating those things like appointments you can't cancel. Schedule them in your calendar, even if it's just thirty minutes.`
  },
  {
    id: 414, category: 'health', title: 'Discussing Allergies', titleJa: 'アレルギーの相談',
    text: `A: I've been experiencing itchy eyes and a runny nose almost every day for the past few weeks.
B: Those are classic signs of seasonal allergies. Has anything changed in your environment recently?
A: We did get a new cat. Could that be related?
B: It's very possible. I'd suggest allergy testing to identify the exact cause. In the meantime, an over-the-counter antihistamine should help relieve your symptoms.`
  },
  {
    id: 415, category: 'health', title: 'The Benefits of Walking', titleJa: 'ウォーキングの効果',
    text: `Walking is one of the most underestimated forms of exercise. Studies have shown that thirty minutes of brisk walking a day can significantly reduce the risk of heart disease, improve mood, and boost energy levels. The best part is that it requires no equipment, no gym membership, and can be done almost anywhere. I've made a habit of getting off the train one stop early and walking the rest of the way. It's a small change, but the cumulative benefits have been remarkable.`
  },
  {
    id: 416, category: 'health', title: 'Improving Your Posture', titleJa: '姿勢の改善',
    text: `A: My back has been really aching lately. I think it's from sitting at my desk all day.
B: That's really common. Have you looked at how your workstation is set up?
A: Not really. I just use whatever chair and desk are available.
B: That could be the problem. Your screen should be at eye level and your chair should support your lower back. Even small adjustments can make a big difference.`
  },
  {
    id: 417, category: 'health', title: 'Staying Hydrated', titleJa: '水分補給の大切さ',
    text: `Many people underestimate the importance of drinking enough water throughout the day. Even mild dehydration can cause fatigue, difficulty concentrating, and headaches. The general recommendation is about eight glasses of water per day, though this varies depending on body size and activity level. I keep a large water bottle on my desk as a constant reminder, and I've replaced my afternoon coffee with herbal tea. My energy levels have stabilized significantly as a result.`
  },
  {
    id: 418, category: 'health', title: 'Recovering from an Injury', titleJa: 'けがからの回復',
    text: `A: How's your knee holding up? You were limping last week.
B: It's getting better, thanks. I've been doing the physiotherapy exercises every morning.
A: That's good to hear. Are you able to get back to running yet?
B: Not quite. The physio says I need another two to three weeks of rest before I can gradually start again. It's frustrating, but I don't want to risk making it worse.`
  },
  {
    id: 419, category: 'health', title: 'Healthy Aging', titleJa: '健康的に年齢を重ねる',
    text: `Staying healthy as we age requires a proactive and consistent approach. Regular physical activity, a balanced diet, good sleep, and staying socially connected all play a crucial role in maintaining both physical and mental well-being. Research shows that people who stay engaged with their community and continue learning new skills tend to have sharper minds and a greater sense of purpose as they get older. It's never too late to start making positive changes.`
  },
  {
    id: 420, category: 'health', title: 'Cutting Down on Sugar', titleJa: '砂糖を控える',
    text: `A: I've been trying to cut sugar out of my diet, but I keep craving sweet things in the afternoon.
B: That's really common. Your blood sugar might be dipping, which triggers the cravings.
A: So what should I do about it?
B: Try having a protein-rich snack like nuts or yogurt in the mid-afternoon. That helps stabilize your blood sugar and keeps the cravings at bay.`
  },

  // ── 社会・文化 ────────────────────────────────────────────────────────────────
  {
    id: 501, category: 'culture', title: 'Climate Change Discussion', titleJa: '気候変動の議論',
    text: `A: Climate change is becoming more and more visible in our everyday lives, don't you think?
B: Absolutely. The weather patterns have changed so dramatically over the past decade alone.
A: What do you think ordinary individuals can do to actually make a difference?
B: Even small actions like reducing plastic use, choosing public transportation, and cutting back on meat consumption can have a real and meaningful impact.`
  },
  {
    id: 502, category: 'culture', title: 'Social Media and Society', titleJa: 'SNSと社会',
    text: `Social media has fundamentally changed the way we communicate, share information, and even form our sense of identity. While it has made it easier to stay connected with people around the world, it has also introduced new challenges such as the spread of misinformation and cyberbullying. I think the key is to use social media mindfully and critically, rather than just passively scrolling through your feed. It's a powerful tool, and like any tool, its impact depends entirely on how we choose to use it.`
  },
  {
    id: 503, category: 'culture', title: 'Cultural Differences', titleJa: '文化の違い',
    text: `A: Have you noticed many cultural differences since you moved to a new country?
B: Definitely. The way people greet each other and express respect is very different from what I grew up with.
A: Could you give me a specific example?
B: Sure. In my home country, we always bow slightly when greeting someone older or in a position of authority. Here, a firm handshake and direct eye contact is the standard greeting.`
  },
  {
    id: 504, category: 'culture', title: 'The Value of Volunteering', titleJa: 'ボランティア活動',
    text: `I've been volunteering at a local food bank every other Saturday for the past year, and it's one of the most meaningful things I do. It only takes a few hours of my time each visit, but the impact on the families we help is genuinely significant. Many people depend on the food bank to get through difficult periods in their lives. Volunteering has given me a new and humbling perspective on what truly matters and made me feel deeply connected to my local community.`
  },
  {
    id: 505, category: 'culture', title: 'Online vs. Classroom Learning', titleJa: 'オンライン学習 vs 対面学習',
    text: `A: Do you think online learning can really be as effective as traditional classroom education?
B: I think it really depends on the individual learner and their learning style. Some people thrive in a self-directed online environment.
A: That's true. But I still believe most students benefit greatly from face-to-face interaction with teachers and classmates.
B: I agree. The ideal solution is probably a thoughtful combination of both approaches.`
  },
  {
    id: 506, category: 'culture', title: 'Living Abroad', titleJa: '海外生活',
    text: `Spending an extended period of time living abroad is one of the most powerful ways to grow as a person. You're constantly exposed to different languages, customs, and ways of thinking that challenge your most deeply held assumptions. Even when you face real difficulties like language barriers or homesickness, these experiences build remarkable resilience and a deeper sense of empathy. Many people say that living in a foreign country was the single most transformative experience of their entire lives.`
  },
  {
    id: 507, category: 'culture', title: 'Technology and Privacy', titleJa: 'テクノロジーとプライバシー',
    text: `A: Don't you find it a little unsettling how much personal data companies collect about us?
B: Honestly, yes. Every app we download seems to want access to our location, contacts, and camera.
A: Exactly. I've started reading the terms and conditions much more carefully before clicking "agree."
B: That's a really good habit to develop. Most people just click through without thinking twice about what they're agreeing to.`
  },
  {
    id: 508, category: 'culture', title: 'The Power of Learning Languages', titleJa: '外国語を学ぶ意義',
    text: `Learning a foreign language opens up a remarkable world of opportunities. Not only does it allow you to communicate with a far wider range of people, but it also gives you a deeper and more nuanced understanding of different cultures and ways of thinking. Research has consistently shown that bilingual people tend to perform better at problem-solving and multitasking. It's truly never too late to start — even a basic level of a new language can make a huge and meaningful difference when you travel or work internationally.`
  },
  {
    id: 509, category: 'culture', title: 'Sustainable Living', titleJa: 'サステナブルな生活',
    text: `A: I've been making a real effort to live more sustainably lately. Have you made any changes in your life?
B: Yes! I've started composting my food waste and I always carry a reusable water bottle and shopping bags.
A: Those are such great steps. I've also been trying to buy locally grown produce when I can.
B: Exactly. Every small action genuinely counts when it comes to protecting the environment for future generations.`
  },
  {
    id: 510, category: 'culture', title: 'Artificial Intelligence in Daily Life', titleJa: 'AIと日常生活',
    text: `Artificial intelligence is already deeply woven into our everyday lives, from the voice assistants on our smartphones to the recommendation algorithms that shape what we watch and read online. While AI brings incredible benefits in fields like healthcare, education, and transportation, it also raises urgent questions about privacy, employment, and who is ultimately responsible for the decisions these systems make. As these technologies continue to develop at a rapid pace, it's vital for society to have open and honest conversations about how they should be used, governed, and regulated.`
  },

  // ── 社会・文化 追加 ───────────────────────────────────────────────────────
  {
    id: 511, category: 'culture', title: 'Talking About Art', titleJa: 'アートについて',
    text: `A: Did you get a chance to visit the special exhibition at the modern art museum?
B: I went last Sunday. Some of the pieces were truly thought-provoking, though I'll admit I didn't understand all of it.
A: I think that's part of the point. Art doesn't always have to be immediately understood to be meaningful.
B: That's a good way to look at it. I ended up standing in front of one painting for almost twenty minutes, just thinking.`
  },
  {
    id: 512, category: 'culture', title: 'The Future of Work', titleJa: '仕事の未来',
    text: `The way we work is changing faster than at any point in recent history. Automation and artificial intelligence are reshaping entire industries, while remote work has permanently altered our expectations of where and how we do our jobs. At the same time, there is a growing recognition that meaningful work isn't just about salary — people increasingly want flexibility, purpose, and a healthy work-life balance. The challenge for both companies and individuals is to adapt quickly while holding onto the things that make work genuinely rewarding.`
  },
  {
    id: 513, category: 'culture', title: 'Gender Equality', titleJa: 'ジェンダー平等',
    text: `A: Do you think there's been real progress in gender equality in the workplace over the past decade?
B: Some, yes. But the gap is still significant, especially at senior levels. There's still a long way to go.
A: What do you think makes the biggest difference?
B: I think it comes down to visible leadership — when people see women in senior roles, it sends a powerful message about what's possible.`
  },
  {
    id: 514, category: 'culture', title: 'The Role of Music', titleJa: '音楽の役割',
    text: `Music is one of the most universal forms of human expression. Across every culture and throughout all of recorded history, people have used music to celebrate, grieve, worship, and connect with one another. What fascinates me most is how music can cross language barriers and create an immediate emotional response in a listener, even if they've never heard that style before. In many ways, music reflects who we are as a society — the genres that rise and fall in popularity often mirror the values and anxieties of their time.`
  },
  {
    id: 515, category: 'culture', title: 'Local vs Global Culture', titleJa: 'ローカル文化とグローバル化',
    text: `A: Sometimes I worry that local cultures are losing their uniqueness as the world becomes more globalized.
B: I understand that concern. But I also think globalization can help preserve cultures by giving them a wider audience.
A: That's an interesting point. I suppose it depends on whether communities have the economic means to sustain their traditions.
B: Exactly. When local artisans, musicians, and storytellers can make a living, their traditions have a real chance of surviving.`
  },
  {
    id: 516, category: 'culture', title: 'Education for the Future', titleJa: '未来の教育',
    text: `The purpose of education is evolving. In a world where information is freely available to anyone with an internet connection, simply memorizing facts is no longer enough. The skills that matter most today — critical thinking, creativity, collaboration, and adaptability — are harder to measure but far more valuable in the long run. I believe schools and universities need to shift their focus toward helping students learn how to learn, how to question, and how to work effectively with others.`
  },
  {
    id: 517, category: 'culture', title: 'Minimalism and Consumer Culture', titleJa: 'ミニマリズムと消費文化',
    text: `A: I've been thinking about buying less and focusing on experiences rather than things. Have you ever tried minimalism?
B: Actually, yes. I decluttered my apartment last year and donated about half my belongings. It was surprisingly liberating.
A: Did you find it difficult? I have a tendency to hold on to things "just in case."
B: That's the hardest part. But once you realize you haven't missed most of what you got rid of, it becomes much easier to let go.`
  },
  {
    id: 518, category: 'culture', title: 'The Value of Literature', titleJa: '文学の価値',
    text: `Reading great literature is one of the most effective ways to develop empathy and broaden your understanding of the world. When we follow a character through difficult decisions, foreign landscapes, or unfamiliar time periods, we develop a richer view of human experience. Studies have shown that people who read fiction regularly tend to be better at understanding others' emotions and perspectives. In a world that often feels increasingly divided, the habit of reading — and truly listening to other voices — feels more important than ever.`
  },
  {
    id: 519, category: 'culture', title: 'Discussing Immigration', titleJa: '移民について',
    text: `A: Immigration is such a complex and often divisive topic, isn't it?
B: It is. I think the debate often gets oversimplified — people forget that behind the statistics, there are real individuals and families.
A: Exactly. My parents immigrated here thirty years ago. They built a life here and contributed so much to this community.
B: That's a perspective that often gets lost. Understanding personal stories can really change how people think about the issue.`
  },
  {
    id: 520, category: 'culture', title: 'The Rise of Remote Work', titleJa: 'リモートワークの普及',
    text: `The shift to remote work has been one of the most significant changes in working life of the past generation. For many people, it has offered a better work-life balance, more flexibility, and the freedom to live wherever they choose. But it has also brought new challenges — feelings of isolation, the blurring of boundaries between work and home life, and the loss of spontaneous collaboration that happens naturally in an office. The most successful companies will be those that trust their employees and build cultures that thrive both in person and online.`
  },

];
