const score = document.querySelector("p")
const backTohomePage = document.querySelector(".backTohomePage")
const examTryAgain = document.querySelector(".examTryAgain")


window.onload = (event) => {
    let userScore = sessionStorage.getItem("userScore");
    let message;

    if(userScore>=68){
        message = `Gratulacje, zdałeś egzamin! Suma zdobytych punktów: ${userScore}`
    } else {
        message = `Niestety, nie zaliczyłeś egzaminu! Suma zdobytych punktów: ${userScore}`
    }

    score.innerHTML = message
}

backTohomePage.addEventListener("click", () => {
    window.location.href = "homePage.html"
})

examTryAgain.addEventListener("click", () => {
    window.location.href = "examPage.html"
})
