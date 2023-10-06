exports.handleCustomErr = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {

        res.status(400).send({ msg: 'Invalid ID' })
    } else if (err.code === '23503') {
        if (err.constraint === 'comments_author_fkey') {
            res.status(401).send({ msg: 'Invalid username' })
        } else if (err.constraint === 'comments_article_id_fkey') {
            res.status(404).send({ msg: 'Article not found' })
        }
    } else if (err.code === '23502') {
        res.status(400).send({ msg: 'Missing field' });
    } else if (err.code === '42601') {
        res.status(400).send({ msg: 'Invalid input' })
    } else {
        next(err);
    }
}






exports.handle500Errors = (err, req, res, next) => {
    console.log(err, 'UNHANDLED ERROR!');
    res.status(500).send({ msg: 'internal server error' });
}