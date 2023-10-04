const { retrieveAllTopics, retrieveArticlesById, retrieveAllArticles } = require('../models/app.models.js')

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

exports.getAllArticles = (req, res, next) => {

    retrieveAllArticles().then((articles) => {
        res.status(200).send({ articles });
    });
}