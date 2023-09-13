const loginBtn = document.querySelector(".btnJS")
const getTokenUrl = "http://127.0.0.1:8000/accounts/get-token/"
const postLoginFailed = document.querySelector(".register-failed");

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
        
        // if (response.status === 201) {
        //     const form = document.querySelector(".register-form")
        //     const postRegisterSuccess = document.querySelector(".register-success")
        //     postRegisterSuccess.style.display = "block";
        //     form.reset()
        // } else {
        //     let errorResponse = Object.values(data);
        //     const postRegisterFailed = document.querySelector(".register-failed");
        //     console.log(errorResponse)
        //     console.log(errorResponse.length)

        //     for (let i = 0; i < errorResponse.length; i++) {
        //         const error = document.createElement("li")
        //         error.innerHTML = errorResponse[i];
        //         postRegisterFailed.appendChild(error);
        //     }

        //     postRegisterFailed.style.display = "block";

        // }

    });


}

loginBtn.addEventListener("click", (event) => {

    // postRegisterFailed.innerHTML = "";
    // postRegisterFailed.style.display = "none"
    event.preventDefault()
    const email = document.getElementsByName("email")[0].value
    const password = document.getElementsByName("password_init")[0].value


    loginUser(email, password, getTokenUrl)
    
    // let userScore = sessionStorage.getItem("userScore");

})

