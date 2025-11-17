// games.js — исправленная, полностью рабочая версия
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем: находимся ли мы на странице игр?
  if (!document.querySelector('.game')) {
    return; // Не games.html — выходим
  }

  // === ДАННЫЕ ===
  const cognitionQuestions = [
    { text: "Исследователь измерил скорость света с помощью интерферометра Майкельсона.", type: "empirical" },
    { text: "Эйнштейн предложил теорию относительности, объясняющую связь массы и энергии.", type: "theoretical" },
    { text: "Биолог наблюдал деление клетки под микроскопом.", type: "empirical" },
    { text: "Физик вывел уравнение Шрёдингера для описания поведения квантовых частиц.", type: "theoretical" },
    { text: "Химик зафиксировал температуру кипения нового соединения.", type: "empirical" }
  ];

  const funcQuestions = [
    {
      text: "Учёные разработали вакцину от нового вируса, спасшую миллионы жизней.",
      options: ["Познавательная", "Мировоззренческая", "Производственная", "Социальная"],
      answer: 2
    },
    {
      text: "Социологи выявили закономерности миграции и предложили меры по интеграции.",
      options: ["Познавательная", "Социальная", "Культурная", "Просветительская"],
      answer: 1
    },
    {
      text: "Открытие ДНК привело к пониманию наследственности и развитию генной инженерии.",
      options: ["Познавательная", "Производственная", "Мировоззренческая", "Все вышеперечисленные"],
      answer: 3
    },
    {
      text: "Научные лекции в школах формируют у подростков критическое мышление.",
      options: ["Производственная", "Просветительская", "Идеологическая", "Воспитательная"],
      answer: 1
    }
  ];

  const eduQuestions = [
    {
      text: "Школа организует экскурсию в музей боевой славы, где ученики узнают о подвигах предков.",
      options: ["Экономическая", "Культурная", "Воспитательная", "Идеологическая"],
      answer: 3
    },
    {
      text: "Студенты колледжа проходят практику на заводе и получают диплом техника-механика.",
      options: ["Социальная", "Экономическая", "Культурная", "Воспитательная"],
      answer: 1
    },
    {
      text: "В детском саду дети играют в «семью», учатся делиться и договариваться.",
      options: ["Идеологическая", "Воспитательная", "Культурная", "Социальная"],
      answer: 1
    },
    {
      text: "Университет проводит летнюю школу для одарённых школьников из малых городов.",
      options: ["Экономическая", "Культурная", "Социальная", "Идеологическая"],
      answer: 2
    }
  ];

  // === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
  function showFeedback(id, text, isCorrect) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = `feedback ${isCorrect ? 'correct' : 'incorrect'}`;
  }

  function showNextButton(id) {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = 'inline-block';
  }

  function hideNextButton(id) {
    const btn = document.getElementById(id);
    if (btn) btn.style.display = 'none';
  }

  // === ИГРА 1: Уровни познания ===
  let qIndex = 0;

  function loadQuestion1() {
    const q = cognitionQuestions[qIndex];
    document.getElementById('statement').textContent = q.text;
    hideNextButton('next-btn');
    showFeedback('feedback', '', false);
  }

  function checkAnswer1(answer) {
    const q = cognitionQuestions[qIndex];
    const isCorrect = answer === q.type;
    const text = isCorrect 
      ? "✅ Верно!" 
      : `❌ Неверно. Это — ${q.type === 'empirical' ? 'эмпирическое' : 'теоретическое'} знание.`;
    showFeedback('feedback', text, isCorrect);
    showNextButton('next-btn');
  }

  function nextQuestion1() {
    qIndex = (qIndex + 1) % cognitionQuestions.length;
    loadQuestion1();
  }

  // Привязка кнопок (статичные — можно сразу)
  const btnEmpirical = document.getElementById('btn-empirical');
  const btnTheoretical = document.getElementById('btn-theoretical');
  const nextBtn1 = document.getElementById('next-btn');

  if (btnEmpirical) btnEmpirical.addEventListener('click', () => checkAnswer1('empirical'));
  if (btnTheoretical) btnTheoretical.addEventListener('click', () => checkAnswer1('theoretical'));
  if (nextBtn1) nextBtn1.addEventListener('click', nextQuestion1);

  // === ИГРА 2: Функции науки ===
  let fIndex = 0;

  function loadQuestion2() {
    const q = funcQuestions[fIndex];
    document.getElementById('func-statement').textContent = q.text;
    
    const container = document.getElementById('func-options');
    if (!container) return;
    container.innerHTML = '';
    
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = opt;
      // ⚠️ Важно: вешаем обработчик ПРИ СОЗДАНИИ кнопки
      btn.onclick = () => checkAnswer2(i);
      container.appendChild(btn);
    });
    
    hideNextButton('next-func-btn');
    showFeedback('func-feedback', '', false);
  }

  function checkAnswer2(selectedIndex) {
    const q = funcQuestions[fIndex];
    const isCorrect = selectedIndex === q.answer;
    const text = isCorrect
      ? "✅ Отлично! Вы точно понимаете функции науки."
      : `❌ Близко! Правильный ответ: «${q.options[q.answer]}».`;
    showFeedback('func-feedback', text, isCorrect);
    showNextButton('next-func-btn');
  }

  function nextQuestion2() {
    fIndex = (fIndex + 1) % funcQuestions.length;
    loadQuestion2();
  }

  const nextBtn2 = document.getElementById('next-func-btn');
  if (nextBtn2) nextBtn2.addEventListener('click', nextQuestion2);

  // === ИГРА 3: Функции образования ===
  let eIndex = 0;

  function loadQuestion3() {
    const q = eduQuestions[eIndex];
    document.getElementById('edu-statement').textContent = q.text;
    
    const container = document.getElementById('edu-options');
    if (!container) return;
    container.innerHTML = '';
    
    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'btn';
      btn.textContent = opt;
      // ⚠️ Вешаем обработчик при создании
      btn.onclick = () => checkAnswer3(i);
      container.appendChild(btn);
    });
    
    hideNextButton('next-edu-btn');
    showFeedback('edu-feedback', '', false);
  }

  function checkAnswer3(selectedIndex) {
    const q = eduQuestions[eIndex];
    const isCorrect = selectedIndex === q.answer;
    const text = isCorrect
      ? "✅ Точно! Вы отлично разбираетесь в функциях образования."
      : `❌ Почти! Правильный ответ: «${q.options[q.answer]}».`;
    showFeedback('edu-feedback', text, isCorrect);
    showNextButton('next-edu-btn');
  }

  function nextQuestion3() {
    eIndex = (eIndex + 1) % eduQuestions.length;
    loadQuestion3();
  }

  const nextBtn3 = document.getElementById('next-edu-btn');
  if (nextBtn3) nextBtn3.addEventListener('click', nextQuestion3);

  // === ЗАПУСК ПЕРВЫХ ВОПРОСОВ ===
  // Запускаем только если элементы существуют
  if (document.getElementById('statement')) loadQuestion1();
  if (document.getElementById('func-statement')) loadQuestion2();
  if (document.getElementById('edu-statement')) loadQuestion3();
});
