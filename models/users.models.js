const db = require('../db/connection.js')

exports.retrieveAllUsers = () => {
    return db.query('SELECT * FROM users').then(({ rows: users }) => {
        return users;
    })
}

exports.fetchUsername = (username) => {
    return db.query('SELECT * FROM users WHERE username = $1', [username]).then(({ rows: user }) => {
        return user[0];
    });
}