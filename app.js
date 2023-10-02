const express = require('express');
const { getAllTopics } = require('./controllers/app.controllers.js')

const app = express();



app.get('/api/topics', getAllTopics);

app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

