const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackContainer = document.getElementById('feedback-container');
const feedbackText = document.getElementById('feedback-text');
const correctAnswerDisplay = document.getElementById('correct-answer-display');
const resultContainerElement = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz');

let currentQuestionIndex;
let score;

// The 3 specific questions you provided
const questions = [
    {
        question: "1. What is Nemesis?",
        answers: [
            { text: "A gaming platform", correct: false },
            { text: "A DeFi protocol for trading on-chain tokens", correct: true },
            { text: "A social media app", correct: false },
            { text: "A centralized exchange", correct: false }
        ],
        correctOptionChar: "B" // For displaying "B. A DeFi protocol..."
    },
    {
        question: "2. What are Nemesis Arena Tickets?",
        answers: [
            { text: "Entry passes for crypto conferences", correct: false },
            { text: "Tokens used for staking rewards", correct: false },
            { text: "Access tickets to participate in Nemesis trading events or competitions", correct: true },
            { text: "Lottery coupons for NFT giveaways", correct: false }
        ],
        correctOptionChar: "C"
    },
    {
        question: "3. What is $NEMESIS and its public sale?",
        answers: [
            { text: "A meme coin", correct: false },
            { text: "The utility token of the Nemesis protocol", correct: true },
            { text: "A stablecoin", correct: false },
            { text: "A governance token for another project", correct: false }
        ],
        correctOptionChar: "B"
    }
];

// Event listener for the "Next Question" / "Play Again" button
nextButton.addEventListener('click', handleNextButton);

// --- Core Functions ---

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.classList.remove('hide');
    resultContainerElement.classList.add('hide');
    resultContainerElement.innerHTML = ''; // Clear previous results
    questionTextElement.style.display = 'block'; // Ensure question is visible
    feedbackContainer.classList.add('hide'); // Hide feedback initially
    nextButton.innerText = "Next Question"; // Reset button text
    
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    const optionChars = ['A', 'B', 'C', 'D']; // To label options
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = `${optionChars[index]}. ${answer.text}`; // Add A, B, C, D
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button, question));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    feedbackContainer.classList.add('hide'); // Hide feedback when moving to next question
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedButton, currentQuestion) {
    // Disable all buttons
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    const correctButton = Array.from(answerButtonsElement.children).find(button => button.dataset.correct === "true");
    
    // Provide feedback
    feedbackContainer.classList.remove('hide');
    if (selectedButton && selectedButton.dataset.correct === "true") {
        selectedButton.classList.add('correct');
        feedbackText.innerText = "Your answer is Correct!";
        feedbackText.style.color = '#1DB954'; // Green
        score++;
    } else {
        if (selectedButton) { // If an answer was chosen, and it was wrong
            selectedButton.classList.add('wrong');
            feedbackText.innerText = "Your answer is Incorrect.";
            feedbackText.style.color = '#dc3545'; // Red
        } else { // If no button was selected (e.g., if there was a timer and it ran out)
            feedbackText.innerText = "Time's up!"; // Or similar message
            feedbackText.style.color = '#dc3545';
        }
    }
    
    // Always show the correct answer
    if (correctButton) {
        correctButton.classList.add('correct'); // Highlight correct answer
        const correctText = correctButton.innerText;
        correctAnswerDisplay.innerText = `The correct answer was: ${correctText}`;
    }

    // Set button text for next action
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.innerText = "Next Question";
    } else {
        nextButton.innerText = "Show Results";
    }
    nextButton.classList.remove('hide');
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    resetState();
    questionTextElement.style.display = 'none'; // Hide question
    resultContainerElement.classList.remove('hide'); // Show result area
    
    const resultTitle = document.createElement('h2');
    resultTitle.innerText = `You scored ${score} out of ${questions.length} questions.`;
    if (score === questions.length) {
        resultTitle.style.color = '#1DB954'; // Green for perfect score
    } else {
        resultTitle.style.color = '#e94560'; // Red for not perfect
    }
    resultContainerElement.appendChild(resultTitle);

    nextButton.innerText = "Play Again";
    nextButton.removeEventListener('click', handleNextButton); // Remove old listener
    nextButton.addEventListener('click', startQuiz); // Add listener to restart quiz
    nextButton.classList.remove('hide');
}

// Start the quiz when the page loads
startQuiz();
