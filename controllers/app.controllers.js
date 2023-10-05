const { retrieveAllTopics, retrieveArticlesById, retrieveCommentsByArticleId, retrieveAllArticles } = require('../models/app.models.js')

exports.getAllTopics = (req, res, next) => {
    retrieveAllTopics().then((topics) => {
        res.status(200).send(topics);
    })
        .catch(next);

}

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

    retrieveAllArticles().then((articles) => {
        res.status(200).send({ articles });
    });

}