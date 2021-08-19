const API_URL = ''

// const content = [
//     {
//         video_question_id: 1,
//         video: "This is a video",
//         question: "This is a question",
//         answers: [
//             {
//                 answer_id: 1,
//                 answer_text: "This is answer 1"
//             },
//             {
//                 answer_id: 2,
//                 answer_text: "This is answer 2"
//             },
//             {
//                 answer_id: 3,
//                 answer_text: "This is answer 3"
//             }
//         ]
//     }
// ]

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
            fillTable(ques_ans)
        }, 2000)
    }
}, 2000)



const table = document.getElementsByClassName('table')[0]

function cleanTable(){
    while (table.firstChild){
        table.removeChild(table.firstChild)
    }
}

function fillTable(content){
    //clean table
    cleanTable()

    //fill headers
    const new_row_header = document.createElement('tr')
    const new_video_header = document.createElement('th')  
    new_video_header.innerHTML = "Video"
    new_row_header.appendChild(new_video_header)
    const new_ques_header = document.createElement('th')  
    new_ques_header.innerHTML = "Question"
    new_row_header.appendChild(new_ques_header)
    const new_ans_header = document.createElement('th')  
    new_ans_header.innerHTML = "Answer"
    new_row_header.appendChild(new_ans_header)
    table.appendChild(new_row_header)

    for (let i = 0; i < content.length; i++){
        let hasRow= false
        for (let j = 0; j < content[i].answers.length; j++){ 
            const new_row = document.createElement('tr')
            const new_video = document.createElement('td')   
            new_row.appendChild(new_video)
            const new_question = document.createElement('td')
            new_row.appendChild(new_question)
            if (!hasRow){
                new_question.innerHTML = content[i].question_text
                new_video.innerHTML = content[i].video
            } 
            hasRow = true
            const new_answer = document.createElement('td')
            new_answer.innerHTML = content[i].answers[j].answer_text
            new_row.appendChild(new_answer)
            table.appendChild(new_row)
        }
        
    }

    const last_row = document.createElement('tr')

    const last_row_video = document.createElement('td')
    const add_video_btn = document.createElement('button')
    add_video_btn.innerHTML = "+"
    last_row_video.appendChild(add_video_btn)
    last_row.appendChild(last_row_video)

    const last_row_ques = document.createElement('td')
    const add_ques_btn = document.createElement('button')
    add_ques_btn.innerHTML = "+"
    last_row_ques.appendChild(add_ques_btn)
    last_row.appendChild(last_row_ques)

    const last_row_ans = document.createElement('td')
    const add_ans_btn = document.createElement('button')
    add_ans_btn.innerHTML = "+"
    last_row_ans.appendChild(add_ans_btn)
    last_row.appendChild(last_row_ans)

    table.appendChild(last_row)

}