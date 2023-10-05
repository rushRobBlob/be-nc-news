const db = require('../db/connection.js')

exports.removeCommentById = (commentId) => {
    const query = `
    DELETE FROM comments 
    WHERE comment_id = $1
    `;
    return db.query(query, [commentId]).then(({ rowCount }) => {
        if (rowCount === 0) {
            return Promise.reject({ status: 404, msg: 'No comments found' });
        }

    })
}