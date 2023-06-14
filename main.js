
const questions = [
    {
        question: "What is the biggest country?",
        answers: [
            { text: "Azerbaijan", correct: false},
            { text: "Columbia", correct: false},
            { text: "Russia", correct: true},
            { text: "Turkiye", correct: false},
        ]  
    },
    {
        question: "2 + 2?",
        answers: [
            { text: "4", correct: true},
            { text: "3", correct: false},
            { text: "5", correct: false},
            { text: "0", correct: false},
        ]  
    },
     {
        question: "What is the capital of Azerbaijan?",
        answers: [
            { text: "Ganja", correct: false},
            { text: "Quba", correct: false},
            { text: "Gabala", correct: false},
            { text: "Baku", correct: true},
            
        ]
     },
     {
        question: "Who invented the pi value?",
        answers: [
            { text: "Nikola Tesla", correct: false},
            { text: "William Jones", correct: true},
            { text: "Albert Einstein", correct: false},
            { text: "İsaak Nyuton", correct: false},
        ]
     }
]

const questionElement = document.getElementById("question")
const allBtns = document.getElementById("answer-btns")
const nextBtn = document.getElementById("next-btn")
let currentQuestionIndex = 0
let score = 0

//start
function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextBtn.innerText = "Next"
    showQuestion()
}

function showQuestion() {
    resetState()
    //question,answer
    const currentQuestion = questions[currentQuestionIndex]
    questionElement.innerHTML = currentQuestion.question

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.classList.add("btn")
        button.innerText = answer.text
        allBtns.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
    
}

function resetState(){
    nextBtn.style.display = "none"

    while (allBtns.firstChild) {
        allBtns.removeChild(allBtns.firstChild)
    }
}
function selectAnswer(e){
    const selectButton = e.target
    const isTrue = selectButton.dataset.correct

    //choose one
    if (isTrue) {
        score++
        selectButton.classList.add("correct")
    } else {
        selectButton.classList.add("incorrect")
    }
    Array.from(allBtns.children).forEach(button =>{
        if (button.dataset.correct) {
            button.classList.add("correct")
        }
        button.disabled = true
        nextBtn.style.display = "block"
    })
    
}
nextBtn.addEventListener("click",() =>{
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
})

function showScore(){
    resetState()
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextBtn.innerHTML = "Restart"
    nextBtn.style.display = 'block'
    nextBtn.addEventListener("click", handleNext)
}
function handleNext() {
    if (currentQuestionIndex > questions.length) {
        startQuiz()
    }
}

startQuiz()


