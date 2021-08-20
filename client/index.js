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

function requestData(method, url, body, response){
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

function getContent(){
    requestData('GET', 'http://localhost:3001/question', null, "question")
    setTimeout(function(){
        console.log('questions', questions)
        if (questions.length > 0){
            for (let i in questions){
                requestData('GET', `http://localhost:3001/question/${questions[i].id}/answers`, null, "content")
            }
            setTimeout(function(){
                console.log(ques_ans)
                fillTable(ques_ans)
            }, 2000)
        }
    }, 2000)
}

getContent()



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

    const new_quesID_header = document.createElement('th')  
    new_quesID_header.innerHTML = "Question ID"
    new_row_header.appendChild(new_quesID_header)

    const new_ans_header = document.createElement('th')  
    new_ans_header.innerHTML = "Answer"
    new_row_header.appendChild(new_ans_header)

    const new_nextID_header = document.createElement('th')  
    new_nextID_header.innerHTML = "Next Question"
    new_row_header.appendChild(new_nextID_header)

    table.appendChild(new_row_header)

    for (let i = 0; i < content.length; i++){
        let hasRow= false
        if (content[i].answers && content[i].answers.length > 0){
            for (let j = 0; j < content[i].answers.length; j++){ 
                let new_row = document.createElement('tr')

                let new_video = document.createElement('td')   
                new_row.appendChild(new_video)

                let new_question = document.createElement('td')
                new_row.appendChild(new_question)

                let new_questionID = document.createElement('td')
                new_row.appendChild(new_questionID)

                if (!hasRow && content[i]){
                    new_question.innerHTML = content[i].question_text
                    new_questionID.innerHTML = content[i].questionID
                    new_video.innerHTML = content[i].video
                } 
                hasRow = true

                let new_answer = document.createElement('td')
                new_answer.innerHTML = content[i].answers[j].answer_text
                new_row.appendChild(new_answer)

                let new_nextQuestionID = document.createElement('td')
                new_nextQuestionID.innerHTML = content[i].answers[j].next_questionID
                new_row.appendChild(new_nextQuestionID)

                table.appendChild(new_row)
            }
        } else {
            let new_row = document.createElement('tr')

            let new_video = document.createElement('td')  
            let video_input =  document.createElement('input') 
            video_input.addEventListener('onblur', (e) => postOrUpdateVideo(content[i].id, e.target.value))
            new_video.appendChild(video_input)
            new_row.appendChild(new_video)

            let new_question = document.createElement('td')
            let ques_input =  document.createElement('input') 
            ques_input.addEventListener('onblur', (e) => postOrUpdateQues(content[i].id, e.target.value))
            new_question.appendChild(ques_input)
            new_row.appendChild(new_question)

            let new_answer = document.createElement('td')
            let answer_input = document.createElement('input')
            new_answer.appendChild(answer_input)
            new_row.appendChild(new_answer)

            let new_nextQuestionID = document.createElement('td')
            let nextID_input = document.createElement('input')
            new_nextQuestionID.appendChild(nextID_input)
            new_row.appendChild(new_nextQuestionID)


            answer_input.addEventListener('onblur', (e) => postOrUpdateAns(content[i].id, e.target.value, nextID_input.value)) 
            

            table.appendChild(new_row)
        }
        
    }

    const last_row = document.createElement('tr')

    const last_row_video = document.createElement('td')
    const add_video_btn = document.createElement('button')
    add_video_btn.innerHTML = "+"
    last_row_video.appendChild(add_video_btn)
    last_row_video.addEventListener('click', () => addVideoOrQuestion())
    last_row.appendChild(last_row_video)

    const last_row_ques = document.createElement('td')
    const add_ques_btn = document.createElement('button')
    add_ques_btn.innerHTML = "+"
    last_row_ques.appendChild(add_ques_btn)
    last_row_ques.addEventListener('click', () => addVideoOrQuestion())
    last_row.appendChild(last_row_ques)

    const last_row_quesID = document.createElement('td')
    last_row.appendChild(last_row_quesID)

    const last_row_ans = document.createElement('td')
    const add_ans_btn = document.createElement('button')
    add_ans_btn.innerHTML = "+"
    last_row_ans.appendChild(add_ans_btn)
    last_row_ans.addEventListener('click', () => addAnswer())
    last_row.appendChild(last_row_ans)

    const last_row_nextQuesID = document.createElement('td')
    last_row.appendChild(last_row_nextQuesID)

    table.appendChild(last_row)

}

function postOrUpdateVideo(id, video){
    if (id){
        requestData('PATCH', `http://localhost:3001/question/${id}`, { video: video }, null)
    } else {
        requestData('POST', 'http://localhost:3001/question', {
            video: video,
            question_text: ""
        }, null)
    }
    getContent()
    setTimeout( function(){
        fillTable(ques_ans)
    }, 2000)
}

function postOrUpdateQues(id, question){
    if (id){
        requestData('PATCH', `http://localhost:3001/question/${id}`, { question_text: question }, null)
    } else {
        requestData('POST', 'http://localhost:3001/question', {
            video: null,
            question_text: question
        }, null)
    }
    getContent()
    setTimeout( function(){
        fillTable(ques_ans)
    }, 2000)
}

function postOrUpdateAns(id, answer, next_questionID){
    if (id){
        requestData('POST', `http://localhost:3001/answer`, { 
            answer_text: answer,
            questionID: id,
            next_questionID: next_questionID
         }, null)
    } 
    getContent()
    setTimeout( function(){
        fillTable(ques_ans)
    }, 2000)
}

function addVideoOrQuestion(){
    ques_ans.push({})
    fillTable(ques_ans)
}

function addAnswer(){
    //need to make sure the pre content is a full object and has answers as array first
    ques_ans[ques_ans.length - 1].answers.push({})
    //do a post request after getting input
    fillTable(ques_ans)
}