const db = require('../db/connection.js')



exports.retrieveArticlesById = (articleId) => {
    const query = 'SELECT * FROM articles WHERE article_id = $1';
    return db.query(query, [articleId]).then(({ rows: article }) => {
        if (!article.length) {
            return Promise.reject({ status: 404, msg: 'Article does not exist!' })
        };
        return article[0];
    })
}


exports.retrieveCommentsByArticleId = (articleId) => {
    const query = 'SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC';

    return db.query(query, [articleId]).then(({ rows: comments }) => {


        return comments;
    })
}

exports.retrieveAllArticles = () => {
    const query = `
    SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `;
    return db.query(query).then(({ rows }) => {
        return rows;

    })
}

exports.insertComment = (commentToInsert, articleId) => {
    const { username, comment } = commentToInsert;
    return db.query(`
    INSERT INTO comments
    (body, author, article_id)
    VALUES ($1, $2, $3)
    RETURNING *                
    ;`, [comment, username, articleId])
        .then((result) => {
            return result.rows[0].body;
        })
}

exports.updateArticleVotes = (votes, id) => {
    const query = `UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 RETURNING *;`

    const values = [votes, id]
    return db.query(query, values).then(({ rows }) => {

        if (!rows.length) {
            return Promise.reject({ status: 404, msg: 'No articles found with this ID!' })
        }

        return rows[0];
    })
}




