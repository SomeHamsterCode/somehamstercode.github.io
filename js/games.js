// Данные для игр
const cognitionQuestions = [
  { text: "Исследователь измерил скорость света с помощью интерферометра Майкельсона.", type: "empirical" },
  { text: "Эйншейн предложил теорию относительности, объясняющую связь массы и энергии.", type: "theoretical" },
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

// Игра 1: Уровни познания
let qIndex = 0;
function loadQ() {
  const q = cognitionQuestions[qIndex];
  document.getElementById('statement').textContent = q.text;
  resetFeedback('feedback');
}
function checkQ(ans) {
  const q = cognitionQuestions[qIndex];
  const el = document.getElementById('feedback');
  if (ans === q.type) {
    el.textContent = "✅ Верно!";
    el.className = 'feedback correct';
  } else {
    const corr = q.type === 'empirical' ? 'эмпирическое' : 'теоретическое';
    el.textContent = `❌ Неверно. Это — ${corr} знание.`;
    el.className = 'feedback incorrect';
  }
  document.getElementById('next-btn').style.display = 'inline-block';
}
function nextQ() {
  qIndex = (qIndex + 1) % cognitionQuestions.length;
  loadQ();
}
document.getElementById('btn-empirical')?.addEventListener('click', () => checkQ('empirical'));
document.getElementById('btn-theoretical')?.addEventListener('click', () => checkQ('theoretical'));
document.getElementById('next-btn')?.addEventListener('click', nextQ);

// Игра 2: Функции науки
let fIndex = 0;
function loadF() {
  const q = funcQuestions[fIndex];
  document.getElementById('func-statement').textContent = q.text;
  const cont = document.getElementById('func-options');
  cont.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = opt;
    btn.onclick = () => checkF(i);
    cont.appendChild(btn);
  });
  resetFeedback('func-feedback');
}
function checkF(sel) {
  const q = funcQuestions[fIndex];
  const el = document.getElementById('func-feedback');
  if (sel === q.answer) {
    el.textContent = "✅ Отлично! Вы точно понимаете функции науки.";
    el.className = 'feedback correct';
  } else {
    el.textContent = `❌ Близко! Правильный ответ: «${q.options[q.answer]}».`;
    el.className = 'feedback incorrect';
  }
  document.getElementById('next-func-btn').style.display = 'inline-block';
}
function nextF() {
  fIndex = (fIndex + 1) % funcQuestions.length;
  loadF();
}
document.getElementById('next-func-btn')?.addEventListener('click', nextF);

// Игра 3: Функции образования
let eIndex = 0;
function loadE() {
  const q = eduQuestions[eIndex];
  document.getElementById('edu-statement').textContent = q.text;
  const cont = document.getElementById('edu-options');
  cont.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = opt;
    btn.onclick = () => checkE(i);
    cont.appendChild(btn);
  });
  resetFeedback('edu-feedback');
}
function checkE(sel) {
  const q = eduQuestions[eIndex];
  const el = document.getElementById('edu-feedback');
  if (sel === q.answer) {
    el.textContent = "✅ Точно! Вы отлично разбираетесь в функциях образования.";
    el.className = 'feedback correct';
  } else {
    el.textContent = `❌ Почти! Правильный ответ: «${q.options[q.answer]}».`;
    el.className = 'feedback incorrect';
  }
  document.getElementById('next-edu-btn').style.display = 'inline-block';
}
function nextE() {
  eIndex = (eIndex + 1) % eduQuestions.length;
  loadE();
}
document.getElementById('next-edu-btn')?.addEventListener('click', nextE);

// Вспомогательная функция
function resetFeedback(id) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = '';
    el.className = 'feedback';
  }
  const nextBtn = document.querySelector(`#${id.replace('-feedback', '-btn')}, #next-btn, #next-func-btn, #next-edu-btn`);
  if (nextBtn) nextBtn.style.display = 'none';
}

// Автозапуск при загрузке games.html
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('statement')) loadQ();
  if (document.getElementById('func-statement')) loadF();
  if (document.getElementById('edu-statement')) loadE();
});
