const express = require('express');
const { getAllTopics } = require('./controllers/topics.controllers.js')
const { getArticlesById, getAllArticles, postComment } = require('./controllers/articles.controllers.js')
const { handleCustomErr, handle500Errors, handlePSQLErrors } = require('./controllers/error.controllers.js')
const app = express();
const endPoints = require('./endpoints.json')

app.use(express.json())

//TOPICS
app.get('/api/topics', getAllTopics);

//ARTICLES
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api', (req, res, next) => {
    res.status(200).send({ endpoints: endPoints });
})
app.post('/api/articles/:article_id/comments', postComment)



//ERRORS
app.use(handleCustomErr);
app.use(handlePSQLErrors);
app.use(handle500Errors)






app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

