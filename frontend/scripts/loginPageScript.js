const loginBtn = document.querySelector(".btnJS")
const getTokenUrl = "http://127.0.0.1:8000/accounts/get-token/"
const loginSuccess = document.querySelector(".login-success")
const loginFailed = document.querySelector(".login-failed")

const loginUser = async (email, password, url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    response.json().then(data => {
        console.log(JSON.stringify(data));

        let userToken = data.token;
        sessionStorage.setItem("userToken", userToken);
        console.log(userToken)
        
        if (response.status === 200) {

            loginFailed.style.display = "none";
            loginSuccess.style.display = "block";
            loginSuccess.innerHTML = "Zalogowano pomyślnie";
            let sec_delay = 2;
            const delay = setInterval(() => {
                sec_delay--;
                if(sec_delay===0){
                    window.location.href = "./index.html";
                }
            }, 1000)
        
        } else {
            loginFailed.style.display = "block";
            loginFailed.innerHTML = data.error;
        }

    });


}


loginBtn.addEventListener("click", (event) => {

    loginSuccess.innerHTML = "";
    loginFailed.innerHTML = "";

    event.preventDefault()
    const email = document.getElementsByName("email")[0].value
    const password = document.getElementsByName("password_init")[0].value
    loginUser(email, password, getTokenUrl)
})










