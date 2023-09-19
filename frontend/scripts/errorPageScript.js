const backHomePageOnError = document.querySelector(".error-btn")

window.onload = (event) => {

    let userToken = sessionStorage.getItem("userToken");
    navUnauth = document.querySelector(".unauthJS")
    navAuth = document.querySelector(".authJS")
    if(userToken!==null){
        navUnauth.style.display = "none";
        navAuth.style.display = "flex";
    }

    backHomePageOnError.addEventListener("click", () =>{
        window.location.href = "./index.html"
    })
}


