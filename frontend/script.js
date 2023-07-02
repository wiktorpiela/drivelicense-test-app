const btn = document.querySelector("button")
const questTxt = document.querySelector("h2")
const mediaPath = document.querySelector('.mediaPath')
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const labels = answersABC.querySelectorAll('label')
const myUrl = "http://127.0.0.1:8000/exam-questions/"
let questions
let question
let answersResponse
let answers
let ansText


const getRandomElement = list => {
    return list[Math.floor(Math.random()*list.length)]
  }
  
function displayData(question){
  questTxt.innerHTML = question.quest_txt
  mediaPath.innerHTML = question.media
  answersResponse = question.abc_answers
  answers = answersResponse.split(" - ")
    
  for(let index = 0; index < answers.length; index++){

    if(!labels[index].innerText){
      let ansText = document.createTextNode(answers[index])
      labels[index].appendChild(ansText)

    } else {
      labels[index].removeChild(ansText)
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
  
async function getQuestions(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
  }
  

getQuestions(myUrl)
.then((data) => {
  questions = data.results
  btn.addEventListener("click", () => {
      question = getRandomElement(questions)
      displayData(question)
  })
})

  // const answers = ansResponse.split(' - ')

  // const labelsDiv = document.querySelector('.js-answers-abc')
  // const labels = labelsDiv.querySelectorAll('label')
  
  // for (let index = 0; index < answers.length;index++) {
  //     let ansText = document.createTextNode(answers[index])
  //     labels[index].appendChild(ansText)
  // }