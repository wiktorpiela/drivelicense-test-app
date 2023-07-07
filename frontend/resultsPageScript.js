const score = document.querySelector(".score")
const wrongUserAnswersPrint = document.querySelector(".wrongUserAnswers")
const wrongAnswersPrint = document.querySelector(".wrongAnswers")
const correctAnswersPrint = document.querySelector(".correctAnswers")
const backTohomePage = document.querySelector(".backTohomePage")
const examTryAgain = document.querySelector(".examTryAgain")


window.onload = (event) => {
    let userScore = sessionStorage.getItem("userScore");
    let message;
    let correctAnswers = JSON.parse(sessionStorage.getItem("correctAnswers"));
    let wrongAnswers = JSON.parse(sessionStorage.getItem("wrongAnswers"));
    let wrongUserAnswer = JSON.parse(sessionStorage.getItem("wrongUserAnswer"));

    if(userScore>=68){
        message = `Gratulacje, zdałeś egzamin! Suma zdobytych punktów: ${userScore}`
    } else {
        message = `Niestety, nie zaliczyłeś egzaminu! Suma zdobytych punktów: ${userScore}`
    }

    score.innerHTML = message

    const examSummary = document.querySelector(".exam-summary")
    for(let index = 0; index < wrongAnswers.length; index++){

        //text złej odp
        const wrongAnswerDetails = document.createElement("div");
        const para = document.createElement("p");
        const node = document.createTextNode(wrongAnswers[index].quest_txt);
        para.appendChild(node);
        wrongAnswerDetails.appendChild(para)
        examSummary.appendChild(wrongAnswerDetails)

    }





    // wrongUserAnswersPrint.innerHTML = wrongUserAnswer
    // wrongAnswersPrint.innerHTML = wrongAnswers
    // correctAnswersPrint.innerHTML = correctAnswers

}

backTohomePage.addEventListener("click", () => {
    window.location.href = "homePage.html"
})

examTryAgain.addEventListener("click", () => {
    window.location.href = "examPage.html"
})
