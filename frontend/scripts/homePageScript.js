const confirmStartExam = document.querySelector(".confirm-start-exam")
const beforeExamInfo = document.querySelector(".popup-info")
const selectCategory = document.querySelector(".select-category")
let categoryName;

function openInfoPopup(){
    beforeExamInfo.classList.add("open-info-popup");
}

function closeInfoPopup(){
    beforeExamInfo.classList.remove("open-info-popup");
}

confirmStartExam.disabled = true

selectCategory.addEventListener("input", () =>{
    confirmStartExam.disabled = false
    categoryName = selectCategory.value
})


confirmStartExam.addEventListener("click", () =>{
    sessionStorage.setItem("categoryName", categoryName);
    window.location.href = "examPage.html";
})

