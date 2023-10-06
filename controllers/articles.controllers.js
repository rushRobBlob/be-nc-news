const { retrieveArticlesById, retrieveAllArticles, insertComment, retrieveCommentsByArticleId, updateArticleVotes } = require('../models/articles.models.js')
const { retrieveAllTopics } = require('../models/topics.models.js')



exports.getArticlesById = (req, res, next) => {
    const { article_id: id } = req.params;

    retrieveArticlesById(id).then((article) => {
        res.status(200).send({ article })
    })
        .catch((err) => {
            next(err)
        });
}


exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id: id } = req.params;

    Promise.all([retrieveCommentsByArticleId(id), retrieveArticlesById(id)])

        .then(([comments]) => {
            res.status(200).send({ comments });
        })
        .catch((err) => {

            next(err);
        });

}

exports.getAllArticles = (req, res, next) => {
    const { topic } = req.query
    const promises = [];
    if (topic) {
        promises.push(retrieveAllArticles(topic));
        promises.push(retrieveAllTopics(topic));
    } else {
        promises.push(retrieveAllArticles());
    }
    Promise.all(promises)
        .then(([articles]) => {
            res.status(200).send({ articles });
        })
        .catch((err) => {
            next(err);
        });
}










exports.postComment = (req, res, next) => {
    const comment = req.body;
    const validComment = { username: comment.username, comment: comment.comment };
    const { article_id } = req.params;
    insertComment(validComment, article_id).then((comment) => {
        res.status(201).send({ comment });
    })
        .catch((err) => {
            next(err);
        });
}

exports.patchArticleVotes = (req, res, next) => {
    const votes = req.body.inc_votes;
    const { article_id: id } = req.params;
    if (!votes) {
        return res.status(400).send({ msg: 'Invalid input' })
    }

    updateArticleVotes(votes, id).then((article) => {
        res.status(200).send(article);
    })
        .catch((err) => {

            next(err);
        });
}






