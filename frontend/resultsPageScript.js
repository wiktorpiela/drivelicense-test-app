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
const A = document.querySelector(".a")
const B = document.querySelector(".b")
const C = document.querySelector(".c")
const YES = document.querySelector(".yes")
const NO = document.querySelector(".no")

//navi elements
const backToHomePage = document.querySelector(".back-to-home-page")
const examTryAgain = document.querySelector(".exam-try-again")

//function
function createSummaryBoxes(parentDiv, questTxt, questLgl, questObject, i) {
    const box = document.createElement("p");

    //on click show question details
    box.addEventListener("click", () => {

        //clear answer class list
        A.classList.remove("sb-green")
        A.classList.remove("sb-red")
        B.classList.remove("sb-green")
        B.classList.remove("sb-red")
        C.classList.remove("sb-green")
        C.classList.remove("sb-red")
        YES.classList.remove("sb-green")
        YES.classList.remove("sb-red")
        NO.classList.remove("sb-green")
        NO.classList.remove("sb-red")

        //question media handling
        if (questObject.media.toLowerCase().slice(-4) === ".jpg") {

            mediaImg.style.display = "flex"
            mediaVideo.style.display = "none"
            mediaImg.src = "static/img/" + questObject.media

        } else if (questObject.media.toLowerCase().slice(-4) === ".wmv") {

            mediaImg.style.display = "none"
            mediaVideo.style.display = "flex"
            mediaVideo.src = "static/video/" + questObject.media.replace("wmv", "mp4")
            mediaVideo.controlsList = "noplaybackrate nodownload"

        } else {

            mediaImg.style.display = "flex"
            mediaVideo.style.display = "none"
            mediaImg.src = "static/img/no_media.jpg"

        }

        const yesNo = document.querySelector(".yn")
        const ABC = document.querySelector(".abc")
        //questions type handling
        if (questObject.type === "PODSTAWOWY") {
            yesNo.style.display = "flex"
            ABC.style.display = "none"
        } else {
            yesNo.style.display = "none"
            ABC.style.display = "block"

            //fill answers content dynamically
            let abcAnswers = questObject.abc_answers.split(" - ")
            A.innerHTML = abcAnswers[0]
            B.innerHTML = abcAnswers[1]
            C.innerHTML = abcAnswers[2]
        }

        //mark correct and user answer
        switch (questObject.quest_correct_answer) {
            case "A":
                A.classList.add("sb-green")
                break;
            case "B":
                B.classList.add("sb-green")
                break;
            case "C":
                C.classList.add("sb-green")
                break;
            case "T":
                YES.classList.add("sb-green")
                break;
            case "N":
                NO.classList.add("sb-green")
                break;
        }

        if (questObject.quest_correct_answer !== questObject.userAnswer) {
            switch (questObject.userAnswer) {
                case "A":
                    A.classList.add("sb-red")
                    break;
                case "B":
                    B.classList.add("sb-red")
                    break;
                case "C":
                    C.classList.add("sb-red")
                    break;
                case "T":
                    YES.classList.add("sb-red")
                    break
                case "N":
                    NO.classList.add("sb-red")
                    break
            }
        }

        questTxt.innerHTML = questObject.quest_txt
        questLgl.innerHTML = questObject.legal_source

    })

    box.classList.add("summary-box")
    if (questObject.isCorrect) {
        box.classList.add("sb-green")
    } else {
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

    for (let [key, value] of summaryQuestions) {

        createSummaryBoxes(summaryBoxes, questionContentText, questionLegalSource, value, key)

        if (value.isCorrect) {
            correctCount++;
        } else {
            if (value.userAnswer == undefined) {
                skipCount++;
            } else {
                wrongCount++;
            }
        }
    }

    score.innerHTML = userScore + "/74"

    correctCountVerbatim.innerHTML = correctCount
    wrongCountVerbatim.innerHTML = wrongCount
    skipCountVerbatim.innerHTML = skipCount

    if (userScore >= 68) {
        examResultVerbatim.style.color = "green"
        examResultVerbatim.innerHTML = "POZYTYWNY"
    } else {
        examResultVerbatim.style.color = "red"
        examResultVerbatim.innerHTML = "NEGATYWNY"
    }



}


