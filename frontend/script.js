const btn = document.querySelector("button")
const questTxt = document.querySelector("h2")
const mediaPath = document.getElementsByClassName('mediaPath')[0]
const answersYN = document.getElementsByClassName('js-answersYN')[0]
const answersABC = document.getElementsByClassName('js-answersABC')[0]
const myUrl = "http://127.0.0.1:8000/all-questions/"
let questions
let question

const A = document.getElementsByClassName("A")[0]
const B = document.getElementsByClassName("B")[0]
const C = document.getElementsByClassName("C")[0]

const getRandomElement = list => {
    return list[Math.floor(Math.random()*list.length)]
  }
  
  function displayData(question){
    questTxt.innerHTML = question.quest_txt
    mediaPath.innerHTML = question.media

    A.innerHTML = question.quest_txt
    B.innerHTML =
    C.innerHTML = 

    if (question.abc_answers == 1241) {
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

