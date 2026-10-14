"use strict";

const QUESTIONS_PER_TEST = 10;
const CSV_FILE = "questions.csv";

let allQuestions = [];
let currentQuestions = [];
let currentAnswers = [];

document.addEventListener("DOMContentLoaded", function () {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.startButton.addEventListener("click", startNewTest);
  elements.resetButton.addEventListener("click", showSetupPanel);
  elements.tryAgainButton.addEventListener("click", startNewTest);
  elements.backToStartButton.addEventListener("click", showSetupPanel);
  elements.quizForm.addEventListener("submit", submitTest);
  elements.csvInput.addEventListener("change", loadSelectedCsv);

  loadDefaultCsv();
});

/*
  Get all required HTML elements.
*/
function getElements() {
  const ids = [
    "setupPanel",
    "quizPanel",
    "resultsPanel",
    "startButton",
    "resetButton",
    "tryAgainButton",
    "backToStartButton",
    "csvInput",
    "quizForm",
    "questionsContainer",
    "reviewContainer",
    "statusMessage",
    "progressText",
    "scoreSummary"
  ];

  const elements = {};

  for (let i = 0; i < ids.length; i += 1) {
    const element = document.getElementById(ids[i]);

    if (!element) {
      console.error("Missing HTML element: #" + ids[i]);
      return null;
    }

    elements[ids[i]] = element;
  }

  return elements;
}

/*
  Load questions.csv from the same folder.
*/
function loadDefaultCsv() {
  const elements = getElements();

  setStatus("Loading questions.csv...");

  fetch(CSV_FILE, { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("questions.csv could not be loaded.");
      }

      return response.text();
    })
    .then(function (csvText) {
      processCsv(csvText, CSV_FILE);
    })
    .catch(function (error) {
      console.error(error);

      if (elements) {
        elements.startButton.disabled = true;
      }

      setStatus(
        "Questions could not be loaded. Run the app using a local server, then refresh the page.",
        true
      );
    });
}

/*
  Load a CSV selected manually by the user.
*/
function loadSelectedCsv(event) {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    processCsv(String(reader.result), file.name);
  };

  reader.onerror = function () {
    setStatus("The selected CSV file could not be read.", true);
  };

  reader.readAsText(file);
}

/*
  Parse and validate CSV content.
*/
function processCsv(csvText, fileName) {
  try {
    const rows = parseCsv(csvText);

    if (rows.length < 2) {
      throw new Error("The CSV must contain a header row and question rows.");
    }

    const headers = rows[0].map(normalizeHeader);
    const questions = [];

    for (let i = 1; i < rows.length; i += 1) {
      const question = convertRowToQuestion(headers, rows[i]);

      if (question) {
        questions.push(question);
      }
    }

    if (questions.length < QUESTIONS_PER_TEST) {
      throw new Error(
        "At least " +
          QUESTIONS_PER_TEST +
          " valid questions are required. Found " +
          questions.length +
          "."
      );
    }

    allQuestions = questions;

    const elements = getElements();

    if (elements) {
      elements.startButton.disabled = false;
    }

    setStatus(
      "Loaded " + allQuestions.length + " questions from " + fileName + "."
    );
  } catch (error) {
    console.error(error);
    allQuestions = [];

    const elements = getElements();

    if (elements) {
      elements.startButton.disabled = true;
    }

    setStatus("CSV error: " + error.message, true);
  }
}

/*
  CSV parser supporting quoted fields and commas inside quoted fields.
*/
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];
    const nextCharacter = text[i + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        field += '"';
        i += 1;
      } else {
        insideQuotes = !insideQuotes;
      }

      continue;
    }

    if (character === "," && !insideQuotes) {
      row.push(field.trim());
      field = "";
      continue;
    }

    if (
      (character === "\n" || character === "\r") &&
      !insideQuotes
    ) {
      if (character === "\r" && nextCharacter === "\n") {
        i += 1;
      }

      row.push(field.trim());
      field = "";

      if (row.some(function (value) {
        return value !== "";
      })) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    field += character;
  }

  if (field !== "" || row.length > 0) {
    row.push(field.trim());

    if (row.some(function (value) {
      return value !== "";
    })) {
      rows.push(row);
    }
  }

  return rows;
}

/*
  Normalize CSV header names.
*/
function normalizeHeader(header) {
  return String(header)
    .replace(/^\uFEFF/, "")
    .trim()
    .toLowerCase()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
}

