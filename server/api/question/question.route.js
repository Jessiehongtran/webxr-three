const route = require('express').Router();
const questionModel = require('./question.model');

//GET QUESTION
route.get('/', async (req, res) => {
    try {
        const questions = await questionModel.getQuestions()
        res.status(200).json(questions)
    } catch (err){
        res.status(500).json(err.message)
    }

})

//ADD QUESTION
route.post('/', async (req, res) => {
    const newQues = req.body
    try {
        const response = await questionModel.addQuestion(newQues)
        res.status(200).json(response)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//EDIT QUESTION
route.patch('/:questionId', async (req, res) => {
    const { questionId } = req.params
    const change = req.body
    try {
        const response = await questionModel.editQuestion(change, questionId)
        res.status(200).json({ message: `Updated ${response} question`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE QUESTION
route.delete('/:questionId', async (req, res) => {
    const { questionId } = req.params
    try {
        const response = await questionModel.delQuestion(questionId)
        res.status(200).json({ message: `Deleted ${response} question`})
    } catch (err){
        res.status(500).json(err.message)
    }
})


module.exports = route;