const { retrieveAllUsers, fetchUsername } = require('../models/users.models.js')

exports.getAllUsers = (req, res, next) => {

    retrieveAllUsers().then((users) => {
        res.status(200).send({ users });
    })
}

exports.getUsername = (req, res, next) => {
    const { username } = req.params;

    fetchUsername(username).then((user) => {
        res.status(200).send({ user });
    });
}