/*
  Convert one CSV row into a question object.
*/
function convertRowToQuestion(headers, row) {
  const word = getValue(headers, row, [
    "question word",
    "question",
    "word",
    "term"
  ]);

  const optionsText = getValue(headers, row, [
    "options",
    "answers",
    "choices"
  ]);

  const correctAnswerText = getValue(headers, row, [
    "correct answer",
    "correct",
    "answer"
  ]);

  const meaning = getValue(headers, row, [
    "meaning",
    "definition"
  ]);

  const explanation = getValue(headers, row, [
    "explanation",
    "reason"
  ]);

  const synonyms = getValue(headers, row, [
    "synonyms",
    "related synonyms",
    "related words"
  ]);

  const exampleSentence = getValue(headers, row, [
    "example sentence",
    "example",
    "usage",
    "example usage"
  ]);

  if (!word || !optionsText || !correctAnswerText) {
    return null;
  }

  const options = parseOptions(optionsText);
  const correctAnswer = findAnswer(options, correctAnswerText);

  if (options.length < 2 || !correctAnswer) {
    return null;
  }

  return {
    word: word,
    options: options,
    correctAnswer: correctAnswer,
    meaning: meaning || "Meaning not provided.",
    explanation: explanation || "Explanation not provided.",
    synonyms: synonyms || "No related synonyms provided.",
    exampleSentence: exampleSentence || "No example sentence provided."
  };
}

/*
  Get a value from a CSV row using possible header names.
*/
function getValue(headers, row, possibleHeaders) {
  for (let i = 0; i < possibleHeaders.length; i += 1) {
    const headerIndex = headers.indexOf(possibleHeaders[i]);

    if (headerIndex !== -1 && row[headerIndex] !== undefined) {
      return String(row[headerIndex]).trim();
    }
  }

  return "";
}

/*
  Split the Options column.
  Preferred format: Option 1|Option 2|Option 3|Option 4
*/
function parseOptions(value) {
  const text = String(value || "").trim();

  if (!text) {
    return [];
  }

  let separator = "|";

  if (text.indexOf("|") === -1) {
    if (text.indexOf(";") !== -1) {
      separator = ";";
    } else if (text.indexOf(",") !== -1) {
      separator = ",";
    }
  }

  return text
    .split(separator)
    .map(function (option) {
      return option.trim();
    })
    .filter(function (option) {
      return option.length > 0;
    });
}

/*
  Find the correct option while ignoring capitalization and extra spaces.
*/
function findAnswer(options, answer) {
  const expected = normalizeAnswer(answer);

  for (let i = 0; i < options.length; i += 1) {
    if (normalizeAnswer(options[i]) === expected) {
      return options[i];
    }
  }

  return null;
}

