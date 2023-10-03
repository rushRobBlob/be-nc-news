const express = require('express');
const { getAllTopics, getArticlesById } = require('./controllers/app.controllers.js')
const { handleCustomErr } = require('./controllers/error.controllers.js')
const app = express();


//GETS
app.get('/api/topics', getAllTopics);
app.get('/api/articles/:article_id', getArticlesById)

//ERRORS
app.use(handleCustomErr);



app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

