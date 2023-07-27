const score = document.querySelector(".score")
const summaryBoxes = document.querySelector(".summary-boxes")
const questionContentText = document.querySelector(".question-content-txt")
const examResultVerbatim = document.querySelector(".exam-result-verbatim")
const correctCountVerbatim = document.querySelector(".correct-count-verbatim")
const wrongCountVerbatim = document.querySelector(".wrong-count-verbatim")
const skipCountVerbatim = document.querySelector(".skip-count-verbatim")

//navi elements
const backToHomePage = document.querySelector(".back-to-home-page")
const examTryAgain = document.querySelector(".exam-try-again")

//function
function createSummaryBoxes(parentDiv, questTxt, questObject, i){
    const box = document.createElement("p");

    box.addEventListener("click", () => {
        questTxt.innerHTML = questObject.quest_txt
    })

    box.classList.add("summary-box")
    if(questObject.isCorrect){
        box.classList.add("sb-green")
    } else{
        box.classList.add("sb-red")
    }
    box.innerHTML = i
    parentDiv.appendChild(box) 
}

window.onload = (event) => {

    //get variables from exam page
    let summaryQuestions = new Map(JSON.parse(localStorage.summaryQuestions));
    let userScore = sessionStorage.getItem("userScore");

    //new variables
    let correctCount = 0;
    let wrongCount = 0;
    let skipCount = 0;

    for(let [key, value] of summaryQuestions){

        createSummaryBoxes(summaryBoxes, questionContentText, value, key)

        if(value.isCorrect){
            correctCount++;
        } else{
            if(value.userAnswer == undefined){
                skipCount++;
            } else{
                wrongCount++;
            }
        }  
    }

    score.innerHTML = userScore + "/74"

    correctCountVerbatim.innerHTML = correctCount
    wrongCountVerbatim.innerHTML = wrongCount
    skipCountVerbatim.innerHTML = skipCount

    if(userScore>=68){
        examResultVerbatim.style.color = "green"
        examResultVerbatim.innerHTML = "POZYTYWNY"
    } else {
        examResultVerbatim.style.color = "red"
        examResultVerbatim.innerHTML = "NEGATYWNY"
    }



}


