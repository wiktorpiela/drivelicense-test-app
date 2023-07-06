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
    let wrongAnswers = JSON.parse(sessionStorage.getItem("correctAnswers"));
    let wrongUserAnswer = JSON.parse(sessionStorage.getItem("correctAnswers"));

    if(userScore>=68){
        message = `Gratulacje, zdałeś egzamin! Suma zdobytych punktów: ${userScore}`
    } else {
        message = `Niestety, nie zaliczyłeś egzaminu! Suma zdobytych punktów: ${userScore}`
    }

    score.innerHTML = message
    wrongUserAnswersPrint.innerHTML = wrongUserAnswer
    wrongAnswersPrint.innerHTML = wrongAnswers
    correctAnswersPrint.innerHTML = correctAnswers

}

backTohomePage.addEventListener("click", () => {
    window.location.href = "homePage.html"
})

examTryAgain.addEventListener("click", () => {
    window.location.href = "examPage.html"
})
