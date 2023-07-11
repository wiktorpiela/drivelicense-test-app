const examUrl = "http://127.0.0.1:8000/exam-questions/"
const nextQuestion = document.querySelector(".next-question")
const closeExamConfirm = document.querySelector(".close-exam-confirm")
const popupExam = document.querySelector(".popup-info")
const answerA = document.querySelector(".a")
const answerB = document.querySelector(".b")
const answerC = document.querySelector(".c")
const questTxt = document.querySelector(".question-text")
const answersYN = document.querySelector('.js-answers-yn')
const answersABC = document.querySelector('.js-answers-abc')
const mediaImg = document.querySelector('.question-media-img')
const mediaVideo = document.querySelector('.question-media-video')

let answersResponse
let answers

//functions
async function getQuestions(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
  }

function displayData(question, i, basicQuestCount, specQuestCount){
    questTxt.innerHTML = `Pytanie ${i+1} ${question.quest_txt}`

    //display img or video
    if(question.media.toLowerCase().slice(-4) === ".jpg"){
        mediaImg.style.display = "flex"
        mediaImg.src = "static/img/"+question.media
        mediaVideo.style.display = "none"
    } else{
        mediaImg.style.display = "none"
        mediaVideo.style.display = "flex"
        mediaVideo.src = "static/video/"+question.media.replace("wmv", "mp4")
        mediaVideo.controlsList = "noplaybackrate nofullscreen";
        mediaVideo.disablePictureInPicture = true; 
    }

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

    //display current question score
    const currentQuestionScoreVal = document.querySelector(".score-value")
    currentQuestionScoreVal.innerHTML = question.score

    //counter spec/basic quest display
    const basicQuestDisplay = document.querySelector(".basic-questions-count")
    const specQuestDisplay = document.querySelector(".spec-questions-count")

    if(question.type === "PODSTAWOWY"){
        basicQuestDisplay.innerHTML = `${basicQuestCount} z 20`
    } else {
        specQuestDisplay.innerHTML = `${specQuestCount} z 12`
    }
}

function uncheckSelection(radios){
    for(let index=0; index < radios.length; index++){
        if(radios[index].checked){
          radios[index].checked = false
        }
    }
}

//set main exam countdown
const mainExamTimeCountdown = document.querySelector(".main-exam-time-countdown")
const mainExamTimeStartingMinutes = 25;
let mainExamTimeTime = mainExamTimeStartingMinutes * 60;

setInterval(updateCountdown, 1000);

function updateCountdown() {
    const mainExamTimeMinutes = Math.floor(mainExamTimeTime/60);
    let mainExamTimeSeconds = mainExamTimeTime % 60;

    mainExamTimeSeconds = mainExamTimeSeconds < 10 ? "0" + mainExamTimeSeconds : mainExamTimeSeconds;
    mainExamTimeCountdown.innerHTML = `${mainExamTimeMinutes}:${mainExamTimeSeconds}`
    mainExamTimeTime--;
}

//popup windows
function openInfoPopup(){
    popupExam.classList.add("open-info-popup");
}

function closeInfoPopup(){
    popupExam.classList.remove("open-info-popup");
}

//exit exam on click
closeExamConfirm.addEventListener("click", () => {
    window.location.href = "homePage.html"
})

window.onload = (event) => {
    getQuestions(examUrl)
        .then((data) => {

            let questions; //all exam question from server response
            let question; //single question with all attributes through iteration
            let correctAnswer; //correct answer for current question
            let radios; //all current radiobuttons
            let userAnswer; //answer selected by user
            let i = 0; //iterator
            let questCount; //how many questions in response

            let answersYNarray = Array.from(document.getElementsByName("answer-yn")); //for radios
            let answersABCarray = Array.from(document.getElementsByName("answer-abc")); //for radios
            let allArrays = answersYNarray.concat(answersABCarray); //for radios
            
            let userScore = 0; //initial scoring
            let questionScore; //score of current question
            let wrongQuestionArray = new Array(); //wrong answer array initialized
            let correctQuestionArray = new Array(); //correct answer array initialized
            let wrongUserAnswer = new Array(); // array of wrong user answers
            let wrongUserAnswerIndex = new Array(); // array of wrong user answers

            //specialist and basic questions count
            let basicQuestCount = 0
            let specQuestCount = 0
            
            //disable next question button on start and answers is not selected yet
            nextQuestion.disabled = true

            //get and display questions data
            questions = data;
            questCount = questions.length;
            question = questions[i]
            correctAnswer = question.quest_correct_answer;
            questionScore = question.score

            if(question.type === "PODSTAWOWY"){
                basicQuestCount++;
            } else {
                specQuestCount++;
            }

            displayData(question, i, basicQuestCount, specQuestCount)

            //get current radios
            if(question.abc_answers==="YN"){
                radios = document.getElementsByName("answer-yn")
            } else{
                radios = document.getElementsByName("answer-abc")
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
                correctQuestionArray.push(question)
            } else{
                wrongQuestionArray.push(question)
                wrongUserAnswer.push(userAnswer)
                wrongUserAnswerIndex.push(i)
            }

            console.log(userScore)
            console.log(correctQuestionArray)
            console.log(wrongQuestionArray)
            console.log(wrongUserAnswer)
            console.log(wrongUserAnswerIndex)

            //disable next question button on next question and radio button in not selected yet
            nextQuestion.disabled = true

            //if last question go to results page
            //pass variables on the next page
            if(i>=questCount){
                sessionStorage.setItem("userScore", userScore);
                sessionStorage.setItem("wrongUserAnswer", JSON.stringify(wrongUserAnswer));
                sessionStorage.setItem("wrongQuestionArray", JSON.stringify(wrongQuestionArray));
                sessionStorage.setItem("wrongUserAnswerIndex", JSON.stringify(wrongUserAnswerIndex));
                window.location.href = "resultsPage.html";
            }

            //get and display next question if it is any next question
            if(i < questCount){
                question = questions[i]
                correctAnswer = question.quest_correct_answer
                questionScore = question.score

                if(question.type === "PODSTAWOWY"){
                    basicQuestCount++;
                } else {
                    specQuestCount++;
                }

                displayData(question, i, basicQuestCount, specQuestCount)
                console.log(question.type)
            }

            //get current radios
            if(question.abc_answers==="YN"){
                radios = document.getElementsByName("answer-yn")
            } else{
                radios = document.getElementsByName("answer-abc")
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