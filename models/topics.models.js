const db = require('../db/connection.js')

exports.retrieveAllTopics = () => {
    return db.query('SELECT * FROM topics;').then(({ rows: topics }) => {
        return topics;
    });
}