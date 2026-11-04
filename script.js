const menuToggle = document.querySelector("#menuToggle");
const siteNav = document.querySelector("#siteNav");

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  siteNav.classList.toggle("is-open", !isExpanded);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }
});

const QUIZ_STATE_KEY = "historia-nicaragua-preguntas-v1";
const TOTAL_QUESTIONS = 10;

const quizFacts = [
  {
    clue: "día del triunfo de la Revolución Sandinista",
    answer: "19 de julio de 1979",
    options: ["19 de julio de 1979", "1 de enero de 1980", "4 de noviembre de 1984", "25 de febrero de 1990"]
  },
  {
    clue: "año en que triunfó la Revolución Sandinista",
    answer: "1979",
    options: ["1979", "1980", "1984", "1990"]
  },
  {
    clue: "movimiento que derrocó la dictadura de Somoza",
    answer: "Revolución Sandinista",
    options: ["Revolución Sandinista", "Revolución Liberal", "Revolución de Octubre", "Revolución de Abril"]
  },
  {
    clue: "organización cuyo nombre completo es Frente Sandinista de Liberación Nacional",
    answer: "FSLN",
    options: ["FSLN", "JGRN", "ONU", "OEA"]
  },
  {
    clue: "presidente electo en Nicaragua en 1984",
    answer: "Daniel Ortega",
    options: ["Daniel Ortega", "Anastasio Somoza Debayle", "Violeta Barrios de Chamorro", "Augusto C. Sandino"]
  },
  {
    clue: "año en que se celebraron elecciones nacionales durante el primer gobierno revolucionario",
    answer: "1984",
    options: ["1979", "1980", "1984", "1990"]
  },
  {
    clue: "presidenta electa en Nicaragua en 1990",
    answer: "Violeta Barrios de Chamorro",
    options: ["Violeta Barrios de Chamorro", "Daniel Ortega", "Rosario Murillo", "Josefa Toledo"]
  },
  {
    clue: "año en que Violeta Barrios de Chamorro ganó las elecciones",
    answer: "1990",
    options: ["1979", "1984", "1987", "1990"]
  },
  {
    clue: "gobierno provisional que se formó después de la caída de Somoza",
    answer: "Junta de Gobierno de Reconstrucción Nacional",
    options: ["Junta de Gobierno de Reconstrucción Nacional", "Consejo Centroamericano", "Gobierno de Unidad Colonial", "Asamblea de la Costa Atlántica"]
  },
  {
    clue: "período del primer gobierno revolucionario que se presenta en esta exposición",
    answer: "1979–1990",
    options: ["1936–1956", "1956–1979", "1979–1990", "1990–2000"]
  },
  {
    clue: "campaña educativa nacional realizada en 1980",
    answer: "Cruzada Nacional de Alfabetización",
    options: ["Cruzada Nacional de Alfabetización", "Reforma Electoral Nacional", "Jornada Nacional de Salud", "Campaña de Reforma Agraria"]
  },
  {
    clue: "año en que se realizó la Cruzada Nacional de Alfabetización",
    answer: "1980",
    options: ["1979", "1980", "1984", "1987"]
  },
  {
    clue: "objetivo principal de una campaña de alfabetización",
    answer: "Enseñar a leer y escribir",
    options: ["Enseñar a leer y escribir", "Organizar elecciones", "Construir carreteras", "Repartir maquinaria"]
  },
  {
    clue: "comunidades donde la Cruzada buscó llevar enseñanza, además de las ciudades",
    answer: "Comunidades rurales",
    options: ["Comunidades rurales", "Solo las capitales", "Únicamente las zonas industriales", "Solo las bases militares"]
  },
  {
    clue: "grupo que participó como voluntario en la campaña de alfabetización",
    answer: "Jóvenes estudiantes",
    options: ["Jóvenes estudiantes", "Delegaciones extranjeras solamente", "Empresas privadas", "Equipos deportivos profesionales"]
  },
  {
    clue: "relación social que la alfabetización también ayudó a promover",
    answer: "Encuentro entre personas de zonas rurales y urbanas",
    options: ["Encuentro entre personas de zonas rurales y urbanas", "Separación entre estudiantes y docentes", "Cierre de las escuelas", "Intercambio exclusivo entre capitales"]
  },
  {
    clue: "meses aproximados en que se desarrolló la Cruzada de 1980",
    answer: "De marzo a agosto",
    options: ["De marzo a agosto", "De enero a febrero", "De septiembre a diciembre", "Solo durante diciembre"]
  },
  {
    clue: "idiomas y lenguas usados en iniciativas de alfabetización de la Costa Caribe",
    answer: "Miskito, sumo y creole",
    options: ["Miskito, sumo y creole", "Solo español y francés", "Náhuatl, maya y quechua", "Inglés, alemán e italiano"]
  },
  {
    clue: "cambio relacionado con la distribución de tierras en el campo",
    answer: "Reforma agraria",
    options: ["Reforma agraria", "Reforma monetaria", "Reforma naval", "Reforma de transporte aéreo"]
  },
  {
    clue: "año de aprobación de la Constitución Política de Nicaragua vigente desde 1987",
    answer: "1987",
    options: ["1979", "1980", "1984", "1987"]
  },
  {
    clue: "año de las elecciones nacionales celebradas antes de la transición de 1990",
    answer: "1984",
    options: ["1980", "1984", "1987", "1990"]
  },
  {
    clue: "servicios sociales que el gobierno buscó ampliar junto con la educación",
    answer: "Salud",
    options: ["Salud", "Turismo espacial", "Transporte marítimo internacional", "Industria automotriz"]
  },
  {
    clue: "reformas sociales que buscaban mejorar oportunidades y reducir desigualdades",
    answer: "Cambios en educación, salud y acceso a la tierra",
    options: ["Cambios en educación, salud y acceso a la tierra", "Cierre de escuelas y hospitales", "Reducción de la enseñanza rural", "Eliminación de servicios comunitarios"]
  },
  {
    clue: "partido que perdió las elecciones de 1990 y pasó a la oposición",
    answer: "FSLN",
    options: ["FSLN", "Partido Conservador de 1850", "Junta de Somoza", "OEA"]
  },
  {
    clue: "conflicto armado que afectó al país durante la década de 1980",
    answer: "Conflicto entre el gobierno y la Contra",
    options: ["Conflicto entre el gobierno y la Contra", "Guerra del Pacífico", "Guerra de las Malvinas", "Guerra de Secesión"]
  },
  {
    clue: "otra dificultad que, junto con la guerra, afectó la vida cotidiana en los años ochenta",
    answer: "Crisis económica",
    options: ["Crisis económica", "Falta de estaciones espaciales", "Erupción de volcanes en Europa", "Guerra civil en Asia"]
  },
  {
    clue: "propósito general del proyecto iniciado tras el fin de la dictadura",
    answer: "Reconstrucción nacional",
    options: ["Reconstrucción nacional", "Restaurar la dinastía Somoza", "Terminar la educación pública", "Trasladar la capital fuera del país"]
  },
  {
    clue: "familia cuyo gobierno dictatorial terminó con el triunfo revolucionario de 1979",
    answer: "Familia Somoza",
    options: ["Familia Somoza", "Familia Chamorro", "Familia Sandino", "Familia Fonseca"]
  },
  {
    clue: "líder nicaragüense cuyo apellido inspiró el nombre del movimiento sandinista",
    answer: "Augusto César Sandino",
    options: ["Augusto César Sandino", "Rubén Darío", "José Santos Zelaya", "Pedro Joaquín Chamorro"]
  },
  {
    clue: "intervención frente a la que Augusto C. Sandino organizó resistencia en la década de 1920",
    answer: "Intervención militar de Estados Unidos",
    options: ["Intervención militar de Estados Unidos", "Ocupación británica de Managua", "Invasión francesa", "Colonización portuguesa"]
  },
  {
    clue: "año en que Augusto César Sandino fue asesinado",
    answer: "1934",
    options: ["1927", "1934", "1956", "1979"]
  },
  {
    clue: "año en que fue asesinado Anastasio Somoza García",
    answer: "1956",
    options: ["1934", "1945", "1956", "1979"]
  }
];

