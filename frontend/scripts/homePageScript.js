const confirmStartExam = document.querySelector(".confirm-start-exam")
const beforeExamInfo = document.querySelector(".popup-info")
const selectCategory = document.querySelector(".select-category")
const categoryUrl = "http://127.0.0.1:8000/categories"
let categoryName;

//functions
function openInfoPopup(){
    beforeExamInfo.classList.add("open-info-popup");
}

function closeInfoPopup(){
    beforeExamInfo.classList.remove("open-info-popup");
}

async function getCategoryDropdown(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
}

confirmStartExam.disabled = true

// populate dropdown category from request data on webpage load
window.onload = (event) => {

    let userToken = sessionStorage.getItem("userToken");
    navUnauth = document.querySelector(".unauthJS")
    navAuth = document.querySelector(".authJS")
    if(userToken!==null){
        navUnauth.style.display = "none";
        navAuth.style.display = "flex";
    }
    
    getCategoryDropdown(categoryUrl)
        .then((data) => {

            let categoryOptions = data.categories

            for (let cat of categoryOptions){
                let option = document.createElement("option");
                option.text = cat;
                option.value = cat;
                selectCategory.appendChild(option);
              }
        })
}

selectCategory.addEventListener("input", () =>{
    confirmStartExam.disabled = false
    categoryName = selectCategory.value
})


confirmStartExam.addEventListener("click", () =>{
    sessionStorage.setItem("categoryName", categoryName);
    window.location.href = "./examPage.html";
})

