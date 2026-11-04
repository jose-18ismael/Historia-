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

const QUIZ_STATE_KEY = "historia-nicaragua-rondas-v2";
const QUESTIONS_PER_ROUND = 9;
const TOTAL_ROUNDS = 32;

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

function shuffle(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function createRounds() {
  if (quizFacts.length !== TOTAL_ROUNDS) {
    throw new Error(`El juego necesita ${TOTAL_ROUNDS} temas históricos.`);
  }

  const factOrder = shuffle(quizFacts.map((_, index) => index));
  const templateOrders = quizFacts.map(() => shuffle(questionTemplates.map((_, index) => index)));
  const templateCounters = quizFacts.map(() => 0);

  return Array.from({ length: TOTAL_ROUNDS }, (_, roundIndex) => {
    const roundFacts = Array.from({ length: QUESTIONS_PER_ROUND }, (_, questionIndex) => (
      factOrder[(roundIndex * QUESTIONS_PER_ROUND + questionIndex) % TOTAL_ROUNDS]
    ));

    return shuffle(roundFacts.map((factIndex) => {
      const fact = quizFacts[factIndex];
      const templateIndex = templateOrders[factIndex][templateCounters[factIndex]];
      templateCounters[factIndex] += 1;

      return {
        id: `${factIndex}-${templateIndex}`,
        question: questionTemplates[templateIndex](formatClue(fact.clue)),
        options: fact.options,
        answer: fact.answer
      };
    }));
  });
}

function saveQuizState() {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
    storageWarning = "";
  } catch {
    storageWarning = "No se pudieron guardar las rondas; si recargas, podrían repetirse.";
  }
}

function loadQuizState() {
  try {
    const savedState = localStorage.getItem(QUIZ_STATE_KEY);
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      const hasValidRounds = Array.isArray(parsedState.rounds)
        && parsedState.rounds.length === TOTAL_ROUNDS
        && parsedState.rounds.every((round) => (
          Array.isArray(round) && round.length === QUESTIONS_PER_ROUND
        ));
      const hasValidRoundIndex = Number.isInteger(parsedState.nextRound)
        && parsedState.nextRound >= 0
        && parsedState.nextRound <= TOTAL_ROUNDS;

      if (hasValidRounds && hasValidRoundIndex) {
        const updatedState = {
          ...parsedState,
          rounds: parsedState.rounds.map((round) => round.map((question) => {
            const [factIndex, templateIndex] = String(question.id).split("-").map(Number);
            if (!Number.isInteger(factIndex) || !Number.isInteger(templateIndex)
              || !quizFacts[factIndex] || !questionTemplates[templateIndex]) {
              return question;
            }

            return {
              ...question,
              question: questionTemplates[templateIndex](formatClue(quizFacts[factIndex].clue))
            };
          }))
        };
        localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(updatedState));
        return updatedState;
      }
    }

    const newState = { rounds: createRounds(), nextRound: 0 };
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(newState));
    return newState;
  } catch {
    storageWarning = "Este navegador no permite guardar las rondas; podrían repetirse si recargas.";
    return { rounds: createRounds(), nextRound: 0 };
  }
}

let quizState = loadQuizState();

function showQuestion() {
  const round = quizState.rounds[quizState.nextRound];
  const question = round[currentQuestion];
  window.clearInterval(timerInterval);
  window.clearTimeout(advanceTimeout);
  answerLocked = false;
  timeRemaining = 10;
  quizProgress.textContent = `Grupo ${quizState.nextRound + 1} de ${TOTAL_ROUNDS} · Pregunta ${currentQuestion + 1} de ${QUESTIONS_PER_ROUND}`;
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

  const question = quizState.rounds[quizState.nextRound][currentQuestion];
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
    if (currentQuestion === QUESTIONS_PER_ROUND - 1) {
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
  window.clearTimeout(advanceTimeout);
  const completedGroup = quizState.nextRound + 1;
  quizState.nextRound += 1;
  currentQuestion = QUESTIONS_PER_ROUND;
  saveQuizState();

  quizProgress.textContent = `Resultado del grupo ${completedGroup} de ${TOTAL_ROUNDS}`;
  quizQuestion.textContent = `Puntaje: ${score} de ${QUESTIONS_PER_ROUND}`;
  quizFeedback.classList.remove("is-correct", "is-incorrect");
  quizTimer.hidden = true;
  quizOptions.replaceChildren();

  if (score === QUESTIONS_PER_ROUND) {
    quizFeedback.textContent = "¡Felicidades! ¡Contestaste las 9 preguntas correctamente!";
    showConfetti();
  } else if (score > 0) {
    quizFeedback.textContent = `Contestaste ${score} de 9 correctamente. ¡Hasta la próxima!`;
  } else {
    quizFeedback.textContent = "Esta vez no hubo respuestas correctas. ¡Hasta la próxima!";
  }

  if (quizState.nextRound === TOTAL_ROUNDS) {
    quizFeedback.textContent += " Se completaron los 32 grupos.";
    quizNext.hidden = true;
    return;
  }

  const nextGroupMessage = [
    `Grupo siguiente: ${quizState.nextRound + 1}. Pasa la compu al siguiente compañero.`,
    storageWarning
  ].filter(Boolean).join(" ");
  quizFeedback.textContent += ` ${nextGroupMessage}`;
  quizNext.hidden = false;
  quizNext.textContent = `Siguiente grupo (${quizState.nextRound + 1} de ${TOTAL_ROUNDS}) →`;
}

quizNext.addEventListener("click", () => {
  if (currentQuestion !== QUESTIONS_PER_ROUND || quizState.nextRound >= TOTAL_ROUNDS) return;
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

if (quizState.nextRound < TOTAL_ROUNDS) {
  showQuestion();
} else {
  quizProgress.textContent = "Juego terminado";
  quizQuestion.textContent = "Los 32 grupos ya jugaron.";
  quizFeedback.textContent = "Se completaron las 288 preguntas de esta computadora.";
  quizTimer.hidden = true;
  quizOptions.replaceChildren();
  quizNext.hidden = true;
}
