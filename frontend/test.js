const btn = document.querySelector("button")
const questTxt = document.querySelector("h2")
const mediaPath = document.querySelector('.mediaPath')
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const labels = answersABC.querySelectorAll('label')
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

function displayData(question, i){
    questTxt.innerHTML = question.quest_txt
    answersResponse = question.abc_answers
    answers = answersResponse.split(" - ")

    for(let index = 0; index < answers.length; index++){

      if(question.abc_answers !== "YN"){
        let ansText = document.createTextNode(answers[index])
        labels[index].appendChild(ansText)
      }
    }

    if (question.abc_answers === "YN") { //YN empty record in possibleanswers table (Y/N question)
        answersYN.style.display = "flex"
        answersABC.style.display = 'none'
    }  else {
        answersYN.style.display = 'none'
        answersABC.style.display = "flex"
    }
}

getQuestions(myUrl)
  .then((data) => {
    questions = data
    quest_count = questions.length
    let i = 0
    btn.addEventListener("click", () => {
        question = questions[i]
        displayData(question, i)
        console.log(question)
        i++
  })
})

