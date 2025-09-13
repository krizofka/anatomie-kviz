// Anatomie Quiz Data
const quizData = [
    {
        question: "Kolik kostí má dospělý člověk?",
        answers: [
            "206 kostí",
            "186 kostí", 
            "226 kostí",
            "196 kostí"
        ],
        correct: 0
    },
    {
        question: "Které je největší orgán v lidském těle?",
        answers: [
            "Játra",
            "Plíce",
            "Kůže",
            "Srdce"
        ],
        correct: 2
    },
    {
        question: "Kolik komor má lidské srdce?",
        answers: [
            "2 komory",
            "3 komory",
            "4 komory",
            "5 komor"
        ],
        correct: 2
    },
    {
        question: "Která kost je nejdelší v lidském těle?",
        answers: [
            "Holenní kost",
            "Stehenní kost",
            "Kost pažní",
            "Loketní kost"
        ],
        correct: 1
    },
    {
        question: "Kolik párů žeber má člověk?",
        answers: [
            "10 párů",
            "11 párů",
            "12 párů",
            "13 párů"
        ],
        correct: 2
    },
    {
        question: "Ve které části mozku se nachází centrum pro řízení rovnováhy?",
        answers: [
            "Mozeček",
            "Prodloužená mícha",
            "Mozkový kmen",
            "Velký mozek"
        ],
        correct: 0
    },
    {
        question: "Kolik litrů krve má průměrný dospělý člověk?",
        answers: [
            "3-4 litry",
            "5-6 litrů",
            "7-8 litrů",
            "9-10 litrů"
        ],
        correct: 1
    },
    {
        question: "Která žláza produkuje inzulin?",
        answers: [
            "Štítná žláza",
            "Nadledvinky",
            "Slinivka břišní",
            "Hypofýza"
        ],
        correct: 2
    },
    {
        question: "Kolik obratlů má lidská páteř?",
        answers: [
            "31-33 obratlů",
            "28-30 obratlů",
            "33-35 obratlů",
            "26-28 obratlů"
        ],
        correct: 2
    },
    {
        question: "Která část oka je zodpovědná za ostrost vidění?",
        answers: [
            "Rohovka",
            "Duhovka",
            "Sítnice",
            "Čočka"
        ],
        correct: 2
    }
];

// Quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];
let quizStarted = false;

// DOM elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const reviewBtn = document.getElementById('review-btn');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const progress = document.getElementById('progress');

const scorePercentage = document.getElementById('score-percentage');
const scoreText = document.getElementById('score-text');
const scoreMessage = document.getElementById('score-message');

// Initialize quiz
function initQuiz() {
    totalQuestionsSpan.textContent = quizData.length;
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    reviewBtn.addEventListener('click', reviewAnswers);
}

// Start quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    showScreen('quiz');
    displayQuestion();
}

// Display current question
function displayQuestion() {
    const question = quizData[currentQuestion];
    
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Update progress bar
    const progressPercentage = ((currentQuestion) / quizData.length) * 100;
    progress.style.width = progressPercentage + '%';
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer options
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer;
        answerElement.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(answerElement);
    });
    
    // Reset next button
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Dokončit kvíz' : 'Další otázka';
}

// Select answer
function selectAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const answerOptions = document.querySelectorAll('.answer-option');
    
    // Remove previous selections
    answerOptions.forEach(option => {
        option.classList.remove('selected', 'correct', 'incorrect');
    });
    
    // Mark selected answer
    answerOptions[selectedIndex].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Show correct answer
    setTimeout(() => {
        answerOptions[question.correct].classList.add('correct');
        if (selectedIndex !== question.correct) {
            answerOptions[selectedIndex].classList.add('incorrect');
        } else {
            score++;
        }
        
        // Disable all options
        answerOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        // Enable next button
        nextBtn.disabled = false;
    }, 500);
}

// Next question or finish quiz
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    const percentage = Math.round((score / quizData.length) * 100);
    
    scorePercentage.textContent = percentage + '%';
    scoreText.textContent = `Odpověděl jste správně na ${score} z ${quizData.length} otázek`;
    
    // Update progress bar to 100%
    progress.style.width = '100%';
    
    // Show appropriate message based on score
    let messageText = '';
    let messageClass = '';
    
    if (percentage >= 80) {
        messageText = 'Výborně! Máte velmi dobré znalosti anatomie.';
        messageClass = 'excellent';
    } else if (percentage >= 60) {
        messageText = 'Dobře! Vaše znalosti jsou na solidní úrovni.';
        messageClass = 'good';
    } else {
        messageText = 'Zkuste to znovu. Je třeba si více zopakovat anatomii.';
        messageClass = 'needs-improvement';
    }
    
    scoreMessage.textContent = messageText;
    scoreMessage.className = 'score-message ' + messageClass;
    
    showScreen('results');
}

// Review answers
function reviewAnswers() {
    currentQuestion = 0;
    showScreen('quiz');
    displayReview();
}

// Display review mode
function displayReview() {
    const question = quizData[currentQuestion];
    
    questionText.textContent = question.question;
    currentQuestionSpan.textContent = currentQuestion + 1;
    
    // Clear previous answers
    answersContainer.innerHTML = '';
    
    // Create answer options with review styling
    question.answers.forEach((answer, index) => {
        const answerElement = document.createElement('div');
        answerElement.className = 'answer-option';
        answerElement.textContent = answer;
        
        // Show correct answer
        if (index === question.correct) {
            answerElement.classList.add('correct');
        }
        
        // Show user's answer if wrong
        if (userAnswers[currentQuestion] === index && index !== question.correct) {
            answerElement.classList.add('incorrect');
        }
        
        // Disable clicking
        answerElement.style.pointerEvents = 'none';
        answersContainer.appendChild(answerElement);
    });
    
    // Update next button for review mode
    nextBtn.disabled = false;
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Zpět na výsledky' : 'Další otázka';
    
    // Handle review navigation
    nextBtn.onclick = () => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            displayReview();
        } else {
            showResults();
            nextBtn.onclick = nextQuestion; // Reset to normal behavior
        }
    };
}

// Restart quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    nextBtn.onclick = nextQuestion; // Reset to normal behavior
    showScreen('start');
}

// Show specific screen
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    switch(screenName) {
        case 'start':
            startScreen.classList.add('active');
            break;
        case 'quiz':
            quizScreen.classList.add('active');
            break;
        case 'results':
            resultsScreen.classList.add('active');
            break;
    }
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);