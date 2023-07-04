const examUrl = "http://127.0.0.1:8000/exam-questions/"
const nextQuestion = document.querySelector(".nextQuestion")
const answerA = document.querySelector(".A")
const answerB = document.querySelector(".B")
const answerC = document.querySelector(".C")
const questTxt = document.querySelector("h4")
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
let answersResponse
let answers

//functions
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

function uncheckSelection(radios){
    for(let index=0; index < radios.length; index++){
        if(radios[index].checked){
          radios[index].checked = false
        }
    }
}



window.onload = (event) => {
    console.log("page is fully loaded");
    getQuestions(examUrl)
        .then((data) => {

            let questions;
            let question;
            let correctAnswer;
            let radios;
            let userAnswer;
            let i = 0;
            let answersYNarray = Array.from(document.getElementsByName("answerYN"));
            let answersABCarray = Array.from(document.getElementsByName("answerABC"));
            let allArrays = answersYNarray.concat(answersABCarray);
            let userScore = 0;
            let questionScore;
            
            //disable next question button on start and answers is not selected yet
            nextQuestion.disabled = true

            //get and display questions data
            questions = data;
            quest_count = questions.length;
            question = questions[i]
            correctAnswer = question.quest_correct_answer;
            questionScore = question.score
            displayData(question)

            //get current radios
            if(question.abc_answers==="YN"){
                radios = document.getElementsByName("answerYN")
            } else{
                radios = document.getElementsByName("answerABC")
            }

            //get user answer on radio button click
            for(let index=0; index<allArrays.length;index++){
                allArrays[index].addEventListener("click", () =>{

                //enable next question button when user selected answer for current question
                nextQuestion.disabled = false

                //get user answer
                for(let index=0; index < radios.length; index++){
                    if(radios[index].checked){
                        userAnswer = radios[index].value
                    }
                  }

                })
            }
            
            i++;

        nextQuestion.addEventListener("click", () => {

            //check if previous user answer is correct or not -------------- to uncomment
            // console.log("previously user answer: " + userAnswer)
            // console.log("previously correct: " + correctAnswer)
            // console.log(correctAnswer===userAnswer)

            //add scores in case of correct answer
            if(userAnswer===correctAnswer){
                userScore += questionScore
            }

            console.log(userScore)

            //disable next question button on next question and radio button in not selected yet
            nextQuestion.disabled = true

            //get and display next question
            question = questions[i]
            correctAnswer = question.quest_correct_answer
            questionScore = question.score
            displayData(question)

            //get current radios
            if(question.abc_answers==="YN"){
                radios = document.getElementsByName("answerYN")
            } else{
                radios = document.getElementsByName("answerABC")
            }

            //get user answer on radio button click
            for(let index=0; index<allArrays.length;index++){
                allArrays[index].addEventListener("click", () =>{

                    //enable next button on select answer
                    nextQuestion.disabled = false

                    //get user answer
                    for(let index=0; index < radios.length; index++){
                        if(radios[index].checked){
                            userAnswer = radios[index].value
                        }
                    }

                })
            }

            //uncheck radio buttons
            uncheckSelection(radios)

            //next question
            i++;
        })



    })
    
};


