const score = document.querySelector("p")

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

