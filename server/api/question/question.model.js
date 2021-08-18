const db = require('../../database/dbConfig');

//ADD question
const addQuestion = (new_question) => {
    return db("question")
            .returning("id")
            .insert(new_question)
            .then(ids => ({ id: ids[0] }))
}

//GET question
const getQuestions = () => {
    return db("question")
}

//GET a question by id
const getQuestionById = (questionId) => {
    return db("question")
            .where({ id: questionId })
}

//EDIT question
const editQuestion = (change, questionId) => {
    return db("question")
            .where({ id: questionId })
            .update(change)
}

//DELETE question
const delQuestion = (questionId) => {
    return db("question")
            .where({ id: questionId })
            .del()
}

//GET answers of a question
const getAnsByQues = (questionID) => {
    return db("question as q")
            .where("q.id", questionID )
            .join("answer as a","a.questionID", "q.id" )
}


module.exports = {
    addQuestion,
    getQuestions,
    editQuestion,
    getQuestionById,
    delQuestion,
    getAnsByQues
}