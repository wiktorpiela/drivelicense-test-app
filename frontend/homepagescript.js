const confirmStartExam = document.querySelector(".confirm-start-exam")
const beforeExamInfo = document.querySelector(".popup-info")

function openInfoPopup(){
    beforeExamInfo.classList.add("open-info-popup");
}

function closeInfoPopup(){
    beforeExamInfo.classList.remove("open-info-popup");
}

confirmStartExam.addEventListener("click", () =>{
    window.location.href = "examPage.html";
})