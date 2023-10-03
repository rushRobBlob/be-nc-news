const db = require('../db/connection.js')

exports.retrieveAllTopics = () => {
    return db.query('SELECT * FROM topics;').then(({ rows: topics }) => {
        return topics;
    });
}

exports.retrieveArticlesById = (articleId) => {
    const query = 'SELECT * FROM articles WHERE article_id = $1';
    return db.query(query, [articleId]).then(({ rows: article }) => {
        if (!article.length) {
            return Promise.reject({ status: 404, msg: 'Article does not exist!' })
        };
        return article;
    })
}