const questionTemplates = [
  (clue) => `¿Qué dato histórico se relaciona con ${clue}?`,
  (clue) => `¿Qué información se conoce sobre ${clue}?`,
  (clue) => `¿Cuál es el hecho histórico relacionado con ${clue}?`,
  (clue) => `¿Qué hecho histórico se vincula con ${clue}?`,
  (clue) => `¿Qué acontecimiento se asocia con ${clue}?`,
  (clue) => `¿Qué aspecto histórico se relaciona con ${clue}?`,
  (clue) => `¿Qué dato permite explicar ${clue}?`,
  (clue) => `¿Qué información histórica corresponde a ${clue}?`,
  (clue) => `¿Qué tema de la historia de Nicaragua describe ${clue}?`
];

const clueArticles = new Map([
  ["día", "el"],
  ["año", "el"],
  ["movimiento", "el"],
  ["organización", "la"],
  ["presidente", "el"],
  ["campaña", "la"],
  ["gobierno", "el"],
  ["período", "el"],
  ["objetivo", "el"],
  ["comunidades", "las"],
  ["grupo", "el"],
  ["relación", "la"],
  ["idiomas", "los"],
  ["cambio", "el"],
  ["reformas", "las"],
  ["partido", "el"],
  ["conflicto", "el"],
  ["otra", "la"],
  ["propósito", "el"],
  ["familia", "la"],
  ["líder", "el"],
  ["intervención", "la"],
  ["servicios", "los"]
]);

