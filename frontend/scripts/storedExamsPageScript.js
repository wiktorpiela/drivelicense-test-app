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
            const headerInfo = document.createElement("h1")
            headerInfo.classList.add("exams-info")
            headerInfo.innerHTML = `Zapisane egzaminy - ilość: ${data.length}`
            storedExamsContent.appendChild(headerInfo)

            for(let i=0; i<data.length; i++){
                result = data[i];
                
                //main single result container
                const summaryInfo = document.createElement("div");
                summaryInfo.classList.add("summary-info");

                //total score
                const totalScoreDiv = document.createElement("div")
                totalScoreDiv.classList.add("exam-result")

                const totalScoreTxt = document.createElement("p")
                totalScoreTxt.innerHTML = "Liczba uzyskanych punktów:"

                const totalScoreInt = document.createElement("p")
                totalScoreInt.innerHTML = `${result.total_score}/74`

                totalScoreDiv.appendChild(totalScoreTxt)
                totalScoreDiv.appendChild(totalScoreInt)
                summaryInfo.appendChild(totalScoreDiv)

                //exam result text
                const examResultTextDiv = document.createElement("div")
                examResultTextDiv.classList.add("exam-result")

                const examResultTxt = document.createElement("p")
                examResultTxt.innerHTML = "Wynik egzaminu: "

                const examResultOutput = document.createElement("p")
                if(result.total_score>=68){
                    examResultOutput.innerHTML = "POZYTYWNY"
                    examResultOutput.style.color = "green"
                } else {
                    examResultOutput.innerHTML = "NEGATYWNY"
                    examResultOutput.style.color = "red"
                }

                examResultTextDiv.appendChild(examResultTxt)
                examResultTextDiv.appendChild(examResultOutput)
                summaryInfo.appendChild(examResultTextDiv)

                //correct answers
                const correctAnswersDiv = document.createElement("div")
                correctAnswersDiv.classList.add("exam-result")

                const correctAnswersTxt = document.createElement("p")
                correctAnswersTxt.innerHTML = "Liczba poprawnych odpowiedzi: "

                const correctAnswerCount = document.createElement("p")
                correctAnswerCount.innerHTML = result.correct_answers

                correctAnswersDiv.appendChild(correctAnswersTxt)
                correctAnswersDiv.appendChild(correctAnswerCount)
                summaryInfo.appendChild(correctAnswersDiv)




                storedExamsContent.appendChild(summaryInfo)
            }


        } else {
            const emptyData = document.createElement("h1")
            emptyData.innerHTML = "Nie masz zapisanych egzaminów!"
            emptyData.classList.add("no-exams-info")
            storedExamsContent.appendChild(emptyData)
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

        getStoredExams(userToken, getStoredExamsUrl)
    }
}



