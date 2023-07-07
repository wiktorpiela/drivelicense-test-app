const score = document.querySelector(".score")
const backToHomePage = document.querySelector(".back-to-home-page")
const examTryAgain = document.querySelector(".exam-try-again")


//function
function printOutWrongQuestionDetails(messageFromCurrentQuestObjectsAttribute, examSummaryDiv){
    const wrongAnswerDetails = document.createElement("div");
    const para = document.createElement("p");
    const node = document.createTextNode(messageFromCurrentQuestObjectsAttribute);
    para.appendChild(node);
    wrongAnswerDetails.appendChild(para)
    examSummaryDiv.appendChild(wrongAnswerDetails)
}



window.onload = (event) => {
    let message;
    //access variables from previous page
    let userScore = sessionStorage.getItem("userScore");
    // let correctAnswers = JSON.parse(sessionStorage.getItem("correctAnswers"));
    let wrongQuestionArray = JSON.parse(sessionStorage.getItem("wrongQuestionArray"));
    let wrongUserAnswer = JSON.parse(sessionStorage.getItem("wrongUserAnswer"));
    let wrongUserAnswerIndex = JSON.parse(sessionStorage.getItem("wrongUserAnswerIndex"));

    if(userScore>=68){
        message = `Gratulacje, zdałeś egzamin! Suma zdobytych punktów: ${userScore}`
    } else {
        message = `Niestety, nie zaliczyłeś egzaminu! Suma zdobytych punktów: ${userScore}`
    }

    score.innerHTML = message

    //printout questions details, user answered wrong 
    const examSummary = document.querySelector(".exam-summary")
    let messageQuestTxt;
    let messageCorrectAnswer;
    let messagePossibleAnswers;
    let messageLegalSource;
    let messageUserAnswer;
    let currentPossibleAnswers;
    let currentCorrectAnswers;
    let currentUserAnswer;
    for(let index = 0; index < wrongQuestionArray.length; index++){

        //text złej odp
        // const wrongAnswerDetails = document.createElement("div");
        // const para = document.createElement("p");
        // const node = document.createTextNode(wrongQuestionArray[index].quest_txt);
        // para.appendChild(node);
        // wrongAnswerDetails.appendChild(para)
        // examSummary.appendChild(wrongAnswerDetails)


        //question text
        messageQuestTxt = `Pytanie ${wrongUserAnswerIndex[index]}: ${wrongQuestionArray[index].quest_txt}`
        printOutWrongQuestionDetails(messageQuestTxt, examSummary)

        //possible answers
        if(wrongQuestionArray[index].abc_answers === "YN"){
            currentPossibleAnswers = "TAK NIE"
        } else {
            currentPossibleAnswers = wrongQuestionArray[index].abc_answers.split(" - ")
        }
        messagePossibleAnswers = `Możliwe odpowiedzi: ${currentPossibleAnswers}`
        printOutWrongQuestionDetails(messagePossibleAnswers, examSummary)

        //correct answer for that question
        if(wrongQuestionArray[index].quest_correct_answer === "T"){
            currentCorrectAnswers = "TAK"
        } else if(wrongQuestionArray[index].quest_correct_answer === "N"){
            currentCorrectAnswers = "NIE"
        } else {
            currentCorrectAnswers = wrongQuestionArray[index].quest_correct_answer
        }
        messageCorrectAnswer = `Poprawna odpowiedź: ${currentCorrectAnswers}`
        printOutWrongQuestionDetails(messageCorrectAnswer, examSummary)

        //users answer
        if(wrongUserAnswer[index] === "T"){
            currentUserAnswer = "TAK"
        } else if(wrongUserAnswer[index] === "N"){
            currentUserAnswer = "NIE"
        } else {
            currentUserAnswer = wrongUserAnswer[index]
        }
        messageUserAnswer = `Twoja odpowiedź: ${currentUserAnswer}`
        printOutWrongQuestionDetails(messageUserAnswer, examSummary)

        //legal
        messageLegalSource = `Podstawa prawna: ${wrongQuestionArray[index].legal_source}`
        printOutWrongQuestionDetails(messageLegalSource, examSummary)


        const br = document.createElement("br")
        examSummary.appendChild(br)

    }

}

backToHomePage.addEventListener("click", () => {
    window.location.href = "homePage.html"
})

examTryAgain.addEventListener("click", () => {
    window.location.href = "examPage.html"
})
