const db = require('../../database/dbConfig');

//GET answer
const getAnswers = () => {
    return db("answer")
}

//GET answer by id
const getAnswerById = (answerId) => {
    return db("answer")
            .where({ id: answerId })
}

//POST answer 
const addAnswer = (new_answer) => {
    return db("answer")
            .returning("id")
            .insert(new_answer)
}

//EDIT answer
const editAnswer = (change, answerId) => {
    return db("answer")
            .where({ id: answerId })
            .update(change)
}

//DELETE answer
const delAnswer = (answerId) => {
    return db("answer")
            .where({ id: answerId })
            .del()
}

module.exports = {
    getAnswers,
    getAnswerById,
    addAnswer,
    editAnswer,
    delAnswer
};