function normalizeAnswer(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/*
  Start a new randomized test.
*/
function startNewTest() {
  if (allQuestions.length < QUESTIONS_PER_TEST) {
    setStatus(
      "There are not enough valid questions to start the test.",
      true
    );
    return;
  }

  currentQuestions = shuffle(allQuestions)
    .slice(0, QUESTIONS_PER_TEST)
    .map(function (question) {
      return {
        word: question.word,
        options: shuffle(question.options.slice()),
        correctAnswer: question.correctAnswer,
        meaning: question.meaning,
        explanation: question.explanation,
        synonyms: question.synonyms,
        exampleSentence: question.exampleSentence
      };
    });

  currentAnswers = [];

  renderQuiz();
  showQuizPanel();
}

/*
  Render the current quiz.
*/
function renderQuiz() {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.questionsContainer.innerHTML = "";

  currentQuestions.forEach(function (question, questionIndex) {
    const card = document.createElement("article");
    card.className = "question-card";

    const number = document.createElement("div");
    number.className = "question-number";
    number.textContent =
      "Question " +
      (questionIndex + 1) +
      " of " +
      currentQuestions.length;

    const title = document.createElement("h3");
    title.className = "question-word";
    title.textContent =
      "Which word is closest in meaning to “" +
      question.word +
      "”?";

    const optionsList = document.createElement("div");
    optionsList.className = "options-list";

    question.options.forEach(function (option, optionIndex) {
      const label = document.createElement("label");
      label.className = "option-label";

      const input = document.createElement("input");
      input.type = "radio";
      input.name = "question-" + questionIndex;
      input.value = option;
      input.id =
        "question-" + questionIndex + "-option-" + optionIndex;
      input.required = true;

      const text = document.createElement("span");
      text.textContent = option;

      label.htmlFor = input.id;
      label.appendChild(input);
      label.appendChild(text);
      optionsList.appendChild(label);
    });

    card.appendChild(number);
    card.appendChild(title);
    card.appendChild(optionsList);

    elements.questionsContainer.appendChild(card);
  });

  elements.progressText.textContent =
    "Question 1 of " + currentQuestions.length;
}

/*
  Submit the test and calculate results.
*/
function submitTest(event) {
  event.preventDefault();

  const elements = getElements();

  if (!elements) {
    return;
  }

  const formData = new FormData(elements.quizForm);
  let score = 0;

  currentAnswers = currentQuestions.map(function (question, index) {
    const selectedAnswer = formData.get("question-" + index) || "";
    const isCorrect =
      normalizeAnswer(selectedAnswer) ===
      normalizeAnswer(question.correctAnswer);

    if (isCorrect) {
      score += 1;
    }

    return {
      question: question,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    };
  });

  renderResults(score);
  showResultsPanel();
}

/*
  Render score and detailed answer review.
*/
function renderResults(score) {
  const elements = getElements();

  if (!elements) {
    return;
  }

  const total = currentQuestions.length;
  const percentage = Math.round((score / total) * 100);

  elements.scoreSummary.innerHTML = "";

  const scoreNumber = document.createElement("span");
  scoreNumber.className = "score-number";
  scoreNumber.textContent = score + "/" + total;

  const scoreLabel = document.createElement("span");
  scoreLabel.className = "score-label";
  scoreLabel.textContent = percentage + "%";

  elements.scoreSummary.appendChild(scoreNumber);
  elements.scoreSummary.appendChild(scoreLabel);

  elements.reviewContainer.innerHTML = "";

  currentAnswers.forEach(function (result, index) {
    const card = document.createElement("article");
    card.className =
      "review-card " + (result.isCorrect ? "correct" : "incorrect");

    const status = document.createElement("div");
    status.className = "review-status";
    status.textContent = result.isCorrect ? "Correct" : "Incorrect";

    const title = document.createElement("h4");
    title.textContent =
      index + 1 + ". " + result.question.word;

    card.appendChild(status);
    card.appendChild(title);
    addReviewLine(card, "Your answer", result.selectedAnswer || "No answer");
    addReviewLine(card, "Correct answer", result.question.correctAnswer);
    addReviewLine(card, "Meaning", result.question.meaning);
    addReviewLine(card, "Why it is correct", result.question.explanation);
    addReviewLine(card, "Related synonyms", result.question.synonyms);
    addReviewLine(card, "Example", result.question.exampleSentence);

    elements.reviewContainer.appendChild(card);
  });
}

/*
  Add one review paragraph safely.
*/
function addReviewLine(parent, label, value) {
  const paragraph = document.createElement("p");

  const strong = document.createElement("strong");
  strong.textContent = label + ": ";

  paragraph.appendChild(strong);
  paragraph.appendChild(document.createTextNode(value));

  parent.appendChild(paragraph);
}

/*
  Show the setup screen.
*/
function showSetupPanel() {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.setupPanel.classList.remove("hidden");
  elements.quizPanel.classList.add("hidden");
  elements.resultsPanel.classList.add("hidden");
}

/*
  Show the quiz screen.
*/
function showQuizPanel() {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.setupPanel.classList.add("hidden");
  elements.quizPanel.classList.remove("hidden");
  elements.resultsPanel.classList.add("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/*
  Show the results screen.
*/
function showResultsPanel() {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.setupPanel.classList.add("hidden");
  elements.quizPanel.classList.add("hidden");
  elements.resultsPanel.classList.remove("hidden");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/*
  Update status text.
*/
function setStatus(message, isError) {
  const elements = getElements();

  if (!elements) {
    return;
  }

  elements.statusMessage.textContent = message;
  elements.statusMessage.style.color = isError ? "#b91c1c" : "";
}

/*
  Fisher-Yates shuffle.
*/
function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporary = items[i];
    items[i] = items[randomIndex];
    items[randomIndex] = temporary;
  }

  return items;
}