function formatClue(clue) {
  const firstWord = clue.split(" ", 1)[0].toLocaleLowerCase("es");
  const article = clueArticles.get(firstWord);
  return article ? `${article} ${clue}` : clue;
}

const quizProgress = document.querySelector("#quizProgress");
const quizQuestion = document.querySelector("#quizQuestion");
const quizTimer = document.querySelector("#quizTimer");
const quizTimerLabel = document.querySelector("#quizTimerLabel");
const quizTimerBar = document.querySelector("#quizTimerBar");
const quizOptions = document.querySelector("#quizOptions");
const quizFeedback = document.querySelector("#quizFeedback");
const quizNext = document.querySelector("#quizNext");
let currentQuestion = 0;
let score = 0;
let storageWarning = "";
let answerLocked = false;
let timeRemaining = 10;
let timerInterval;
let advanceTimeout;
let quizHasStarted = false;

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function createQuestions() {
  const factOrder = shuffle(quizFacts.map((_, index) => index)).slice(0, TOTAL_QUESTIONS);
  const templateOrder = shuffle(questionTemplates.map((_, index) => index));

  return factOrder.map((factIndex, questionIndex) => {
    const fact = quizFacts[factIndex];
    const templateIndex = templateOrder[questionIndex];

    return {
      id: `${factIndex}-${templateIndex}`,
      question: questionTemplates[templateIndex](formatClue(fact.clue)),
      options: fact.options,
      answer: fact.answer
    };
  });
}

function saveQuizState() {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
    storageWarning = "";
  } catch {
    storageWarning = "No se pudo guardar el juego; las preguntas podrían repetirse si recargas.";
  }
}

function loadQuizState() {
  try {
    const savedState = localStorage.getItem(QUIZ_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const hasValidQuestions = Array.isArray(parsedState.questions)
        && parsedState.questions.length === TOTAL_QUESTIONS;
      if (hasValidQuestions && typeof parsedState.completed === "boolean") {
        const questions = parsedState.questions.map((question) => {
          const [factIndex, templateIndex] = String(question.id).split("-").map(Number);
          if (!Number.isInteger(factIndex) || !Number.isInteger(templateIndex)
            || !quizFacts[factIndex] || !questionTemplates[templateIndex]) {
            throw new Error("El juego guardado contiene una pregunta inválida.");
          }

          const fact = quizFacts[factIndex];
          return {
            id: question.id,
            question: questionTemplates[templateIndex](formatClue(fact.clue)),
            options: fact.options,
            answer: fact.answer
          };
        });
        const factIds = questions.map((question) => question.id.split("-")[0]);
        const hasUniqueQuestions = new Set(factIds).size === TOTAL_QUESTIONS;
        const hasValidScore = Number.isInteger(parsedState.score)
          && parsedState.score >= 0
          && parsedState.score <= TOTAL_QUESTIONS;
        if (hasUniqueQuestions && hasValidScore) {
          return {
            questions,
            completed: parsedState.completed,
            score: parsedState.score
          };
        }
      }
    }

    const newState = { questions: createQuestions(), completed: false, score: 0 };
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(newState));
    return newState;
  } catch {
    storageWarning = "Este navegador no permite guardar el juego; las preguntas podrían repetirse si recargas.";
    return { questions: createQuestions(), completed: false, score: 0 };
  }
}

let quizState = loadQuizState();

function showQuestion() {
  const question = quizState.questions[currentQuestion];
  window.clearInterval(timerInterval);
  timerInterval = null;
  window.clearTimeout(advanceTimeout);
  answerLocked = false;
  timeRemaining = 10;
  quizProgress.textContent = `Pregunta ${currentQuestion + 1} de ${TOTAL_QUESTIONS}`;
  quizQuestion.textContent = question.question;
  quizFeedback.textContent = storageWarning;
  quizFeedback.classList.remove("is-correct", "is-incorrect");
  quizTimer.hidden = false;
  quizNext.hidden = true;
  quizOptions.replaceChildren();
  updateTimer();

  shuffle(question.options).forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(option));
    quizOptions.append(button);
  });

  if (quizHasStarted) startQuestionTimer();
}

