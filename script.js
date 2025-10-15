// --- Get HTML elements ---
const questionTextElement = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const nextButton = document.getElementById('next-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const quizContainer = document.getElementById('quiz');
const startQuizButton = document.getElementById('start-quiz-btn');
const bodyElement = document.body;
const timerElement = document.getElementById('timer');
const alreadyPlayedMsg = document.getElementById('already-played-msg');

let quizQuestions = []; 
let currentQuestionIndex;
let score;
let countdownInterval;
let timeLeft;

// Your full list of 30+ questions
const allQuestions = [
    {
        question: "What is Nemesis’s core offering?",
        answers: [
            { text: "A centralized trading platform for derivatives", correct: false },
            { text: "A protocol to buy or short any on-chain token", correct: true },
            { text: "A crypto lending marketplace", correct: false },
            { text: "A stablecoin issuance platform", correct: false }
        ]
    },
    {
        question: "Which term describes the novel liquidity framework used by Nemesis?",
        answers: [
            { text: "Automated Market Maker (AMM)", correct: false },
            { text: "Order Book Matching Engine", correct: false },
            { text: "Omni-Directional Market Maker (OMM)", correct: true },
            { text: "Centralized Liquidity Pool (CLP)", correct: false }
        ]
    },
    {
        question: "What feature allows Nemesis users to trade with leverage?",
        answers: [
            { text: "10× margin lending", correct: false },
            { text: "Futures contracts", correct: false },
            { text: "Embedded leverage up to 5×", correct: true },
            { text: "Options trading", correct: false }
        ]
    },
    {
        question: "Which of the following is not a characteristic of Nemesis’s design?",
        answers: [
            { text: "Oracle independence", correct: false },
            { text: "Fully decentralized architecture", correct: false },
            { text: "Permissioned market makers", correct: true },
            { text: "On-chain trading, market making, and liquidations", correct: false }
        ]
    },
    {
        question: "How does Nemesis achieve price feeds without relying on external oracles?",
        answers: [
            { text: "By using centralized price feeds", correct: false },
            { text: "Through a native Time-Weighted Average Price (TWAP) oracle", correct: true },
            { text: "Via aggregated external oracles like Chainlink", correct: false },
            { text: "By letting users submit their own prices", correct: false }
        ]
    },
    {
        question: "What benefit do liquidity providers get on Nemesis?",
        answers: [
            { text: "Only trading fees", correct: false },
            { text: "Only interest income", correct: false },
            { text: "Both trading fees and interest income", correct: true },
            { text: "Fixed returns guaranteed by the protocol", correct: false }
        ]
    },
    {
        question: "In Nemesis, is the shorting of on-chain tokens done via derivatives?",
        answers: [
            { text: "Yes, via perpetual futures", correct: false },
            { text: "Yes, via options", correct: false },
            { text: "No, it is non-derivative design", correct: true },
            { text: "Only via margin loans", correct: false }
        ]
    },
    {
        question: "For which blockchains is Nemesis built to operate?",
        answers: [
            { text: "Only Ethereum", correct: false },
            { text: "Bitcoin and Ethereum", correct: false },
            { text: "EVM-compatible chains including Ethereum", correct: true },
            { text: "Only layer-2 chains", correct: false }
        ]
    },
    {
        question: "Which phrase best summarizes Nemesis’s transparency?",
        answers: [
            { text: "Off-chain trade matching", correct: false },
            { text: "Third-party custodians control trades", correct: false },
            { text: "All trades, market making, and liquidations occur on-chain", correct: true },
            { text: "Partially centralized clearinghouse", correct: false }
        ]
    },
    {
        question: "Which of the following is not highlighted as a design goal?",
        answers: [
            { text: "Simplicity in user experience", correct: false },
            { text: "Permissionless liquidity provision", correct: false },
            { text: "Embedded leverage", correct: false },
            { text: "Privacy via anonymous transactions", correct: true }
        ]
    },
    {
        question: "Nemesis allows users to long or short tokens without using which type of traditional instrument?",
        answers: [
            { text: "Spot trading", correct: false },
            { text: "Derivatives", correct: true },
            { text: "Liquidity pools", correct: false },
            { text: "LP tokens", correct: false }
        ]
    },
    {
        question: "What makes Nemesis different from perpetual futures platforms when shorting assets?",
        answers: [
            { text: "It charges no fees", correct: false },
            { text: "It uses off-chain execution", correct: false },
            { text: "It uses a non-derivative mechanism", correct: true },
            { text: "It requires KYC", correct: false }
        ]
    },
    {
        question: "Which best describes the OMM (Omni-Directional Market Maker)?",
        answers: [
            { text: "A pool that only supports longs", correct: false },
            { text: "A centralized liquidity hub", correct: false },
            { text: "A market maker that supports both long and short flows", correct: true },
            { text: "A layer-2 rollup", correct: false }
        ]
    },
    {
        question: "Why doesn’t Nemesis need Chainlink or other oracle providers?",
        answers: [
            { text: "It uses CEX prices", correct: false },
            { text: "It has no pricing", correct: false },
            { text: "It has a built-in TWAP oracle", correct: true },
            { text: "It copies Uniswap directly", correct: false }
        ]
    },
    {
        question: "Which feature enables leveraged exposure on Nemesis?",
        answers: [
            { text: "Collateralized loans", correct: false },
            { text: "Flash loans", correct: false },
            { text: "Embedded leverage in the protocol", correct: true },
            { text: "Option premiums", correct: false }
        ]
    },
    {
        question: "Which statement about Nemesis trading is true?",
        answers: [
            { text: "Trades are matched off-chain", correct: false },
            { text: "Market making is done by custodians", correct: false },
            { text: "Everything (trading, market making, liquidations) is on-chain", correct: true },
            { text: "Only liquidations are on-chain", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT required to create a market on Nemesis?",
        answers: [
            { text: "Deploy OMM pool", correct: false },
            { text: "Provide liquidity", correct: false },
            { text: "Get permission from admins", correct: true },
            { text: "Set parameters", correct: false }
        ]
    },
    {
        question: "How do liquidity providers earn on Nemesis?",
        answers: [
            { text: "Only governance rewards", correct: false },
            { text: "Only staking emissions", correct: false },
            { text: "Trading fees + interest income", correct: true },
            { text: "Token airdrops only", correct: false }
        ]
    },
    {
        question: "Which of the following is a design goal of Nemesis?",
        answers: [
            { text: "Centralized market makers", correct: false },
            { text: "Fully decentralized architecture", correct: true },
            { text: "KYC-gated access", correct: false },
            { text: "Fixed return guarantees", correct: false }
        ]
    },
    {
        question: "Which chains can Nemesis run on?",
        answers: [
            { text: "Bitcoin only", correct: false },
            { text: "Solana only", correct: false },
            { text: "EVM-compatible blockchains", correct: true },
            { text: "Centralized servers", correct: false }
        ]
    },
    {
        question: "What does “oracle independence” mean in Nemesis?",
        answers: [
            { text: "Prices never change", correct: false },
            { text: "Prices are derived internally without external feeds", correct: true },
            { text: "CEX prices are used", correct: false },
            { text: "Users manually set prices", correct: false }
        ]
    },
    {
        question: "Which user type directly benefits from transparent liquidations?",
        answers: [
            { text: "Only traders", correct: false },
            { text: "Only devs", correct: false },
            { text: "Traders and liquidity providers", correct: true },
            { text: "No one", correct: false }
        ]
    },
    {
        question: "If Nemesis is fully on-chain, what does that imply?",
        answers: [
            { text: "No transparency", correct: false },
            { text: "Admins execute trades manually", correct: false },
            { text: "All actions are publicly verifiable", correct: true },
            { text: "Custodians hold assets", correct: false }
        ]
    },
    {
        question: "Why is Nemesis considered permissionless?",
        answers: [
            { text: "It is centralized", correct: false },
            { text: "Anyone can trade or provide liquidity freely", correct: true },
            { text: "Only whales can use it", correct: false },
            { text: "All trades need approval", correct: false }
        ]
    },
    {
        question: "How does Nemesis simplify leverage compared to other DeFi platforms?",
        answers: [
            { text: "Requires multiple steps", correct: false },
            { text: "Uses complex derivative contracts", correct: false },
            { text: "Embeds leverage directly in trading", correct: true },
            { text: "Leverage must be borrowed from users", correct: false }
        ]
    },
    {
        question: "Which statement is FALSE?",
        answers: [
            { text: "Nemesis supports shorting", correct: false },
            { text: "Nemesis uses OMM", correct: false },
            { text: "Nemesis requires external oracles", correct: true },
            { text: "Liquidity providers earn multiple revenue streams", correct: false }
        ]
    },
    {
        question: "What happens when a trader is liquidated on Nemesis?",
        answers: [
            { text: "Loss is absorbed by protocol treasury", correct: false },
            { text: "Liquidation process is executed on-chain", correct: true },
            { text: "Loss is ignored", correct: false },
            { text: "Admin manually settles", correct: false }
        ]
    },
    {
        question: "Which system replaces the traditional AMM model?",
        answers: [
            { text: "DEX aggregator", correct: false },
            { text: "Omni-Directional Market Maker (OMM)", correct: true },
            { text: "Order book relayer", correct: false },
            { text: "Yield optimizer", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a benefit of OMM?",
        answers: [
            { text: "Supports two-sided markets", correct: false },
            { text: "Handles leverage", correct: false },
            { text: "Improves liquidity efficiency", correct: false },
            { text: "Centralizes price control", correct: true }
        ]
    },
    {
        question: "Why is Nemesis more transparent than CEXs?",
        answers: [
            { text: "It hides trading data", correct: false },
            { text: "All logic is on-chain and verifiable", correct: true },
            { text: "It uses bots to mask trades", correct: false },
            { text: "It only shows aggregated metrics", correct: false }
        ]
    },
    {
        question: "Which approach to market creation fits Nemesis?",
        answers: [
            { text: "Requires admin listing", correct: false },
            { text: "Only supports top 10 tokens", correct: false },
            { text: "Permissionless market deployment", correct: true },
            { text: "Must apply for approval", correct: false }
        ]
    },
    {
        question: "In Nemesis, who controls funds used in trading?",
        answers: [
            { text: "Central custodian", correct: false },
            { text: "Market maker firm", correct: false },
            { text: "Smart contracts (non-custodial)", correct: true },
            { text: "Exchange treasury", correct: false }
        ]
    }
];

// --- Event Listeners ---
startQuizButton.addEventListener('click', startQuiz);

// --- Core Functions ---

function startTimer() {
    timeLeft = 15;
    timerElement.innerText = timeLeft;
    timerElement.classList.remove('hide');

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            selectAnswer(null); // Pass null to indicate time ran out
        }
    }, 1000);
}

function startQuiz() {
    welcomeScreen.classList.add('hide');
    quizContainer.classList.remove('hide');
    bodyElement.classList.remove('welcome-active');

    const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
    quizQuestions = shuffledQuestions.slice(0, 3);
    
    currentQuestionIndex = 0;
    score = 0;
    
    resultContainerElement.classList.add('hide');
    resultContainerElement.innerHTML = '';
    questionTextElement.style.display = 'block';

    nextButton.removeEventListener('click', showWelcomeScreen);
    nextButton.addEventListener('click', handleNextButton);

    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(quizQuestions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionTextElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', () => selectAnswer(button));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(selectedButton) {
    clearInterval(countdownInterval);
    
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
    });

    if (selectedButton) {
        const isCorrect = selectedButton.dataset.correct === "true";
        if (isCorrect) {
            selectedButton.classList.add('correct');
            score++;
        } else {
            selectedButton.classList.add('wrong');
        }
    }
    
    const correctButton = Array.from(answerButtonsElement.children).find(button => button.dataset.correct === "true");
    if (correctButton) {
        correctButton.classList.add('correct');
    }

    if (currentQuestionIndex < quizQuestions.length - 1) {
        nextButton.innerText = "Next Question";
    } else {
        nextButton.innerText = "Show Results";
    }
    nextButton.classList.remove('hide');
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        setNextQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    resetState();
    questionTextElement.style.display = 'none';
    timerElement.classList.add('hide');
    resultContainerElement.classList.remove('hide');
    
    const resultTitle = document.createElement('h2');
    if (score === quizQuestions.length) {
        resultTitle.innerText = `Congratulations! You scored ${score} out of ${quizQuestions.length}!`;
        resultTitle.style.color = '#1DB954';
    } else {
        resultTitle.innerText = `You scored ${score} out of ${quizQuestions.length}. Keep trying!`;
        resultTitle.style.color = '#e94560';
    }
    resultContainerElement.appendChild(resultTitle);

    localStorage.setItem('nemesisQuizCompleted', 'true');

    nextButton.innerText = "Play Again";
    nextButton.removeEventListener('click', handleNextButton);
    nextButton.addEventListener('click', showWelcomeScreen);
    nextButton.classList.remove('hide');
}

function showWelcomeScreen() {
    quizContainer.classList.add('hide');
    welcomeScreen.classList.remove('hide');
    bodyElement.classList.add('welcome-active');
    
    if (localStorage.getItem('nemesisQuizCompleted') === 'true') {
        startQuizButton.classList.add('hide');
        alreadyPlayedMsg.classList.remove('hide');
    } else {
        startQuizButton.classList.remove('hide');
        alreadyPlayedMsg.classList.add('hide');
    }
}

// --- Initialize Page ---
showWelcomeScreen();
