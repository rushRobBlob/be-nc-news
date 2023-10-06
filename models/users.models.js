const db = require('../db/connection.js')

exports.retrieveAllUsers = () => {
    return db.query('SELECT * FROM users').then(({ rows: users }) => {
        return users;
    })
}