function startQuestionTimer() {
  if (answerLocked || timerInterval) return;

  timerInterval = window.setInterval(() => {
    timeRemaining -= 1;
    updateTimer();

    if (timeRemaining <= 0) {
      finishQuestion(null);
    }
  }, 1000);
}

function updateTimer() {
  quizTimerLabel.textContent = `${timeRemaining} ${timeRemaining === 1 ? "segundo" : "segundos"}`;
  quizTimerBar.style.transform = `scaleX(${timeRemaining / 10})`;
  quizTimer.classList.toggle("is-urgent", timeRemaining <= 3);
}

function checkAnswer(selectedAnswer) {
  if (answerLocked) return;
  finishQuestion(selectedAnswer);
}

function finishQuestion(selectedAnswer) {
  if (answerLocked) return;
  answerLocked = true;
  window.clearInterval(timerInterval);
  timerInterval = null;

  const question = quizState.questions[currentQuestion];
  const optionButtons = quizOptions.querySelectorAll("button");

  optionButtons.forEach((button) => {
    button.disabled = true;
    if (button.textContent === question.answer) button.classList.add("is-correct");
    if (button.textContent === selectedAnswer && selectedAnswer !== question.answer) {
      button.classList.add("is-incorrect");
    }
  });

  if (selectedAnswer === null) {
    quizFeedback.textContent = `Se acabó el tiempo. La respuesta correcta era: ${question.answer}.`;
    quizFeedback.classList.add("is-incorrect");
  } else if (selectedAnswer === question.answer) {
    score += 1;
    quizFeedback.textContent = "¡Correcto! Muy bien.";
    quizFeedback.classList.add("is-correct");
  } else {
    quizFeedback.textContent = `Respuesta incorrecta. La respuesta correcta era: ${question.answer}.`;
    quizFeedback.classList.add("is-incorrect");
  }

  advanceTimeout = window.setTimeout(() => {
    if (currentQuestion === TOTAL_QUESTIONS - 1) {
      showResult();
      return;
    }

    currentQuestion += 1;
    showQuestion();
  }, selectedAnswer === null ? 1800 : 900);
}

function showConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const colors = ["#e9b65a", "#287b91", "#3e8c67", "#bd6e5c", "#ffffff"];
  const pieces = Array.from({ length: 60 }, () => {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.setProperty("--confetti-color", colors[Math.floor(Math.random() * colors.length)]);
    piece.style.setProperty("--confetti-x", `${Math.random() * 100}vw`);
    piece.style.setProperty("--confetti-delay", `${Math.random() * 0.6}s`);
    piece.style.setProperty("--confetti-duration", `${2 + Math.random() * 1.5}s`);
    return piece;
  });
  const confetti = document.createElement("div");
  confetti.className = "confetti";
  confetti.setAttribute("aria-hidden", "true");
  confetti.append(...pieces);
  document.body.append(confetti);
  window.setTimeout(() => confetti.remove(), 4500);
}

function showResult() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  window.clearTimeout(advanceTimeout);
  quizState.completed = true;
  quizState.score = score;
  saveQuizState();

  quizProgress.textContent = "Resultado final";
  quizQuestion.textContent = `Puntaje: ${score} de ${TOTAL_QUESTIONS}`;
  quizFeedback.classList.remove("is-correct", "is-incorrect");
  quizTimer.hidden = true;
  quizOptions.replaceChildren();

  if (score === TOTAL_QUESTIONS) {
    quizFeedback.textContent = `¡Felicidades! ¡Contestaste las ${TOTAL_QUESTIONS} preguntas correctamente!`;
    showConfetti();
  } else if (score > 0) {
    quizFeedback.textContent = `Contestaste ${score} de ${TOTAL_QUESTIONS} correctamente. ¡Hasta la próxima!`;
  } else {
    quizFeedback.textContent = "Esta vez no hubo respuestas correctas. ¡Hasta la próxima!";
  }

  quizFeedback.textContent += storageWarning ? ` ${storageWarning}` : "";
  quizNext.hidden = true;
}

if (!quizState.completed) {
  showQuestion();
  if ("IntersectionObserver" in window) {
    const quizObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        quizHasStarted = true;
        quizObserver.disconnect();
        startQuestionTimer();
      }
    }, { threshold: 0.01 });
    quizObserver.observe(quizCard);
  } else {
    quizHasStarted = true;
    startQuestionTimer();
  }
} else {
  quizProgress.textContent = "Juego completado";
  quizQuestion.textContent = "Ya respondiste las 10 preguntas.";
  quizFeedback.textContent = `Resultado guardado: ${quizState.score} de ${TOTAL_QUESTIONS}.`;
  quizTimer.hidden = true;
  quizOptions.replaceChildren();
  quizNext.hidden = true;
}
