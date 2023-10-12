const storedExamsContent = document.querySelector(".stored-exams-content-main")
const getStoredExamsUrl = "http://127.0.0.1:8000/list-exam-result/"
let navUnauth = document.querySelector(".unauthJS")
let navAuth = document.querySelector(".authJS")

function getDateTimeFromJsonFormat(jsonDateTimeFormat){
    let yyyy = jsonDateTimeFormat.getFullYear();
    let mm = jsonDateTimeFormat.getMonth()+1;
    let dd = jsonDateTimeFormat.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let hh = jsonDateTimeFormat.getHours();
    let minutes = jsonDateTimeFormat.getMinutes();
    let ss = jsonDateTimeFormat.getSeconds();

    outputDate = `${dd}.${mm}.${yyyy} ${hh}:${minutes}:${ss}`
    return outputDate
}

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

        // console.log(data.length)

        if (data.length !== 0) {
            const headerInfo = document.createElement("h1")
            headerInfo.classList.add("exams-info")
            headerInfo.innerHTML = `Zapisane egzaminy - ilość: ${data.length}`
            storedExamsContent.appendChild(headerInfo)

            for(let i=0; i<data.length; i++){
                result = data[i];
                const result_id = result.id

                //main single result container
                const summaryInfo = document.createElement("div");
                summaryInfo.classList.add("summary-info");

                //exam category
                const ExamCatDiv = document.createElement("div")
                ExamCatDiv.classList.add("exam-result")

                const ExamCatTxt = document.createElement("p")
                ExamCatTxt.innerHTML = "Kategoria: "

                const ExamCat = document.createElement("p")
                ExamCat.innerHTML = result.exam_category

                ExamCatDiv.appendChild(ExamCatTxt)
                ExamCatDiv.appendChild(ExamCat)
                summaryInfo.appendChild(ExamCatDiv)

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

                //exam date
                const examDateDiv = document.createElement("div")
                examDateDiv.classList.add("exam-result")

                const examDateTxt = document.createElement("p")
                examDateTxt.innerHTML = "Data egzaminu: "

                const examDate = document.createElement("p")
                const dateFromjson = new Date(result.exam_date)
                examDate.innerHTML = getDateTimeFromJsonFormat(dateFromjson)

                examDateDiv.appendChild(examDateTxt)
                examDateDiv.appendChild(examDate)
                summaryInfo.appendChild(examDateDiv)

                //exam date
                const ex_id = document.createElement("p")
                ex_id.innerHTML = result.id

                //action buttons
                const btnsDiv = document.createElement("div")
                btnsDiv.classList.add("action-buttons")

                let deleteBtn = document.createElement("button")
                deleteBtn.classList.add("btn")
                deleteBtn.classList.add("action-button")
                deleteBtn.innerHTML = "Usuń"

                deleteBtn.addEventListener("click", ()=>{

                    deleteUrl = `http://127.0.0.1:8000/delete-exam-result/${result_id}`

                    const deleteStoredExams = async (userToken, url) => {
                        const response = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Token ${userToken}`
                            }
                        });
                    }

                    deleteStoredExams(userToken, deleteUrl)
                })

                const showDetailsBtn = document.createElement("button")
                showDetailsBtn.classList.add("btn")
                showDetailsBtn.classList.add("action-button")
                showDetailsBtn.innerHTML = "Szczegóły"

                btnsDiv.appendChild(deleteBtn)
                btnsDiv.appendChild(showDetailsBtn)

                storedExamsContent.appendChild(summaryInfo)
                storedExamsContent.appendChild(btnsDiv)
                storedExamsContent.appendChild(ex_id)
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



