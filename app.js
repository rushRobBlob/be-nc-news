const express = require('express');
const { getAllTopics, getArticlesById, getCommentsByArticleId } = require('./controllers/app.controllers.js')
const { handleCustomErr, handle500Errors, handlePSQLErrors } = require('./controllers/error.controllers.js')
const app = express();
const endPoints = require('./endpoints.json')

//API
app.get('/api', (req, res, next) => {
    res.status(200).send({ endpoints: endPoints });
})
//ARTICLES
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);


//TOPICS
app.get('/api/topics', getAllTopics);


//ERRORS
app.use(handleCustomErr);
app.use(handlePSQLErrors);
app.use(handle500Errors)






app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

