const express = require('express');
const { getAllTopics } = require('./controllers/topics.controllers.js')
const { getArticlesById, getAllArticles, getCommentsByArticleId, postComment, patchArticleVotes } = require('./controllers/articles.controllers.js')
const { handleCustomErr, handle500Errors, handlePSQLErrors } = require('./controllers/error.controllers.js')
const app = express();
const endPoints = require('./endpoints.json')
const { deleteCommentById } = require('./controllers/comments.controllers.js')
const { getAllUsers, getUsername } = require('./controllers/users.controllers.js')
const cors = require('cors');

app.use(cors());

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

//USERS
app.get('/api/users', getAllUsers);
app.get('/api/users/:username', getUsername)

//ERRORS
app.use(handleCustomErr);
app.use(handlePSQLErrors);
app.use(handle500Errors)






app.all('*', (req, res, next) => {
    res.status(404).send({ msg: 'Invalid request!' });
})


module.exports = app;

