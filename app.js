(() => {
  "use strict";

  const STORAGE_KEY = "water-tracker-data-v1";
  const QUICK_CUPS = [150, 250, 300, 500];
  const EXERCISE_KEYS = ["walk", "fastwalk", "jog", "run", "lift", "swim", "cycle", "ball", "yoga", "other"];
  const MEAL_KEYS = ["breakfast", "lunch", "dinner", "late", "snack"];
  const TIMER_PRESETS = [30, 45, 50, 60, 90];
  const DEFAULT_TIMER = 50;
  const LANG_OPTIONS = ["zh", "en", "ja"];

  const I18N_Z = {
    appName: "喝水追蹤",
    today: "今天",
    tabWater: "水",
    tabExercise: "運動",
    tabDiet: "飲食",
    tabStats: "統計",
    goal: "目標",
    goalHit: "目標達成!",
    leftMl: "還差 {x} ml",
    oneCup: "來一杯",
    customBtn: "自訂容量",
    undoBtn: "撤銷",
    mohwWeightRange: "衛福部建議(依體重 {w} kg): {low} - {high} ml",
    addedMl: "已加入 {ml} ml",
    undoneMl: "已撤銷 {ml} ml",
    timerTitle: "⏰ 久坐提醒",
    timerStart: "開始",
    timerPause: "暫停",
    timerReset: "重設",
    timerTip: "坐太久對脊椎和循環都不好,每 {n} 分鐘起來走走、倒杯水吧!",
    timerRunning: "正在計時 {n} 分鐘",
    timerDone: "時間到!",
    timerIdle: "未開始",
    timerSet: "久坐提醒設為 {n} 分鐘",
    timerPaused: "計時已暫停",
    timerStarted: "開始 {n} 分鐘久坐提醒",
    timerResetMsg: "計時已重設",
    snoozed: "稍後 5 分鐘提醒",
    titleRunning: "{time} 起來走走 · 喝水追蹤",
    waterChartTitle: "近 7 天喝水",
    kcalChartTitle: "近 7 天運動卡路里",
    dietChartTitle: "近 7 天飲食均衡",
    exTitle: "🏃 運動",
    exEmpty: "點上方標籤記錄今天的運動",
    exSummary: "{n} 項 · {m} 分鐘 · {k} kcal",
    exMinLabel: "{m} 分鐘",
    aboutKcal: "約 {k} kcal",
    onlyTodayEx: "只能新增今天的運動",
    exAdded: "已記錄 {type} {min} 分鐘 · 約 {kcal} kcal",
    ex333Hit: "運動333 達標!近 7 天已運動 {n} 次(每次 30 分鐘以上)。運動時心跳每分鐘達 130 下更有效。",
    ex333Miss: "運動333:近 7 天 {n}/3 次,再 {left} 次達標(每週 3 次、每次 30 分鐘、心跳 130 下)。",
    weightHint: "(未設定體重,卡路里以 60kg 估算)",
    exTypeLabel: "運動類型",
    exMinInputLabel: "時間 (分鐘)",
    addExTitle: "新增運動",
    saveBtn: "紀錄",
    exTypeRequired: "請輸入運動類型",
    exMinInvalid: "請輸入有效分鐘數(1-600)",
    mealLabelRequired: "請輸入分類",
    "ex.walk": "散步",
    "ex.fastwalk": "健走",
    "ex.jog": "慢跑",
    "ex.run": "跑步",
    "ex.lift": "重訓",
    "ex.swim": "游泳",
    "ex.cycle": "騎車",
    "ex.ball": "球類",
    "ex.yoga": "瑜珈",
    "ex.other": "其他",
    mealTitle: "🍽 飲食",
    mealEmpty: "點上方標籤記錄今天的飲食",
    mealSummary: "{n} 筆 · {c}/6 類",
    onlyTodayMeal: "只能新增今天的飲食",
    mealAdded: "已記錄 {label}",
    mealLabelLabel: "分類",
    mealNoteLabel: "內容",
    mealGroupLabel: "食物類別 (多選,用於均衡檢核)",
    addMealTitle: "記錄飲食",
    mealReminderDefault: "記錄飲食時勾選食物類別,自動檢核六大類是否均衡(衛福部建議:全穀雜糧/豆魚蛋肉/蔬菜/水果/乳品/油脂堅果)。",
    proteinHeavy: "你今天以蛋白質(肉類)為主,建議搭配澱粉與蔬菜,均衡飲食更能維持健康!",
    sugaryNote: "含糖飲料酌量飲用,多喝白開水對身體更好",
    dietGood: "六大類都攝取到了,均衡滿分!",
    dietGoodSugary: "不過含糖飲料還是酌量較好。",
    "fg.grains": "全穀雜糧",
    "fg.protein": "豆魚蛋肉",
    "fg.veggies": "蔬菜",
    "fg.fruit": "水果",
    "fg.dairy": "乳品",
    "fg.nuts": "油脂堅果",
    "fg.other": "其他",
    "remind.grains": "缺少澱粉(全穀雜糧):來點飯、麵、地瓜、玉米或燕麥吧",
    "remind.protein": "缺少豆魚蛋肉:補充蛋白質,維持肌肉與體力",
    "remind.veggies": "缺少蔬菜:記得吃青菜,補足膳食纖維",
    "remind.fruit": "缺少水果:飯後來份水果吧",
    "remind.dairy": "缺少乳品:喝杯牛奶或優格補鈣",
    "remind.nuts": "缺少油脂與堅果:適量堅果或好油,別完全不吃油",
    "meal.breakfast": "早餐",
    "meal.lunch": "午餐",
    "meal.dinner": "晚餐",
    "meal.late": "消夜",
    "meal.snack": "點心",
    statsTitle: "📊 統計報表",
    stats7: "近 7 天",
    stats30: "近 30 天",
    statsModeList: "列表",
    statsModeCal: "月曆",
    calPrev: "上個月",
    calNext: "下個月",
    calWater: "喝水達標",
    calEx: "有運動",
    calDiet: "有飲食",
    dailyAchieve: "逐日達成",
    statWaterTotal: "總飲水量",
    statGoalDays: "達成天數",
    statBestDay: "單日最高",
    statKcal: "運動卡路里",
    statTopType: "最常運動",
    statDiet: "飲食均衡",
    statNoRecord: "尚未記錄",
    statNoBest: "無記錄",
    achieveOk: "達標",
    achieveNot: "未達標",
    avgPerDay: "平均 {avg} ml/天",
    goalPerDay: "目標 {goal} ml/天",
    timesMin: "{n} 次 · {m} 分鐘",
    timesCount: "{n} 次",
    fullDays: "{n} 天六類全達成",
    achieveDetail: "水 {w} ml · 運動 {m} 分 · 飲食 {n} 筆",
    settingsTitle: "設定",
    goalModalTitle: "設定與衛福部建議",
    goalLabel: "每日目標 (ml)",
    weightLabel: "體重 (kg)",
    language: "語言",
    mohwNoteTitle: "衛福部建議",
    weightNone: "尚未輸入體重",
    weightInvalid: "輸入有效體重(20-300 kg)後顯示建議",
    weightSuggestionText: "依體重 {w} kg × 30-35 ml:建議 {low} - {high} ml(依活動量與天氣增減)",
    applySuggestion: "套用建議為每日目標",
    mohwRef: "成人每天至少 1,500 ml 開水(約 6-8 杯,每杯 240ml),可依體重、活動量與天氣增減。慢性疾病患者請諮詢醫師。",
    cancel: "取消",
    save: "儲存",
    goalInvalid: "請輸入 100-10000 ml",
    goalSaved: "每日目標設為 {v} ml",
    suggestionFilled: "已填入建議值,按儲存確認",
    customTitle: "自訂杯量",
    customAdd: "加入",
    customInvalid: "請輸入 10-5000 ml",
    alarmTitle: "⏰ 該起來走走了!",
    alarmMsg: "坐了好一陣子了,起身活動 5-10 分鐘,倒杯水、伸個懶腰、看看遠方吧!",
    snooze5: "稍後 5 分",
    restart: "重新開始",
    stop: "停止",
  };

  const I18N_E = {
    appName: "Water Tracker",
    today: "Today",
    tabWater: "Water",
    tabExercise: "Exercise",
    tabDiet: "Diet",
    tabStats: "Stats",
    goal: "Goal",
    goalHit: "Goal reached!",
    leftMl: "{x} ml to go",
    oneCup: "Add",
    customBtn: "Custom",
    undoBtn: "Undo",
    mohwWeightRange: "Recommended ({w} kg): {low} - {high} ml",
    addedMl: "Added {ml} ml",
    undoneMl: "Undone {ml} ml",
    timerTitle: "⏰ Sedentary Reminder",
    timerStart: "Start",
    timerPause: "Pause",
    timerReset: "Reset",
    timerTip: "Sitting too long is hard on your back and circulation. Every {n} min, get up, stretch and grab a drink!",
    timerRunning: "Counting {n} min",
    timerDone: "Time's up!",
    timerIdle: "Not started",
    timerSet: "Reminder set to {n} min",
    timerPaused: "Timer paused",
    timerStarted: "Started {n} min reminder",
    timerResetMsg: "Timer reset",
    snoozed: "Remind again in 5 min",
    titleRunning: "{time} Get moving · Water Tracker",
    waterChartTitle: "Water - Last 7 Days",
    kcalChartTitle: "Exercise kcal - Last 7 Days",
    dietChartTitle: "Diet Balance - Last 7 Days",
    exTitle: "🏃 Exercise",
    exEmpty: "Tap a tag above to log today's exercise",
    exSummary: "{n} items · {m} min · {k} kcal",
    exMinLabel: "{m} min",
    aboutKcal: "~{k} kcal",
    onlyTodayEx: "You can only log exercise for today",
    exAdded: "Logged {type} {min} min · ~{kcal} kcal",
    ex333Hit: "333 rule hit! You exercised {n} times in 7 days (30+ min each). Keep your heart rate around 130 bpm for best results.",
    ex333Miss: "333 rule: {n}/3 sessions in 7 days, {left} to go (3x/week, 30 min, 130 bpm).",
    weightHint: "(weight not set, kcal estimated at 60kg)",
    exTypeLabel: "Exercise Type",
    exMinInputLabel: "Duration (min)",
    addExTitle: "Add Exercise",
    saveBtn: "Save",
    exTypeRequired: "Enter an exercise type",
    exMinInvalid: "Enter a valid duration (1-600)",
    mealLabelRequired: "Enter a category",
    "ex.walk": "Walk",
    "ex.fastwalk": "Brisk Walk",
    "ex.jog": "Jog",
    "ex.run": "Run",
    "ex.lift": "Weights",
    "ex.swim": "Swim",
    "ex.cycle": "Cycling",
    "ex.ball": "Ball",
    "ex.yoga": "Yoga",
    "ex.other": "Other",
    mealTitle: "🍽 Diet",
    mealEmpty: "Tap a tag above to log today's meals",
    mealSummary: "{n} entries · {c}/6 groups",
    onlyTodayMeal: "You can only log meals for today",
    mealAdded: "Logged {label}",
    mealLabelLabel: "Category",
    mealNoteLabel: "Details",
    mealGroupLabel: "Food groups (multi-select for balance check)",
    addMealTitle: "Log Meal",
    mealReminderDefault: "Check food groups when logging to check balance across the six food groups (grains / protein / vegetables / fruit / dairy / nuts & oils).",
    proteinHeavy: "You focused on protein today - pair it with grains and veggies for a balanced diet!",
    sugaryNote: "Limit sugary drinks and prefer plain water",
    dietGood: "All six food groups covered - perfectly balanced!",
    dietGoodSugary: "Still, go easy on sugary drinks.",
    "fg.grains": "Grains",
    "fg.protein": "Protein",
    "fg.veggies": "Vegetables",
    "fg.fruit": "Fruit",
    "fg.dairy": "Dairy",
    "fg.nuts": "Nuts & Oils",
    "fg.other": "Other",
    "remind.grains": "Missing grains: add rice, noodles, sweet potato, corn or oats",
    "remind.protein": "Missing protein: add beans, fish, eggs or meat for muscle & energy",
    "remind.veggies": "Missing vegetables: add some greens for fiber",
    "remind.fruit": "Missing fruit: enjoy a piece of fruit after a meal",
    "remind.dairy": "Missing dairy: drink milk or yogurt for calcium",
    "remind.nuts": "Missing nuts & oils: add a few nuts or healthy fats",
    "meal.breakfast": "Breakfast",
    "meal.lunch": "Lunch",
    "meal.dinner": "Dinner",
    "meal.late": "Late Snack",
    "meal.snack": "Snack",
    statsTitle: "📊 Statistics",
    stats7: "Last 7 Days",
    stats30: "Last 30 Days",
    statsModeList: "List",
    statsModeCal: "Calendar",
    calPrev: "Previous month",
    calNext: "Next month",
    calWater: "Water goal hit",
    calEx: "Exercise",
    calDiet: "Meals",
    dailyAchieve: "Daily Progress",
    statWaterTotal: "Total Water",
    statGoalDays: "Goal Days",
    statBestDay: "Best Day",
    statKcal: "Exercise kcal",
    statTopType: "Top Exercise",
    statDiet: "Diet Balance",
    statNoRecord: "Not recorded",
    statNoBest: "No record",
    achieveOk: "Hit",
    achieveNot: "Miss",
    avgPerDay: "Avg {avg} ml/day",
    goalPerDay: "Goal {goal} ml/day",
    timesMin: "{n} sessions · {m} min",
    timesCount: "{n} times",
    fullDays: "{n} days fully balanced",
    achieveDetail: "Water {w} ml · Exercise {m} min · Meals {n}",
    settingsTitle: "Settings",
    goalModalTitle: "Settings & MOHW Guide",
    goalLabel: "Daily Goal (ml)",
    weightLabel: "Weight (kg)",
    language: "Language",
    mohwNoteTitle: "MOHW Recommendation",
    weightNone: "Weight not set",
    weightInvalid: "Enter a valid weight (20-300 kg) to see suggestions",
    weightSuggestionText: "Based on {w} kg × 30-35 ml: {low} - {high} ml (adjust by activity & weather)",
    applySuggestion: "Apply as daily goal",
    mohwRef: "Adults should drink at least 1,500 ml of water daily (about 6-8 cups of 240 ml), adjusted by weight, activity and weather. Consult a doctor if you have chronic conditions.",
    cancel: "Cancel",
    save: "Save",
    goalInvalid: "Enter 100-10000 ml",
    goalSaved: "Daily goal set to {v} ml",
    suggestionFilled: "Suggestion filled in - press Save to confirm",
    customTitle: "Custom Cup",
    customAdd: "Add",
    customInvalid: "Enter 10-5000 ml",
    alarmTitle: "⏰ Time to move!",
    alarmMsg: "You've been sitting a while. Stand up for 5-10 minutes, stretch, look far away and grab some water!",
    snooze5: "5 min later",
    restart: "Restart",
    stop: "Stop",
  };

  const I18N_J = {
    appName: "水分補給トラッカー",
    today: "今日",
    tabWater: "水分",
    tabExercise: "運動",
    tabDiet: "食事",
    tabStats: "統計",
    goal: "目標",
    goalHit: "目標達成!",
    leftMl: "あと {x} ml",
    oneCup: "＋1杯",
    customBtn: "カスタム",
    undoBtn: "取り消し",
    mohwWeightRange: "推奨(体重 {w} kg): {low} - {high} ml",
    addedMl: "{ml} ml 追加しました",
    undoneMl: "{ml} ml 取り消しました",
    timerTitle: "⏰ 座りっぱなしアラーム",
    timerStart: "開始",
    timerPause: "一時停止",
    timerReset: "リセット",
    timerTip: "座りっぱなしは腰や血行に良くありません。{n} 分ごとに立ち上がって水分補給しましょう!",
    timerRunning: "計測中 {n} 分",
    timerDone: "時間になりました!",
    timerIdle: "未開始",
    timerSet: "アラームを {n} 分に設定",
    timerPaused: "計測を一時停止しました",
    timerStarted: "{n} 分のアラームを開始しました",
    timerResetMsg: "計測をリセットしました",
    snoozed: "5分後に再度お知らせ",
    titleRunning: "{time} 動きましょう · 水分補給トラッカー",
    waterChartTitle: "水分(過去7日間)",
    kcalChartTitle: "運動カロリー(過去7日間)",
    dietChartTitle: "食事バランス(過去7日間)",
    exTitle: "🏃 運動",
    exEmpty: "上のタグをタップして今日の運動を記録",
    exSummary: "{n} 件 · {m} 分 · {k} kcal",
    exMinLabel: "{m} 分",
    aboutKcal: "約 {k} kcal",
    onlyTodayEx: "今日の運動のみ記録できます",
    exAdded: "{type} {min} 分を記録 · 約 {kcal} kcal",
    ex333Hit: "運動333達成!過去7日間で {n} 回(各30分以上)運動しました。運動中は心拍130/分を目安に。",
    ex333Miss: "運動333:過去7日間 {n}/3 回、あと {left} 回(週3回・各30分・心拍130/分)。",
    weightHint: "(体重未設定、カロリーは60kgで算出)",
    exTypeLabel: "運動タイプ",
    exMinInputLabel: "時間(分)",
    addExTitle: "運動を追加",
    saveBtn: "保存",
    exTypeRequired: "運動タイプを入力してください",
    exMinInvalid: "有効な時間(1-600)を入力してください",
    mealLabelRequired: "分類を入力してください",
    "ex.walk": "散歩",
    "ex.fastwalk": "速歩",
    "ex.jog": "ジョギング",
    "ex.run": "ランニング",
    "ex.lift": "筋トレ",
    "ex.swim": "水泳",
    "ex.cycle": "サイクリング",
    "ex.ball": "球技",
    "ex.yoga": "ヨガ",
    "ex.other": "その他",
    mealTitle: "🍽 食事",
    mealEmpty: "上のタグをタップして今日の食事を記録",
    mealSummary: "{n} 件 · {c}/6 グループ",
    onlyTodayMeal: "今日の食事のみ記録できます",
    mealAdded: "{label} を記録",
    mealLabelLabel: "分類",
    mealNoteLabel: "内容",
    mealGroupLabel: "食品グループ(複数選択でバランス判定)",
    addMealTitle: "食事を記録",
    mealReminderDefault: "食事記録時に食品グループを選ぶと6大グループのバランスを自動判定します(穀類/豆魚卵肉/野菜/果物/乳製品/脂質ナッツ)。",
    proteinHeavy: "たんぱく質中心の食事ですね。穀類と野菜を合わせてバランス良く食べましょう!",
    sugaryNote: "糖分入り飲料は控えめに、水をしっかり飲みましょう",
    dietGood: "6大グループすべて摂取、バランス満点!",
    dietGoodSugary: "それでも糖分入り飲料は控えめに。",
    "fg.grains": "穀類",
    "fg.protein": "豆魚卵肉",
    "fg.veggies": "野菜",
    "fg.fruit": "果物",
    "fg.dairy": "乳製品",
    "fg.nuts": "脂質・ナッツ",
    "fg.other": "その他",
    "remind.grains": "穀類不足:ご飯、麺、さつまいも、とうもろこし、オートミールを",
    "remind.protein": "たんぱく質不足:豆、魚、卵、肉で筋肉と体力を",
    "remind.veggies": "野菜不足:食物繊維のため青菜を",
    "remind.fruit": "果物不足:食後に果物を",
    "remind.dairy": "乳製品不足:牛乳やヨーグルトでカルシウムを",
    "remind.nuts": "脂質・ナッツ不足:ナッツや良質な油を適量",
    "meal.breakfast": "朝食",
    "meal.lunch": "昼食",
    "meal.dinner": "夕食",
    "meal.late": "夜食",
    "meal.snack": "おやつ",
    statsTitle: "📊 統計",
    stats7: "過去7日",
    stats30: "過去30日",
    statsModeList: "一覧",
    statsModeCal: "カレンダー",
    calPrev: "前の月",
    calNext: "次の月",
    calWater: "水分目標達成",
    calEx: "運動あり",
    calDiet: "食事あり",
    dailyAchieve: "日別達成",
    statWaterTotal: "総飲水量",
    statGoalDays: "達成日数",
    statBestDay: "最多の日",
    statKcal: "運動カロリー",
    statTopType: "よくする運動",
    statDiet: "食事バランス",
    statNoRecord: "記録なし",
    statNoBest: "記録なし",
    achieveOk: "達成",
    achieveNot: "未達成",
    avgPerDay: "平均 {avg} ml/日",
    goalPerDay: "目標 {goal} ml/日",
    timesMin: "{n} 回 · {m} 分",
    timesCount: "{n} 回",
    fullDays: "{n} 日間全6グループ達成",
    achieveDetail: "水分 {w} ml · 運動 {m} 分 · 食事 {n} 件",
    settingsTitle: "設定",
    goalModalTitle: "設定と推奨量",
    goalLabel: "1日の目標 (ml)",
    weightLabel: "体重 (kg)",
    language: "言語",
    mohwNoteTitle: "政府の推奨",
    weightNone: "体重未設定",
    weightInvalid: "有効な体重(20-300 kg)を入力すると表示",
    weightSuggestionText: "体重 {w} kg × 30-35 ml:推奨 {low} - {high} ml(活動量・天候で調整)",
    applySuggestion: "推奨値を目標にする",
    mohwRef: "成人は1日1,500 ml以上の水(240ml×6-8杯)が目安。体重・活動量・天候に応じて調整。慢性疾患の方は医師に相談を。",
    cancel: "キャンセル",
    save: "保存",
    goalInvalid: "100-10000 ml を入力してください",
    goalSaved: "1日の目標を {v} ml に設定しました",
    suggestionFilled: "推奨値を入力しました。保存を押してください",
    customTitle: "カスタム量",
    customAdd: "追加",
    customInvalid: "10-5000 ml を入力してください",
    alarmTitle: "⏰ 立ち上がりましょう!",
    alarmMsg: "しばらく座っていました。5-10分動いて、水分を補給し、遠くを見ましょう!",
    snooze5: "5分後",
    restart: "再開",
    stop: "停止",
  };

  const I18N = { zh: I18N_Z, en: I18N_E, ja: I18N_J };

  function t(key, vars) {
    let s = (I18N[store.lang] && I18N[store.lang][key]) || I18N.zh[key] || key;
    if (vars) {
      for (const k of Object.keys(vars)) s = s.replace(new RegExp("\\{" + k + "\\}", "g"), vars[k]);
    }
    return s;
  }

  const MET = {
    散步: 3.0, Walk: 3.0, 散歩: 3.0, 走路: 3.0,
    健走: 4.3, "Brisk Walk": 4.3, 速歩: 4.3, 快走: 4.3,
    慢跑: 6.0, Jog: 6.0, ジョギング: 6.0,
    跑步: 8.0, Run: 8.0, ランニング: 8.0, 快跑: 9.8,
    重訓: 5.0, Weights: 5.0, 筋トレ: 5.0, 健身: 5.0,
    游泳: 7.0, Swim: 7.0, 水泳: 7.0,
    騎車: 6.0, Cycling: 6.0, サイクリング: 6.0, 單車: 6.0,
    球類: 5.5, Ball: 5.5, 球技: 5.5, 籃球: 6.5, 羽球: 5.5, 網球: 6.0, 排球: 4.0,
    瑜珈: 2.5, Yoga: 2.5, ヨガ: 2.5, 瑜伽: 2.5, 跳繩: 10.0,
    其他: 5.0, Other: 5.0, その他: 5.0,
  };

  const FOOD_GROUPS = {
    grains:  { color: "#f59e0b" },
    protein: { color: "#ef4444" },
    veggies: { color: "#22c55e" },
    fruit:   { color: "#eab308" },
    dairy:   { color: "#3b82f6" },
    nuts:    { color: "#a855f7" },
  };

  const store = {
    version: 3,
    goal: 2000,
    weight: null,
    lang: "zh",
    days: {},
    timer: { duration: DEFAULT_TIMER, deadline: null, running: false },
    statsN: 7,
    statsMode: "list",
  };

  function metOf(type) {
    return MET[type] || MET["其他"];
  }

  function computeKcal(type, min, weight) {
    return Math.round(metOf(type) * weight * min / 60);
  }

  function normalizeDay(day) {
    if (!day) return { total: 0, log: [], exercise: [], meals: [] };
    if (!Array.isArray(day.exercise)) day.exercise = [];
    if (!Array.isArray(day.meals)) day.meals = [];
    if (!Array.isArray(day.log)) day.log = [];
    if (typeof day.total !== "number") day.total = 0;
    day.exercise.forEach((e) => {
      if (typeof e.kcal !== "number") e.kcal = computeKcal(e.type, e.min, store.weight || 60);
    });
    day.meals.forEach((m) => {
      if (!Array.isArray(m.groups)) m.groups = [];
    });
    return day;
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          if (typeof parsed.goal === "number") store.goal = parsed.goal;
          if (typeof parsed.weight === "number") store.weight = parsed.weight;
          if (typeof parsed.lang === "string" && LANG_OPTIONS.includes(parsed.lang)) store.lang = parsed.lang;
          if (parsed.days) {
            store.days = {};
            for (const k of Object.keys(parsed.days)) store.days[k] = normalizeDay(parsed.days[k]);
          }
          if (parsed.timer && typeof parsed.timer === "object") {
            if (typeof parsed.timer.duration === "number") store.timer.duration = parsed.timer.duration;
            if (typeof parsed.timer.deadline === "number") store.timer.deadline = parsed.timer.deadline;
            if (parsed.timer.deadline > Date.now()) store.timer.running = true;
          }
          if (parsed.statsN === 7 || parsed.statsN === 30) store.statsN = parsed.statsN;
          if (parsed.statsMode === "list" || parsed.statsMode === "cal") store.statsMode = parsed.statsMode;
        }
      }
    } catch (_) {
      store.days = {};
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  function dateKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function dayRecord(key) {
    if (!store.days[key]) store.days[key] = { total: 0, log: [], exercise: [], meals: [] };
    return store.days[key];
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function weightSuggestionRange() {
    if (typeof store.weight !== "number" || !store.weight) return null;
    const low = Math.round((store.weight * 30) / 10) * 10;
    const high = Math.round((store.weight * 35) / 10) * 10;
    return { low, high };
  }

  function last7Days() {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d);
    }
    return days;
  }

  let selected = new Date();
  let calMonth = new Date();

  const $ = (id) => document.getElementById(id);

  const elDateLabel = $("dateLabel");
  const elWeekday = document.querySelector(".weekday-label");
  const elPrev = $("prevDay");
  const elNext = $("nextDay");
  const elWater = $("water");
  const elIntake = $("intakeAmount");
  const elGoal = $("goalText");
  const elFill = $("progressFill");
  const elPct = $("progressPct");
  const elGoalSuggestion = $("goalSuggestion");
  const elQuickGrid = $("quickGrid");
  const elUndo = $("undoBtn");
  const elChart = $("chart");
  const elChartKcal = $("chartKcal");
  const elChartDiet = $("chartDiet");
  const elDietLegend = $("dietLegend");
  const elExerciseChips = $("exerciseChips");
  const elExerciseSummary = $("exerciseSummary");
  const elExerciseList = $("exerciseList");
  const elRule333 = $("rule333");
  const elMealChips = $("mealChips");
  const elMealSummary = $("mealSummary");
  const elMealList = $("mealList");
  const elDietGroups = $("dietGroups");
  const elDietReminder = $("dietReminder");
  const elMealGroupChips = $("mealGroupChips");
  const elMealLabelChips = $("mealLabelChips");
  const elTimerDisplay = $("timerDisplay");
  const elTimerStart = $("timerStart");
  const elTimerReset = $("timerReset");
  const elTimerPresets = $("timerPresets");
  const elTimerHint = $("timerHint");
  const elStatsRange = $("statsRange");
  const elStatsModeToggle = $("statsModeToggle");
  const elStatGrid = $("statGrid");
  const elAchievementList = $("achievementList");
  const elCalendarView = $("calendarView");

  const DAY_MONTH = (d) => `${d.getMonth() + 1}/${d.getDate()}`;
  const WEEKDAY_LABEL = (d) => {
    const w = ["日", "一", "二", "三", "四", "五", "六"][d.getDay()];
    if (store.lang === "en") return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
    if (store.lang === "ja") return w + "曜日";
    return "星期" + w;
  };

  function render() {
    const key = dateKey(selected);
    const rec = store.days[key] || { total: 0, log: [], exercise: [], meals: [] };
    const total = rec.total;
    const pct = Math.min(100, Math.round((total / store.goal) * 100));

    const today = todayKey();
    const isToday = key === today;

    elDateLabel.textContent = DAY_MONTH(selected);
    elWeekday.textContent = isToday ? t("today") : WEEKDAY_LABEL(selected);
    elPrev.disabled = false;
    elNext.disabled = isToday;

    elIntake.textContent = total;
    elGoal.textContent = store.goal;
    elFill.style.width = pct + "%";
    elPct.textContent = pct + "%" + (pct >= 100 ? " " + t("goalHit") : " " + t("leftMl", { x: store.goal - total }));
    elWater.style.height = pct + "%";
    elUndo.disabled = rec.log.length === 0;

    const sugg = weightSuggestionRange();
    if (sugg) {
      elGoalSuggestion.style.display = "block";
      elGoalSuggestion.textContent = t("mohwWeightRange", { w: store.weight, low: sugg.low, high: sugg.high });
    } else {
      elGoalSuggestion.style.display = "none";
    }

    renderQuickGrid();
    renderExerciseChips();
    renderMealChips();
    renderChart();
    renderKcalChart();
    renderDietChart();
    renderExercise(rec);
    renderMeals(rec);
    renderDiet(rec);
    render333();
    renderTimer();
    renderStatsRange();
    renderStatsModeToggle();
    renderStats();
  }

  function renderQuickGrid() {
    elQuickGrid.innerHTML = "";
    for (const c of QUICK_CUPS) {
      const btn = document.createElement("button");
      btn.className = "quick-btn";
      btn.innerHTML = `${c} ml<small>${t("oneCup")}</small>`;
      btn.addEventListener("click", () => addWater(c));
      elQuickGrid.appendChild(btn);
    }
  }

  function addWater(ml, silent) {
    const key = dateKey(selected);
    if (key === todayKey()) {
      const rec = dayRecord(key);
      rec.total += ml;
      rec.log.push(ml);
      save();
    }
    render();
    if (!silent) toast(t("addedMl", { ml }));
  }

  function undo() {
    const key = dateKey(selected);
    const rec = store.days[key];
    if (rec && rec.log.length) {
      const ml = rec.log.pop();
      rec.total = Math.max(0, rec.total - ml);
      save();
      render();
      toast(t("undoneMl", { ml }));
    }
  }

  function renderChart() {
    const days = last7Days();
    const max = Math.max(store.goal, ...days.map((d) => (store.days[dateKey(d)] || {}).total || 0), 1);

    elChart.innerHTML = "";
    for (const d of days) {
      const key = dateKey(d);
      const rec = store.days[key];
      const val = rec ? rec.total : 0;
      const hit = val >= store.goal;

      const col = document.createElement("div");
      col.className = "chart-col";

      const value = document.createElement("div");
      value.className = "chart-value";
      value.textContent = val > 0 ? Math.round(val / 100) / 10 + " L" : "";

      const wrap = document.createElement("div");
      wrap.className = "chart-bar-wrap";
      const bar = document.createElement("div");
      bar.className = "chart-bar" + (hit ? " goal-hit" : "");
      bar.style.height = Math.max(2, (val / max) * 100) + "%";
      wrap.appendChild(bar);

      const dayLabel = document.createElement("div");
      dayLabel.className = "chart-day";
      dayLabel.textContent = DAY_MONTH(d);

      col.appendChild(value);
      col.appendChild(wrap);
      col.appendChild(dayLabel);
      elChart.appendChild(col);
    }
  }

  function renderKcalChart() {
    const days = last7Days();
    const vals = days.map((d) => {
      const rec = store.days[dateKey(d)];
      return rec ? rec.exercise.reduce((s, e) => s + (e.kcal || 0), 0) : 0;
    });
    const max = Math.max(1, ...vals);

    elChartKcal.innerHTML = "";
    for (let i = 0; i < days.length; i++) {
      const val = vals[i];
      const col = document.createElement("div");
      col.className = "chart-col";

      const value = document.createElement("div");
      value.className = "chart-value";
      value.textContent = val > 0 ? val : "";

      const wrap = document.createElement("div");
      wrap.className = "chart-bar-wrap";
      const bar = document.createElement("div");
      bar.className = "chart-bar";
      bar.style.height = Math.max(2, (val / max) * 100) + "%";
      wrap.appendChild(bar);

      const dayLabel = document.createElement("div");
      dayLabel.className = "chart-day";
      dayLabel.textContent = DAY_MONTH(days[i]);

      col.appendChild(value);
      col.appendChild(wrap);
      col.appendChild(dayLabel);
      elChartKcal.appendChild(col);
    }
  }

  function renderExercise(rec) {
    const items = rec.exercise;
    const totalMin = items.reduce((s, e) => s + (e.min || 0), 0);
    const totalKcal = items.reduce((s, e) => s + (e.kcal || 0), 0);
    elExerciseSummary.textContent = items.length
      ? t("exSummary", { n: items.length, m: totalMin, k: totalKcal })
      : "";

    elExerciseList.innerHTML = "";
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "empty-hint";
      li.textContent = t("exEmpty");
      elExerciseList.appendChild(li);
      return;
    }
    for (const e of items) {
      const li = document.createElement("li");
      li.className = "entry-item";
      const text = document.createElement("div");
      text.className = "entry-text";
      text.textContent = e.type;
      const sub = document.createElement("span");
      sub.className = "entry-sub";
      sub.textContent = t("exMinLabel", { m: e.min }) + (typeof e.kcal === "number" ? ` · ${t("aboutKcal", { k: e.kcal })}` : "");
      text.appendChild(sub);
      li.appendChild(text);
      const del = document.createElement("button");
      del.className = "entry-delete";
      del.textContent = "\u00d7";
      del.title = t("undoBtn");
      del.addEventListener("click", () => deleteExercise(e.id));
      li.appendChild(del);
      elExerciseList.appendChild(li);
    }
  }

  function render333() {
    let sessions = 0;
    for (const d of last7Days()) {
      const rec = store.days[dateKey(d)];
      if (rec) sessions += rec.exercise.filter((e) => e.min >= 30).length;
    }
    const hit = sessions >= 3;
    const weightHint = typeof store.weight === "number" && store.weight ? "" : t("weightHint");
    elRule333.classList.toggle("good", hit);
    elRule333.textContent = hit
      ? t("ex333Hit", { n: sessions }) + weightHint
      : t("ex333Miss", { n: sessions, left: 3 - sessions }) + weightHint;
  }

  function addExercise(type, min) {
    if (dateKey(selected) !== todayKey()) {
      toast(t("onlyTodayEx"));
      return;
    }
    const typeName = type.trim();
    const weight = store.weight || 60;
    const kcal = computeKcal(typeName, min, weight);
    const rec = dayRecord(todayKey());
    rec.exercise.push({ id: uid(), type: typeName, min: min, met: metOf(typeName), kcal: kcal });
    save();
    render();
    toast(t("exAdded", { type: typeName, min: min, kcal: kcal }));
  }

  function deleteExercise(id) {
    const rec = store.days[dateKey(selected)];
    if (!rec) return;
    rec.exercise = rec.exercise.filter((e) => e.id !== id);
    save();
    render();
  }

  function renderExerciseChips() {
    elExerciseChips.innerHTML = "";
    for (const key of EXERCISE_KEYS) {
      const btn = document.createElement("button");
      btn.className = "chip-btn";
      btn.textContent = t("ex." + key);
      btn.addEventListener("click", () => {
        $("exerciseTypeInput").value = key === "other" ? "" : t("ex." + key);
        $("exerciseMinInput").value = 30;
        openModal("exerciseModal");
      });
      elExerciseChips.appendChild(btn);
    }
  }

  function renderMealChips() {
    elMealChips.innerHTML = "";
    for (const key of MEAL_KEYS) {
      const btn = document.createElement("button");
      btn.className = "chip-btn";
      btn.textContent = t("meal." + key);
      btn.addEventListener("click", () => {
        mealLabelSelection = [key];
        $("mealNoteInput").value = "";
        mealGroupSelection = [];
        mealNoteAuto = true;
        mealOther = false;
        mealOtherText = "";
        $("mealOtherInput").value = "";
        renderMealLabelChips();
        renderMealGroupChips();
        openModal("mealModal");
      });
      elMealChips.appendChild(btn);
    }
  }

  function renderMealLabelChips() {
    elMealLabelChips.innerHTML = "";
    for (const key of MEAL_KEYS) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (mealLabelSelection.includes(key) ? " active" : "");
      b.textContent = t("meal." + key);
      b.addEventListener("click", () => {
        const i = mealLabelSelection.indexOf(key);
        if (i >= 0) mealLabelSelection.splice(i, 1);
        else mealLabelSelection.push(key);
        renderMealLabelChips();
      });
      elMealLabelChips.appendChild(b);
    }
  }

  function renderMeals(rec) {
    const items = rec.meals;
    elMealList.innerHTML = "";
    if (!items.length) {
      const li = document.createElement("li");
      li.className = "empty-hint";
      li.textContent = t("mealEmpty");
      elMealList.appendChild(li);
      return;
    }
    for (const m of items) {
      const li = document.createElement("li");
      li.className = "entry-item";
      const text = document.createElement("div");
      text.className = "entry-text";
      text.textContent = m.label;
      if (m.note) {
        const sub = document.createElement("span");
        sub.className = "entry-sub";
        sub.textContent = m.note;
        text.appendChild(sub);
      }
      li.appendChild(text);
      const del = document.createElement("button");
      del.className = "entry-delete";
      del.textContent = "\u00d7";
      del.title = t("undoBtn");
      del.addEventListener("click", () => deleteMeal(m.id));
      li.appendChild(del);
      elMealList.appendChild(li);
    }
  }

  function renderDiet(rec) {
    const covered = new Set();
    rec.meals.forEach((m) => (m.groups || []).forEach((g) => covered.add(g)));

    elDietGroups.innerHTML = "";
    for (const key of Object.keys(FOOD_GROUPS)) {
      const g = FOOD_GROUPS[key];
      const span = document.createElement("span");
      span.className = "diet-group" + (covered.has(key) ? " covered" : "");
      span.style.setProperty("--gc", g.color);
      span.innerHTML = `<span class="dot"></span>${t("fg." + key)}`;
      elDietGroups.appendChild(span);
    }

    const count = covered.size;
    elMealSummary.textContent = rec.meals.length ? t("mealSummary", { n: rec.meals.length, c: count }) : "";
    renderDietReminder(covered, rec);
  }

  function renderDietReminder(covered, rec) {
    const el = elDietReminder;
    if (!rec.meals.length) {
      el.classList.remove("good");
      el.textContent = t("mealReminderDefault");
      return;
    }
    const missing = Object.keys(FOOD_GROUPS).filter((k) => !covered.has(k));
    const parts = [];

    if (covered.has("protein") && covered.size <= 2 && (!covered.has("grains") || !covered.has("veggies"))) {
      parts.push(t("proteinHeavy"));
    }

    for (const k of missing) parts.push(t("remind." + k));

    const sugary = rec.meals.some((m) =>
      /糖|甜|奶茶|珍奶|手搖|汽水|可樂|含糖|sugar|sweet|boba|soda|cola/.test((m.label || "") + (m.note || ""))
    );
    if (sugary) parts.push(t("sugaryNote"));

    const good = missing.length === 0;
    el.classList.toggle("good", good);
    el.textContent = good
      ? t("dietGood") + (sugary ? " " + t("dietGoodSugary") : "")
      : parts.join("; ");
  }

  function renderDietChart() {
    const days = last7Days();
    elChartDiet.innerHTML = "";
    for (const d of days) {
      const rec = store.days[dateKey(d)];
      const covered = new Set();
      (rec ? rec.meals : []).forEach((m) => (m.groups || []).forEach((g) => covered.add(g)));

      const col = document.createElement("div");
      col.className = "chart-col";

      const value = document.createElement("div");
      value.className = "chart-value";
      value.textContent = covered.size ? `${covered.size}/6` : "";

      const wrap = document.createElement("div");
      wrap.className = "chart-bar-wrap";
      const stack = document.createElement("div");
      stack.className = "stack";
      if (covered.size) {
        for (const key of Object.keys(FOOD_GROUPS)) {
          if (covered.has(key)) {
            const seg = document.createElement("div");
            seg.className = "seg";
            seg.style.height = (100 / 6) + "%";
            seg.style.background = FOOD_GROUPS[key].color;
            stack.appendChild(seg);
          }
        }
      } else {
        const seg = document.createElement("div");
        seg.className = "seg";
        seg.style.height = "2px";
        stack.appendChild(seg);
      }
      wrap.appendChild(stack);

      const dayLabel = document.createElement("div");
      dayLabel.className = "chart-day";
      dayLabel.textContent = DAY_MONTH(d);

      col.appendChild(value);
      col.appendChild(wrap);
      col.appendChild(dayLabel);
      elChartDiet.appendChild(col);
    }

    elDietLegend.innerHTML = "";
    for (const key of Object.keys(FOOD_GROUPS)) {
      const g = FOOD_GROUPS[key];
      const item = document.createElement("span");
      item.className = "legend-item";
      item.innerHTML = `<span class="dot" style="background:${g.color}"></span>${t("fg." + key)}`;
      elDietLegend.appendChild(item);
    }
  }

  function renderStatsRange() {
    elStatsRange.innerHTML = "";
    for (const [n, key] of [[7, "stats7"], [30, "stats30"]]) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (store.statsN === n ? " active" : "");
      b.textContent = t(key);
      b.addEventListener("click", () => {
        store.statsN = n;
        save();
        renderStatsRange();
        renderStats();
      });
      elStatsRange.appendChild(b);
    }
  }

  function renderStatsModeToggle() {
    elStatsModeToggle.innerHTML = "";
    for (const [mode, key] of [["list", "statsModeList"], ["cal", "statsModeCal"]]) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (store.statsMode === mode ? " active" : "");
      b.textContent = t(key);
      b.addEventListener("click", () => {
        store.statsMode = mode;
        save();
        renderStatsModeToggle();
        renderStats();
      });
      elStatsModeToggle.appendChild(b);
    }
  }

  function statDays(n) {
    const days = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({ d, key: dateKey(d), rec: store.days[dateKey(d)] || { total: 0, log: [], exercise: [], meals: [] } });
    }
    return days;
  }

  function renderStats() {
    const n = store.statsN;
    const goal = store.goal;
    const days = statDays(n);

    const waterTotal = days.reduce((s, x) => s + x.rec.total, 0);
    const waterAvg = Math.round(waterTotal / n);
    const achieved = days.filter((x) => x.rec.total >= goal).length;
    let best = { val: 0, label: "" };
    for (const x of days) {
      if (x.rec.total > best.val) best = { val: x.rec.total, label: DAY_MONTH(x.d) };
    }

    const exAll = days.flatMap((x) => x.rec.exercise);
    const exMin = exAll.reduce((s, e) => s + (e.min || 0), 0);
    const exKcal = exAll.reduce((s, e) => s + (e.kcal || 0), 0);
    const typeCount = {};
    exAll.forEach((e) => { typeCount[e.type] = (typeCount[e.type] || 0) + 1; });
    const topType = Object.keys(typeCount).sort((a, b) => typeCount[b] - typeCount[a])[0] || "";

    const coveredCounts = days.map((x) => {
      const s = new Set();
      x.rec.meals.forEach((m) => (m.groups || []).forEach((g) => s.add(g)));
      return s.size;
    });
    const dietAvg = (coveredCounts.reduce((a, b) => a + b, 0) / n).toFixed(1);
    const dietFull = coveredCounts.filter((c) => c === 6).length;

    const statCard = (icon, title, value, unit, sub, highlight) => {
      const c = document.createElement("div");
      c.className = "stat-card" + (highlight ? " highlight" : "");
      c.innerHTML = `<div class="stat-icon">${icon}</div><div class="stat-title">${title}</div><div class="stat-value">${value}<span class="unit">${unit}</span></div><div class="stat-sub">${sub}</div>`;
      elStatGrid.appendChild(c);
    };

    elStatGrid.innerHTML = "";
    statCard("&#128167;", t("statWaterTotal"), (waterTotal / 1000).toFixed(1), " L", t("avgPerDay", { avg: waterAvg }), true);
    statCard("&#127919;", t("statGoalDays"), `${achieved}`, ` / ${n}`, t("goalPerDay", { goal }), false);
    statCard("&#127942;", t("statBestDay"), best.val, " ml", best.label || t("statNoBest"));
    statCard("&#128293;", t("statKcal"), exKcal, " kcal", t("timesMin", { n: exAll.length, m: exMin }));
    statCard("&#129351;", t("statTopType"), topType || "—", "", topType ? t("timesCount", { n: typeCount[topType] }) : t("statNoRecord"));
    statCard("&#129367;", t("statDiet"), dietAvg, " /6", t("fullDays", { n: dietFull }));

    const isCal = store.statsMode === "cal";
    elAchievementList.classList.toggle("hidden", isCal);
    elCalendarView.classList.toggle("hidden", !isCal);
    if (isCal) renderCalendar();
    else renderAchievements(days);
  }

  function renderAchievements(days) {
    elAchievementList.innerHTML = "";
    for (const x of days) {
      const exMinTotal = x.rec.exercise.reduce((s, e) => s + (e.min || 0), 0);
      const item = document.createElement("div");
      item.className = "achievement-item";
      const date = document.createElement("div");
      date.className = "ach-date";
      date.textContent = DAY_MONTH(x.d);
      const detail = document.createElement("div");
      detail.className = "ach-detail";
      detail.textContent = t("achieveDetail", { w: x.rec.total, m: exMinTotal, n: x.rec.meals.length });
      const badge = document.createElement("div");
      const ok = x.rec.total >= store.goal;
      badge.className = "ach-badge" + (ok ? " ok" : " no");
      badge.textContent = ok ? t("achieveOk") : t("achieveNot");
      item.appendChild(date);
      item.appendChild(detail);
      item.appendChild(badge);
      elAchievementList.appendChild(item);
    }
  }

  function calRingSVG(waterP, exP, dietP) {
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 100 100");
    const rings = [
      { r: 45, color: "#0ea5e9", p: waterP },
      { r: 33, color: "#22c55e", p: exP },
      { r: 21, color: "#f59e0b", p: dietP },
    ];
    for (const ring of rings) {
      const c = 2 * Math.PI * ring.r;
      const bg = document.createElementNS(NS, "circle");
      bg.setAttribute("cx", "50");
      bg.setAttribute("cy", "50");
      bg.setAttribute("r", String(ring.r));
      bg.setAttribute("fill", "none");
      bg.setAttribute("stroke", "#e3eff7");
      bg.setAttribute("stroke-width", "7");
      svg.appendChild(bg);
      const p = Math.max(0, Math.min(1, ring.p || 0));
      const val = document.createElementNS(NS, "circle");
      val.setAttribute("cx", "50");
      val.setAttribute("cy", "50");
      val.setAttribute("r", String(ring.r));
      val.setAttribute("fill", "none");
      val.setAttribute("stroke", ring.color);
      val.setAttribute("stroke-width", "7");
      val.setAttribute("stroke-linecap", "round");
      val.setAttribute("transform", "rotate(-90 50 50)");
      val.setAttribute("stroke-dasharray", `${(p * c).toFixed(2)} ${c.toFixed(2)}`);
      svg.appendChild(val);
    }
    return svg;
  }

  function monthTitle(year, month) {
    if (store.lang === "en") return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    if (store.lang === "ja") return `${year}年${month + 1}月`;
    return `${year}年${month + 1}月`;
  }

  function weekdayShort() {
    if (store.lang === "en") return ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    if (store.lang === "ja") return ["日", "月", "火", "水", "木", "金", "土"];
    return ["日", "一", "二", "三", "四", "五", "六"];
  }

  function renderCalendar() {
    const year = calMonth.getFullYear();
    const month = calMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const tKey = todayKey();

    const head = document.createElement("div");
    head.className = "cal-head";
    const prev = document.createElement("button");
    prev.className = "day-arrow";
    prev.textContent = "\u2039";
    prev.title = t("calPrev");
    prev.addEventListener("click", () => {
      calMonth = new Date(year, month - 1, 1);
      renderStats();
    });
    const label = document.createElement("div");
    label.className = "cal-title";
    label.textContent = monthTitle(year, month);
    const next = document.createElement("button");
    next.className = "day-arrow";
    next.textContent = "\u203a";
    next.title = t("calNext");
    next.addEventListener("click", () => {
      calMonth = new Date(year, month + 1, 1);
      renderStats();
    });
    head.appendChild(prev);
    head.appendChild(label);
    head.appendChild(next);

    const grid = document.createElement("div");
    grid.className = "cal-grid";
    for (const w of weekdayShort()) {
      const c = document.createElement("div");
      c.className = "cal-wd";
      c.textContent = w;
      grid.appendChild(c);
    }
    const startDow = new Date(year, month, 1).getDay();
    for (let i = 0; i < startDow; i++) {
      const c = document.createElement("div");
      c.className = "cal-cell cal-empty";
      grid.appendChild(c);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
      const rec = store.days[key];
      const cell = document.createElement("div");
      cell.className = "cal-cell" + (key === tKey ? " today" : "");

      const waterP = rec ? Math.min(1, (rec.total || 0) / store.goal) : 0;
      const exMin = rec ? rec.exercise.reduce((s, e) => s + (e.min || 0), 0) : 0;
      const exP = Math.min(1, exMin / 30);
      const covered = new Set();
      (rec ? rec.meals : []).forEach((m) => (m.groups || []).forEach((g) => covered.add(g)));
      const dietP = covered.size / 6;

      const ringWrap = document.createElement("div");
      ringWrap.className = "cal-ring";
      ringWrap.appendChild(calRingSVG(waterP, exP, dietP));
      const num = document.createElement("span");
      num.className = "cal-num";
      num.textContent = d;
      ringWrap.appendChild(num);
      cell.appendChild(ringWrap);
      grid.appendChild(cell);
    }

    const legend = document.createElement("div");
    legend.className = "cal-legend";
    legend.innerHTML =
      `<span class="legend-item"><span class="dot" style="background:#0ea5e9;width:9px;height:9px;border-radius:50%;display:inline-block"></span>${t("calWater")}</span>` +
      `<span class="legend-item"><span class="dot" style="background:#22c55e;width:9px;height:9px;border-radius:50%;display:inline-block"></span>${t("calEx")}</span>` +
      `<span class="legend-item"><span class="dot" style="background:#f59e0b;width:9px;height:9px;border-radius:50%;display:inline-block"></span>${t("calDiet")}</span>`;

    elCalendarView.innerHTML = "";
    elCalendarView.appendChild(head);
    elCalendarView.appendChild(grid);
    elCalendarView.appendChild(legend);
  }

  function addMeal(label, note, groups) {
    if (dateKey(selected) !== todayKey()) {
      toast(t("onlyTodayMeal"));
      return;
    }
    const rec = dayRecord(todayKey());
    rec.meals.push({ id: uid(), label: label.trim(), note: (note || "").trim(), groups: groups || [] });
    save();
    render();
    toast(t("mealAdded", { label: label.trim() }));
  }

  function deleteMeal(id) {
    const rec = store.days[dateKey(selected)];
    if (!rec) return;
    rec.meals = rec.meals.filter((m) => m.id !== id);
    save();
    render();
  }

  let timerTick = null;

  function formatRemain(ms) {
    const s = Math.max(0, Math.ceil(ms / 1000));
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    const mm = String(m).padStart(2, "0");
    const ss = String(sec).padStart(2, "0");
    return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  function renderTimer() {
    const tm = store.timer;
    if (tm.running && tm.deadline && tm.deadline > Date.now()) {
      const remain = tm.deadline - Date.now();
      elTimerDisplay.textContent = formatRemain(remain);
      elTimerDisplay.classList.add("running");
      elTimerStart.textContent = t("timerPause");
      elTimerHint.textContent = t("timerRunning", { n: tm.duration });
      document.title = t("titleRunning", { time: formatRemain(remain) });
    } else {
      elTimerDisplay.textContent = formatRemain((tm.duration || DEFAULT_TIMER) * 60000);
      elTimerDisplay.classList.remove("running");
      elTimerStart.textContent = t("timerStart");
      elTimerHint.textContent = tm.running ? t("timerDone") : t("timerIdle");
      document.title = t("appName");
    }

    $("timerTip").textContent = t("timerTip", { n: tm.duration || DEFAULT_TIMER });

    elTimerPresets.innerHTML = "";
    for (const m of TIMER_PRESETS) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (m === tm.duration ? " active" : "");
      b.textContent = m + " " + (store.lang === "ja" ? "分" : "min");
      b.addEventListener("click", () => {
        store.timer.duration = m;
        if (!store.timer.running) {
          save();
          renderTimer();
          toast(t("timerSet", { n: m }));
        }
      });
      elTimerPresets.appendChild(b);
    }
  }

  function ensureTimerTick() {
    if (timerTick) clearInterval(timerTick);
    timerTick = setInterval(() => {
      if (store.timer.running && store.timer.deadline) {
        if (store.timer.deadline - Date.now() <= 0) fireAlarm();
        else renderTimer();
      }
    }, 500);
  }

  function startTimer() {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const t = store.timer;
    if (t.running && t.deadline && t.deadline > Date.now()) {
      t.running = false;
      t.deadline = null;
      save();
      renderTimer();
      toast(t("timerPaused"));
      return;
    }
    beginTimer(t.duration || DEFAULT_TIMER);
  }

  function beginTimer(minutes) {
    store.timer.running = true;
    store.timer.deadline = Date.now() + minutes * 60000;
    save();
    renderTimer();
    ensureTimerTick();
    toast(t("timerStarted", { n: minutes }));
  }

  function resetTimer() {
    store.timer.running = false;
    store.timer.deadline = null;
    save();
    renderTimer();
    toast(t("timerResetMsg"));
  }

  function fireAlarm() {
    store.timer.running = false;
    store.timer.deadline = null;
    save();
    renderTimer();
    playAlarm();
    notify();
    $("alarmModal").classList.remove("hidden");
  }

  function playAlarm() {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      const ctx = new Ctx();
      const beep = (at, freq) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        o.connect(g);
        g.connect(ctx.destination);
        g.gain.setValueAtTime(0.0001, ctx.currentTime + at);
        g.gain.exponentialRampToValueAtTime(0.35, ctx.currentTime + at + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + at + 0.5);
        o.start(ctx.currentTime + at);
        o.stop(ctx.currentTime + at + 0.55);
      };
      for (let i = 0; i < 6; i++) beep(i * 0.45, i % 2 ? 880 : 660);
    } catch (_) {}
  }

  function notify() {
    try {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(t("alarmTitle"), { body: t("alarmMsg") });
      }
    } catch (_) {}
  }

  let mealLabelSelection = [];
  let mealGroupSelection = [];
  let mealNoteAuto = true;
  let mealOther = false;
  let mealOtherText = "";

  function syncMealNote() {
    const parts = mealGroupSelection.map((g) => t("fg." + g));
    if (mealOther && mealOtherText.trim()) parts.push(mealOtherText.trim());
    $("mealNoteInput").value = parts.join("、");
    mealNoteAuto = true;
  }

  function renderMealGroupChips() {
    elMealGroupChips.innerHTML = "";
    for (const key of Object.keys(FOOD_GROUPS)) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (mealGroupSelection.includes(key) ? " active" : "");
      b.textContent = t("fg." + key);
      b.addEventListener("click", () => {
        const i = mealGroupSelection.indexOf(key);
        if (i >= 0) mealGroupSelection.splice(i, 1);
        else mealGroupSelection.push(key);
        renderMealGroupChips();
        if (mealNoteAuto) syncMealNote();
      });
      elMealGroupChips.appendChild(b);
    }
    const other = document.createElement("button");
    other.className = "chip-btn" + (mealOther ? " active" : "");
    other.textContent = t("fg.other");
    other.addEventListener("click", () => {
      mealOther = !mealOther;
      if (!mealOther) {
        mealOtherText = "";
        $("mealOtherInput").value = "";
      }
      renderMealGroupChips();
      if (mealOther) {
        if (mealNoteAuto) syncMealNote();
        const oi = $("mealOtherInput");
        if (oi && !oi.classList.contains("hidden")) oi.focus();
      }
    });
    elMealGroupChips.appendChild(other);
    const otherInput = $("mealOtherInput");
    if (otherInput) otherInput.classList.toggle("hidden", !mealOther);
  }

  function updateWeightSuggestion() {
    const w = parseFloat($("weightInput").value);
    const btn = $("applySuggestionBtn");
    if (isNaN(w) || w < 20 || w > 300) {
      $("weightSuggestion").textContent = t("weightInvalid");
      btn.disabled = true;
      return;
    }
    const low = Math.round((w * 30) / 10) * 10;
    const high = Math.round((w * 35) / 10) * 10;
    $("weightSuggestion").textContent = t("weightSuggestionText", { w, low, high });
    btn.disabled = false;
  }

  let toastTimer = null;
  function toast(msg) {
    const t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2200);
  }

  function openModal(id) {
    $(id).classList.remove("hidden");
    const input = $(id).querySelector("input");
    if (input) setTimeout(() => input.focus(), 50);
  }

  function closeModals() {
    document.querySelectorAll(".modal-backdrop").forEach((m) => m.classList.add("hidden"));
  }

  const LANG_LABELS = { zh: "中文", en: "English", ja: "日本語" };

  function renderLangToggle() {
    const wrap = $("langToggle");
    if (!wrap) return;
    wrap.innerHTML = "";
    for (const lang of LANG_OPTIONS) {
      const b = document.createElement("button");
      b.className = "chip-btn" + (store.lang === lang ? " active" : "");
      b.textContent = LANG_LABELS[lang];
      b.addEventListener("click", () => {
        store.lang = lang;
        save();
        applyLang();
        toast(t("settingsTitle"));
      });
      wrap.appendChild(b);
    }
  }

  function applyLang() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    renderLangToggle();
    updateWeightSuggestion();
    renderMealLabelChips();
    renderMealGroupChips();
    render();
  }

  function bindEvents() {
    elPrev.addEventListener("click", () => {
      selected.setDate(selected.getDate() - 1);
      render();
    });
    elNext.addEventListener("click", () => {
      if (dateKey(selected) === todayKey()) return;
      selected.setDate(selected.getDate() + 1);
      render();
    });

    document.querySelectorAll(".tab-btn").forEach((b) =>
      b.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        document.querySelectorAll(".tab-panel").forEach((p) => p.classList.add("hidden"));
        const panel = document.getElementById("tab-" + b.dataset.tab);
        if (panel) panel.classList.remove("hidden");
        render();
      })
    );

    $("settingsBtn").addEventListener("click", () => {
      $("goalInput").value = store.goal;
      $("weightInput").value = store.weight || "";
      updateWeightSuggestion();
      openModal("goalModal");
    });
    $("customBtn").addEventListener("click", () => {
      $("customInput").value = "";
      openModal("customModal");
    });
    elUndo.addEventListener("click", undo);

    $("weightInput").addEventListener("input", updateWeightSuggestion);

    $("mealNoteInput").addEventListener("input", () => {
      mealNoteAuto = false;
    });

    $("mealOtherInput").addEventListener("input", () => {
      mealOtherText = $("mealOtherInput").value;
      if (mealOther && mealNoteAuto) syncMealNote();
    });

    $("applySuggestionBtn").addEventListener("click", () => {
      const w = parseFloat($("weightInput").value);
      if (isNaN(w) || w < 20 || w > 300) return;
      $("goalInput").value = Math.round((w * 30) / 10) * 10;
      toast(t("suggestionFilled"));
    });

    $("saveGoalBtn").addEventListener("click", () => {
      const v = parseInt($("goalInput").value, 10);
      if (isNaN(v) || v < 100 || v > 10000) {
        toast(t("goalInvalid"));
        return;
      }
      store.goal = v;
      const w = parseFloat($("weightInput").value);
      if (!isNaN(w) && w >= 20 && w <= 300) store.weight = w;
      save();
      closeModals();
      render();
      toast(t("goalSaved", { v }));
    });

    $("saveCustomBtn").addEventListener("click", () => {
      const v = parseInt($("customInput").value, 10);
      if (isNaN(v) || v < 10 || v > 5000) {
        toast(t("customInvalid"));
        return;
      }
      closeModals();
      addWater(v);
    });

    $("saveExerciseBtn").addEventListener("click", () => {
      const type = $("exerciseTypeInput").value.trim();
      const min = parseInt($("exerciseMinInput").value, 10);
      if (!type) {
        toast(t("exTypeRequired"));
        return;
      }
      if (isNaN(min) || min < 1 || min > 600) {
        toast(t("exMinInvalid"));
        return;
      }
      closeModals();
      addExercise(type, min);
    });

    $("saveMealBtn").addEventListener("click", () => {
      if (!mealLabelSelection.length) {
        toast(t("mealLabelRequired"));
        return;
      }
      const label = mealLabelSelection.map((k) => t("meal." + k)).join("、");
      const note = $("mealNoteInput").value.trim();
      const groups = mealGroupSelection.slice();
      closeModals();
      addMeal(label, note, groups);
    });

    elTimerStart.addEventListener("click", startTimer);
    elTimerReset.addEventListener("click", resetTimer);

    $("alarmRestart").addEventListener("click", () => {
      closeModals();
      beginTimer(store.timer.duration || DEFAULT_TIMER);
    });
    $("alarmSnooze").addEventListener("click", () => {
      closeModals();
      beginTimer(5);
      toast(t("snoozed"));
    });
    $("alarmStop").addEventListener("click", closeModals);

    document.querySelectorAll("[data-close]").forEach((b) =>
      b.addEventListener("click", closeModals)
    );
    document.querySelectorAll(".modal-backdrop").forEach((m) =>
      m.addEventListener("click", (e) => {
        if (e.target === m) closeModals();
      })
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModals();
    });
  }

  load();
  bindEvents();
  applyLang();
  renderMealLabelChips();
  renderMealGroupChips();
  if (store.timer.running && store.timer.deadline > Date.now()) ensureTimerTick();
})();
