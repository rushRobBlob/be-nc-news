exports.handleCustomErr = (err, req, res, next) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
}

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid article ID' })
    } else {
        next(err);
    }
}


exports.handle500Errors = (err, req, res, next) => {
    console.log(err, 'UNHANDLED ERROR!');
    res.status(500).send({ msg: 'internal server error' });
}