const forgotPassUrl = "http://127.0.0.1:8000/accounts/forgot-password/"
const sendBtn = document.querySelector(".btnJS")
const respSuccess = document.querySelector(".forgot-pass-success")
const respFailed = document.querySelector(".forgot-pass-failed")

const forgotPassRequest = async (email, url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    })

    response.json().then(data => {

        if (response.status === 200) {
            respFailed.style.display = "none";
            respSuccess.style.display = "block";
            respSuccess.innerHTML = "Wysłano link do zmiany hasła!"
        } else {
            respSuccess.style.display = "none";
            respFailed.style.display = "block";
            respFailed.innerHTML = data.error;
        }
    })
}

sendBtn.addEventListener("click", (event) => {
    respSuccess.innerHTML = "";
    respFailed.innerHTML = "";

    event.preventDefault()
    const email = document.getElementsByName("email")[0].value
    forgotPassRequest(email, forgotPassUrl)
})