const confirmStartExam = document.querySelector(".confirmStartExam")
const beforeExamInfo = document.querySelector(".popup")

function openPopup(){
    beforeExamInfo.classList.add("open-popup");
}

function closePopup(){
    beforeExamInfo.classList.remove("open-popup");
}

confirmStartExam.addEventListener("click", () =>{

    window.location.href = "examPage.html";

})