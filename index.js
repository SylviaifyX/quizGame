const questionItem = document.getElementById("question");
const answersItem = document.getElementById("answer-button");
const nextButton = document.getElementById("next");
const timerCount = document.querySelector(".time_sec")
// const canvas = document.querySelector("confetti");
// const jsConfetti = new JSConfetti();

const questions = [
  {
    question: "what is the capital of Nigeria ?",
    answers: [
      { text: "Abuja", correct: true },
      { text: "Kaduna", correct: false },
      { text: "lagos", correct: false },
    ],
  },
  {
    question: "what is meaning of HTML ?",
    answers: [
      { text: "Hypertext Markup Language", correct: true },
      { text: "Hypertext Markup Lang", correct: false },
      { text: "Hypertext Markup London", correct: false },
    ],
  },
  {
    question: "what does CSS stands for ?",
    answers: [
      { text: "Cascading Style Shot", correct: false },
      { text: "Cascading Style Sheets", correct: true },
      { text: "Cascading Style Sheep", correct: false },
    ],
  },
  {
    question: "what does API stands for?",
    answers: [
      { text: "Application Program Interface", correct: false },
      { text: "Application Programming Inter", correct: false },
      { text: "Application Programming Interface", correct: true },
    ],
  },
  {
    question: "what does https stands for?",
    answers: [
      { text: "Hypertext Transfer Protocol Secu", correct: false },
      { text: "Hypertext Transfer Protocol Secure", correct: true },
      { text: "Hypertext Transfer Protocol ", correct: false},
    ],
  },
  {
    question: "What data type does Array fall into?",
    answers: [
      { text: "Primitive data type", correct: false },
      { text: "Non-Primitive data type", correct: true },
      { text: "Most Primitive data type ", correct: false},
    ],
  },
];



let currentQuestionI = 0;
let score = 0;
let counter; 
let timeValue = 10;
function startQ() {
  currentQuestionI = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
  startCounter(10)
}
function showQuestion() {
  //calling the function to restate the perivous question and answer//
  resetState();
  let currentQuestion = questions[currentQuestionI];
  let questionNo = currentQuestionI + 1;
  questionItem.innerHTML = questionNo + ". " + currentQuestion.question;
  // displaying the answers
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("ans");
    answersItem.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAns);
  });
}
// calling the startQuiz function
startQ();
//defining the funtion resets//
function resetState() {
  
  while (answersItem.firstChild) {
    answersItem.removeChild(answersItem.firstChild);
  }
}
function selectAns(e) {
  clearInterval(counter)
  // startCounter(timeValue)
  const selectbutton = e.target;
  const isCorrect = selectbutton.dataset.correct === "true";
  if (isCorrect) {
    selectbutton.classList.add("correct");
    score++;
  } else {
    selectbutton.classList.add("incorrect");
    // button.display = true;
  }

  Array.from(answersItem.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton
}

function goNext() {
  currentQuestionI++;
  if (currentQuestionI < questions.length) {
 
    showQuestion();
    clearInterval(counter)
    startCounter(timeValue)
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
      questionItem.innerHTML = `you scored ${score} out of ${questions.length}`;
      nextButton.innerHTML = "play again";
     questionItem.innerHTML = `you scored ${score} out of ${questions.length}`;

  //   if (score > 2) {
    
  //     questionItem.innerHTML = `you scored ${score} out of ${questions.length}`;
  //   } else{
  //     nextButton.innerHTML = "play again";
 
  //   }
  nextButton
}
nextButton.addEventListener("click", () => {
  if (currentQuestionI < questions.length) {
    goNext();
  } else {
    startQ();
  }
});

//calling the timer function//
function startCounter(time){
  counter = setInterval((timer),1000)
  function timer(){
    timerCount.textContent = time;
    time--;
    if(time  < 0){
      clearInterval(counter)
      timerCount.textContent = "0";
    }
  }

}