const btnNext = document.querySelector("button")
const questTxt = document.querySelector("h2")
const mediaPath = document.querySelector('.mediaPath')
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const labels = answersABC.querySelectorAll('label')
const examUrl = "http://127.0.0.1:8000/exam-questions/"


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