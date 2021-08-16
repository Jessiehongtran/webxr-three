const express = require('express');
const app = express();
const cors = require('cors');

const questionRoute = require('./api/question/question.route');
const answerRoute = require('./api/answer/answer.route');

app.use(express.json())
app.use(cors())

app.use('/question', questionRoute)
app.use('/answer', answerRoute)

module.exports = app;