const { removeCommentById } = require('../models/comments.models.js')

exports.deleteCommentById = (req, res, next) => {
    const { comment_id: id } = req.params;

    removeCommentById(id).then(() => {
        res.status(204).send();
    }).catch((err) => {

        next(err);
    });
}