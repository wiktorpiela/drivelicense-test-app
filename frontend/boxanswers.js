const score = document.querySelector(".score")
const backToHomePage = document.querySelector(".back-to-home-page")
const examTryAgain = document.querySelector(".exam-try-again")

const examSummary = document.querySelector("summary-boxes")


//function
function printOutWrongQuestionDetails(messageFromCurrentQuestObjectsAttribute, examSummaryDiv){
    const wrongAnswerDetails = document.createElement("div");
    const para = document.createElement("p");
    const node = document.createTextNode(messageFromCurrentQuestObjectsAttribute);
    para.appendChild(node);
    wrongAnswerDetails.appendChild(para)
    examSummaryDiv.appendChild(wrongAnswerDetails)
}