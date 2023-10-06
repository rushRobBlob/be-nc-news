const express = require('express');
const { getAllTopics } = require('./controllers/topics.controllers.js')
const { getArticlesById, getAllArticles, getCommentsByArticleId, postComment, patchArticleVotes } = require('./controllers/articles.controllers.js')
const { handleCustomErr, handle500Errors, handlePSQLErrors } = require('./controllers/error.controllers.js')
const app = express();
const endPoints = require('./endpoints.json')
const { deleteCommentById } = require('./controllers/comments.controllers.js')

app.use(express.json())

//API
app.get('/api', (req, res, next) => {
    res.status(200).send({ endpoints: endPoints });
})

//ARTICLES
app.post('/api/articles/:article_id/comments', postComment)
app.get('/api/articles/:article_id', getArticlesById);
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.get('/api/articles', getAllArticles);
app.patch('/api/articles/:article_id', patchArticleVotes);

//COMMENTS
app.delete('/api/comments/:comment_id', deleteCommentById)

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

