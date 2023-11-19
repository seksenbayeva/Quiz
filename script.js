const quizData = [
    {
        question: 'Кто был лучшим другом Джеймса Поттера во времена его учебы в Хогвартсе?',
        options: ['Сириус Блэк', 'Северус Снейп', 'Римус Люпин', 'Альбус Дамблдор'],
        answer: 'Сириус Блэк',
        image: '1.gif',
    },
    {
        question: 'Кто является автором книги "Руководство по уходу за магическими существами"?',
        options: ['Сириус Блэк', 'Северус Снейп', 'Ньют Скамандер', 'Альбус Дамблдор'],
        answer: 'Ньют Скамандер',
        image: '2.gif'
    },
    {
        question: 'Название леса, который окружает Хогвартс и служит убежищем для многих волшебных существ?',
        options: ['Магический лес', 'Запретный лес', 'Загадочный лес', 'Лес магических существ'],
        answer: 'Запретный лес',
        image: '3.gif'
    },
    {
        question: 'Какое заклинание используется для призыва метлы в мире Гарри Поттера?',
        options: ['Экспеллиармус', 'Авада Кедавра', 'Люмос', 'Акцио'],
        answer: 'Акцио',
        image: '4.gif',
    },
    {
        question: 'Как называется школа для волшебников, расположенная в России?',
        options: ['Хогвартс', 'Дурмстранг', 'Бобблетон', 'Бергамот'],
        answer: 'Дурмстранг',
        image: '5.gif',
    },
    {
        question: 'Как зовут домашнего эльфа, служившего у семьи Малфоев?',
        options: ['Кричи', 'Винки', 'Крэч', 'Добби'],
        answer: 'Добби',
        image: 'Hogwarts Express ticket.jpeg',
    },
    {
        question: 'Кто является капитаном квиддича в команде Гриффиндора?',
        options: ['Оливер Вуд', 'Рон Уизли', 'Гарри Поттер', 'Фред Уизли'],
        answer: 'Оливер Вуд',
        image: '7.gif',
    },
];


const welcomePage = document.getElementById('welcomePage');
const startButton = document.getElementById('start');
const quizContainer = document.getElementById('quizContainer');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const finishButton = document.getElementById('finish');
const showAnswerButton = document.getElementById('showAnswer');


let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

quizContainer.style.display = 'none';
submitButton.style.display = 'none';
retryButton.style.display = 'none';
finishButton.style.display = 'none';
showAnswerButton.style.display = 'none';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startQuiz() {
    welcomePage.style.display = 'none';
    quizContainer.style.display = 'block';
    submitButton.style.display = 'block';
    displayQuestion();
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];

    const imageElement = document.createElement('img');
    imageElement.src = questionData.image;
    imageElement.alt = 'Question Image';
    imageElement.className = 'question-image';

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
    quizContainer.appendChild(imageElement);

    // Check if it's the last question
    if (currentQuestion === quizData.length - 1) {
        // Change the button text to "Finish"
        nextButton.textContent = 'Завершить';
    } else {
        // Otherwise, keep it as "Next"
        nextButton.textContent = 'Следующий';
    }
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
    retryButton.classList.remove('hide');
    showAnswerButton.style.display = 'inline-block';

    const totalScore = score / quizData.length;
    let emoji;

    if (totalScore === 1) {
        emoji = '😃'; // Полный балл
    } else if (totalScore >= 0.7) {
        emoji = '😐'; // Высокий балл (подстройте порог по необходимости)
    } else {
        emoji = '😢'; // Низкий балл
    }

    resultContainer.innerHTML = `Ваш результат: ${score} из ${quizData.length}! ${emoji}`;

    // Выводим в консоль неправильные ответы
    console.log('Неверные ответы:', incorrectAnswers);
}


function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    finishButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    finishButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    const totalScore = score / quizData.length;
    let emoji;

    let incorrectAnswersHTML = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHTML += `
        <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
        `;

        if (totalScore === 1) {
            emoji = '😃'; // Полный балл
        } else if (totalScore >= 0.7) {
            emoji = '😐'; // Высокий балл (подстройте порог по необходимости)
        } else {
            emoji = '😢'; // Низкий балл
        }
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHTML}
    `;

    wrongAnswersContainer.innerHTML = incorrectAnswersHTML;
    wrongAnswersContainer.style.display = 'block';
}

submitButton.addEventListener('click', function () {
    checkAnswer();
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        displayResult();
    }
});

finishButton.addEventListener('click', showAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
startButton.addEventListener('click', startQuiz);

displayQuestion();

