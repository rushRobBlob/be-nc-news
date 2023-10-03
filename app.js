const express = require('express');
const { getAllTopics } = require('./controllers/app.controllers.js')
const endPoints = require('./endpoints.json')

const app = express();


//GETS
app.get('/api/topics', getAllTopics);


//ERRORS




app.get('/api', (req, res, next) => {
    res.status(200).send({ endpoints: endPoints });
})



app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

