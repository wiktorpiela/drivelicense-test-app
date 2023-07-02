const btn = document.querySelector("button")
const questTxt = document.querySelector("h2")
const mediaPath = document.querySelector('.mediaPath')
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const labels = answersABC.querySelectorAll('label')
const answerA = answersABC.querySelector(".A")
const answerB = answersABC.querySelector(".B")
const answerC = answersABC.querySelector(".C")
const myUrl = "http://127.0.0.1:8000/exam-questions/"
let questions
let question
let ansText
let answersResponse
let answers

async function getQuestions(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
  }

function displayData(question){
    questTxt.innerHTML = question.quest_txt
    answersResponse = question.abc_answers
    answers = answersResponse.split(" - ")

    if (question.abc_answers === "YN") { //YN empty record in possibleanswers table (Y/N question)
        answersYN.style.display = "flex"
        answersABC.style.display = 'none'
    }  else {
        answersYN.style.display = 'none'
        answersABC.style.display = "flex"
        answerA.innerHTML = answers[0]
        answerB.innerHTML = answers[1]
        answerC.innerHTML = answers[2]
    }
}

getQuestions(myUrl)
  .then((data) => {
    questions = data
    quest_count = questions.length
    let i = 0
    btn.addEventListener("click", () => {
        question = questions[i]
        displayData(question)
        console.log(question)
        i++
    })
  })

