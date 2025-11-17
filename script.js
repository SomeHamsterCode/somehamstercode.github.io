// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      const offset = 70; // высота header
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// === Game 1: Уровни познания ===
const cognitionQuestions = [
  { text: "Исследователь измерил скорость света с помощью интерферометра Майкельсона.", type: "empirical" },
  { text: "Эйнштейн предложил теорию относительности, объясняющую связь массы и энергии.", type: "theoretical" },
  { text: "Биолог наблюдал деление клетки под микроскопом.", type: "empirical" },
  { text: "Физик вывел уравнение Шрёдингера для описания поведения квантовых частиц.", type: "theoretical" },
  { text: "Химик зафиксировал температуру кипения нового соединения.", type: "empirical" }
];

let currentQIndex = 0;

function loadQuestion() {
  const current = cognitionQuestions[currentQIndex];
  document.getElementById('statement').textContent = current.text;
  document.getElementById('feedback').textContent = '';
  document.getElementById('feedback').className = 'feedback';
  document.getElementById('next-btn').style.display = 'none';
}

function checkAnswer(answer) {
  const current = cognitionQuestions[currentQIndex];
  const feedbackEl = document.getElementById('feedback');
  
  if (answer === current.type) {
    feedbackEl.textContent = "✅ Верно!";
    feedbackEl.className = 'feedback correct';
  } else {
    const correct = current.type === 'empirical' ? 'эмпирическое' : 'теоретическое';
    feedbackEl.textContent = `❌ Неверно. Это — ${correct} знание.`;
    feedbackEl.className = 'feedback incorrect';
  }
  document.getElementById('next-btn').style.display = 'inline-block';
}

function nextQuestion() {
  currentQIndex = (currentQIndex + 1) % cognitionQuestions.length;
  loadQuestion();
}

// Привязка событий
document.getElementById('btn-empirical').addEventListener('click', () => checkAnswer('empirical'));
document.getElementById('btn-theoretical').addEventListener('click', () => checkAnswer('theoretical'));
document.getElementById('next-btn').addEventListener('click', nextQuestion);

// Загрузка первого вопроса
loadQuestion();

// === Game 2: Функции науки ===
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

let currentFIndex = 0;

function loadFuncQuestion() {
  const current = funcQuestions[currentFIndex];
  document.getElementById('func-statement').textContent = current.text;
  
  const optionsEl = document.getElementById('func-options');
  optionsEl.innerHTML = '';
  
  current.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = opt;
    btn.onclick = () => checkFuncAnswer(i);
    optionsEl.appendChild(btn);
  });
  
  document.getElementById('func-feedback').textContent = '';
  document.getElementById('func-feedback').className = 'feedback';
  document.getElementById('next-func-btn').style.display = 'none';
}

function checkFuncAnswer(selectedIndex) {
  const current = funcQuestions[currentFIndex];
  const feedbackEl = document.getElementById('func-feedback');
  
  if (selectedIndex === current.answer) {
    feedbackEl.textContent = "✅ Отлично! Вы точно понимаете функции науки.";
    feedbackEl.className = 'feedback correct';
  } else {
    const correctAns = current.options[current.answer];
    feedbackEl.textContent = `❌ Близко! Правильный ответ: «${correctAns}».`;
    feedbackEl.className = 'feedback incorrect';
  }
  document.getElementById('next-func-btn').style.display = 'inline-block';
}

function nextFuncQuestion() {
  currentFIndex = (currentFIndex + 1) % funcQuestions.length;
  loadFuncQuestion();
}

// Привязка событий
document.getElementById('next-func-btn').addEventListener('click', nextFuncQuestion);

// Загрузка первого вопроса
loadFuncQuestion();
