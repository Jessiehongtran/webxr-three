const API_URL = ''

const content = [
    {
        video_question_id: 1,
        video: "This is a video",
        question: "This is a question",
        answers: [
            {
                answer_id: 1,
                answer_text: "This is answer 1"
            },
            {
                answer_id: 2,
                answer_text: "This is answer 2"
            },
            {
                answer_id: 3,
                answer_text: "This is answer 3"
            }
        ]
    }
]

let questions
let answers
let ques_ans = []

function getData(method, url, body, response){
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function (e){
        if (xhr.readyState == 4 && xhr.status == 200){
            if (response === "question"){
                questions = JSON.parse(xhr.responseText)
            }
            if (response === "answer"){
                answers = JSON.parse(xhr.responseText)
            }
            if (response === "content"){
                ques_ans = ques_ans.concat(JSON.parse(xhr.responseText))
            }
           
        }
    }
    if (body){
        xhr.send(body)
    } else {
        xhr.send()
    }
}
getData('GET', 'http://localhost:3001/question', null, "question")
setTimeout(function(){
    console.log('questions', questions)
    if (questions.length > 0){
        for (let i in questions){
            getData('GET', `http://localhost:3001/question/${questions[i].id}/answers`, null, "content")
        }
        setTimeout(function(){
            console.log(ques_ans)
        }, 5000)
    }
}, 2000)



const table = document.getElementsByClassName('table')[0]

function fillTable(){
    for (let i = 0; i < content.length; i++){
        let hasRow= false
        for (let j = 0; j < content[i].answers.length; j++){ 
            const new_row = document.createElement('tr')
            const new_question = document.createElement('td')
            new_row.appendChild(new_question)
            const new_video = document.createElement('td')   
            new_row.appendChild(new_video)
            if (!hasRow){
                new_question.innerHTML = content[i].question
                new_video.innerHTML = content[i].video
            } 
            hasRow = true
            const new_answer = document.createElement('td')
            new_answer.innerHTML = content[i].answers[j].answer_text
            new_row.appendChild(new_answer)
            table.appendChild(new_row)
        }
        
    }
}