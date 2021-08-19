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

//GET answers by question
route.get('/:questionId/answers', async (req, res) => {
    const { questionId } = req.params
    try {
        const content = await questionModel.getAnsByQues(questionId)
        if (content.length > 0){
            let curSameQues = null
            let curIndGroup 
            let i = 0
            while (content[i]){
            if (curSameQues === null || content[i].question_text !== curSameQues){
                //turn answer into array
                content[i].answers = [
                    {
                        answer_text: content[i].answer_text,
                        next_questionID: content[i].next_questionID
                    }
                ]
                delete content[i].id
                delete content[i].answer_text
                delete content[i].next_questionID
                curIndGroup = i
                curSameQues = content[i].question_text
                i += 1
            }
            else if (curSameQues && content[i].question_text === curSameQues){
                //add answer to previous
                content[curIndGroup].answers.push({
                answer_text: content[i].answer_text,
                next_questionID: content[i].next_questionID
                })
                //turn the current object to empty
                content.splice(i, 1)
            
            }

            
            }
        }
        res.status(200).json(content)
    } catch (err){
        res.status(500).json(err.message)
    }
})


module.exports = route;