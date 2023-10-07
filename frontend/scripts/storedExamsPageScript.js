const storedExamsContent = document.querySelector(".stored-exams-content-main")
const getStoredExamsUrl = "http://127.0.0.1:8000/list-exam-result/"
let navUnauth = document.querySelector(".unauthJS")
let navAuth = document.querySelector(".authJS")



const getStoredExams = async (userToken, url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${userToken}`
        }
    });

    response.json().then(data => {

        console.log(data.length)

        if (data.length !== 0) {

        } else {

        }

    });
}

window.onload = (event) => {
    let userToken = sessionStorage.getItem("userToken");

    if (userToken === null) {
        window.location.href = "./errorPage.html"
        navUnauth.style.display = "flex";
    } else {
        navUnauth.style.display = "none";
        navAuth.style.display = "flex";
    }

    getStoredExams(userToken, getStoredExamsUrl)
}



