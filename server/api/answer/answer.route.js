const route = require('express').Router();
const answerModel = require('./answer.model')

//GET answers
route.get('/', async (req, res) => {
    try {
        const answers = await answerModel.getAnswers()
        res.status(200).json(answers)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//ADD answer
route.post('/', async (req, res) => {
    const new_answer = res.body
    try {
        const response = await answerModel.addAnswer(new_answer)
        res.status(200).json(response)
    } catch (err){
        res.status(500).json(err.message)
    }
})

//EDIT answer
route.patch('/:answerId', async (req, res) => {
    const { answerId } = req.params;
    const change = req.body;
    try {
        const response = await answerModel.editAnswer(change, answerId)
        res.status(200).json({ message: `Updated ${response} answer`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

//DELETE answer
route.delete('/:answerId', async (req, res) => {
    const { answerId } = req.params;
    try {
        const response = await answerModel.delAnswer(answerId)
        res.status(200).json({ message: `Deleted ${response} answer`})
    } catch (err){
        res.status(500).json(err.message)
    }
})

module.exports = route;