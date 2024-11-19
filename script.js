const quizData = [
  {
    question: 'Which river is known as the "Ganga" in India?',
    options: ['Yamuna', 'Brahmaputra', 'Indus', 'Ganges'],
    answer: 'Ganges',
  },
  {
    question: 'Who was the first Prime Minister of India?',
    options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Sardar Vallabhbhai Patel', 'Indira Gandhi'],
    answer: 'Jawaharlal Nehru',
  },
  {
    question: 'What is the national bird of India?',
    options: ['Peacock', 'Sparrow', 'Pigeon', 'Crow'],
    answer: 'Peacock',
  },
  {
    question: 'Which city is known as the "Pink City" of India?',
    options: ['Jaipur', 'Udaipur', 'Jodhpur', 'Agra'],
    answer: 'Jaipur',
  },
  {
    question: 'Who wrote the Indian national anthem "Jana Gana Mana"?',
    options: ['Rabindranath Tagore', 'Mahatma Gandhi', 'Subhas Chandra Bose', 'Jawaharlal Nehru'],
    answer: 'Rabindranath Tagore',
  },
  {
    question: 'What is the currency of India?',
    options: ['Rupee', 'Dollar', 'Euro', 'Pound'],
    answer: 'Rupee',
  },
  {
    question: 'Which mountain range separates India from China?',
    options: ['Himalayas', 'Western Ghats', 'Eastern Ghats', 'Aravalli Range'],
    answer: 'Himalayas',
  },
  {
    question: 'In which year did India gain independence from British rule?',
    options: ['1947', '1950', '1945', '1930'],
    answer: '1947',
  },
  {
    question: 'Who is known as the "Father of the Indian Constitution"?',
    options: ['Jawaharlal Nehru', 'B.R. Ambedkar', 'Mahatma Gandhi', 'Sardar Vallabhbhai Patel'],
    answer: 'B.R. Ambedkar',
  },
  {
    question: 'Which Indian state is known as the "Land of Five Rivers"?',
    options: ['Punjab', 'Maharashtra', 'Kerala', 'Gujarat'],
    answer: 'Punjab',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();