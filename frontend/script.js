const btn = document.querySelector("button")
const questTxt = document.querySelector("h2")
const answersUl = document.querySelector('.js-answers')
const myUrl = "http://127.0.0.1:8000/all-questions/"
let questions
let question
console.log(answersUl)
const getRandomElement = list => {
    return list[Math.floor(Math.random()*list.length)]
  }
  
  function displayData(question){
    questTxt.innerHTML = question.quest_txt
    if (question.abc_answers === "") {

    }  else {

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

