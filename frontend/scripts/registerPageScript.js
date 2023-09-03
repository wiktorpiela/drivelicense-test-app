const registerBtn = document.querySelector(".btnJS")
const createUserUrl = "http://127.0.0.1:8000/accounts/register-user/"

const registerUser = async (username, email, password, url) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    });

    response.json().then(data => {
        console.log(JSON.stringify(data));

        if(response.status===201){
            const form = document.querySelector(".register-form")
            form.reset()
        } else{
            let errorResponse = Object.values(data)
            console.log(errorResponse)
            if(errorResponse>1){

            } else{}


            
        }


    });





}


registerBtn.addEventListener("click", (event) => {

    event.preventDefault()
    const username = document.getElementsByName("username")[0].value
    const email = document.getElementsByName("email")[0].value
    const password = document.getElementsByName("password_init")[0].value
    const pass_rep = document.getElementsByName("password_rep")[0].value

    registerUser(username, email, password, createUserUrl)



})

