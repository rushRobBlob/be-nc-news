const { retrieveArticlesById, retrieveAllArticles, insertComment } = require('../models/articles.models.js')



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

exports.postComment = (req, res, next) => {
    const comment = req.body;
    const { article_id } = req.params;


    insertComment(comment, article_id).then((comment) => {

        res.status(201).send({ comment });
    })
        .catch((err) => {
            next(err);
        });

}