const score = document.querySelector(".score")
const summaryBoxes = document.querySelector(".summary-boxes")
const examResultVerbatim = document.querySelector(".exam-result-verbatim")
const correctCountVerbatim = document.querySelector(".correct-count-verbatim")
const wrongCountVerbatim = document.querySelector(".wrong-count-verbatim")
const skipCountVerbatim = document.querySelector(".skip-count-verbatim")

//question elements
const questionContentText = document.querySelector(".question-content-txt")
const questionLegalSource = document.querySelector(".question-content-quest-lglsource")
const mediaImg = document.querySelector(".question-media-img-result")
const mediaVideo = document.querySelector(".question-media-video-result")

//navi elements
const backToHomePage = document.querySelector(".back-to-home-page")
const examTryAgain = document.querySelector(".exam-try-again")

//function
function createSummaryBoxes(parentDiv, questTxt, questLgl, questObject, i){
    const box = document.createElement("p");

    //on click show question details
    box.addEventListener("click", () => {

        //question media handling
        if(questObject.media.toLowerCase().slice(-4) === ".jpg"){

            mediaImg.style.display = "flex"
            mediaVideo.style.display = "none"
            mediaImg.src = "static/img/" + questObject.media

        } else if(questObject.media.toLowerCase().slice(-4) === ".wmv"){

            mediaImg.style.display = "none"
            mediaVideo.style.display = "flex"
            mediaVideo.src = "static/video/" + questObject.media.replace("wmv", "mp4")
            mediaVideo.controlsList = "noplaybackrate nodownload"

        } else{

            mediaImg.style.display = "flex"
            mediaVideo.style.display = "none"
            mediaImg.src = "static/img/no_media.jpg"

        }


        questTxt.innerHTML = questObject.quest_txt
        questLgl.innerHTML = questObject.legal_source

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

        createSummaryBoxes(summaryBoxes, questionContentText, questionLegalSource, value, key)

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


