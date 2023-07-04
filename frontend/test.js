const nextQuestion = document.querySelector(".nextQuestion")
const answerQuestion = document.querySelector(".answerQuestion")
const questTxt = document.querySelector("h2")
const mediaPath = document.querySelector('.mediaPath')
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const labelsABC = answersABC.querySelectorAll('label')
const labelsYN = answersYN.querySelectorAll('label')
const answerA = answersABC.querySelector(".A")
const answerB = answersABC.querySelector(".B")
const answerC = answersABC.querySelector(".C")
const myUrl = "http://127.0.0.1:8000/exam-questions/"
let questions
let question
let ansText
let answersResponse
let answers
let userAnswer

async function getQuestions(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
  }

function displayData(question){
    questTxt.innerHTML = question.quest_txt

    if(question.abc_answers !== "YN"){
      answersResponse = question.abc_answers
      answers = answersResponse.split(" - ")
    } 

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
    let correctAnswer
    let radios
    let answersYNarray = Array.from(document.getElementsByName("answerYN"))
    let answersABCarray = Array.from(document.getElementsByName("answerABC"))
    let allArrays = answersYNarray.concat(answersABCarray)
    
    for(let index=0; index<allArrays.length;index++){
      allArrays[index].addEventListener("click", () =>{
        answerQuestion.style.display = "block"
      })
    }




    nextQuestion.addEventListener("click", () => {
      question = questions[i]
      displayData(question)
      i++
      correctAnswer = question.quest_correct_answer
      console.log(correctAnswer)
      answerQuestion.style.display = "none"
      
      if(question.abc_answers==="YN"){
        radios = document.getElementsByName("answerYN")
      } else{
        radios = document.getElementsByName("answerABC")
      }
      
      for(let index=0; index < radios.length; index++){
        if(radios[index].checked){
          radios[index].checked = false
          }
        }
  })

  answerQuestion.addEventListener("click", () =>{
    
    let userAnswer

    if(question.abc_answers==="YN"){
      radios = document.getElementsByName("answerYN")
    } else{
      radios = document.getElementsByName("answerABC")
    }

    for(let index=0; index < radios.length; index++){
      if(radios[index].checked){
        userAnswer = radios[index].value
      }
    }

    console.log(userAnswer===correctAnswer)
    
  })
})

