const db = require('../db/connection.js')

exports.retrieveAllTopics = (topic) => {

    let query = 'SELECT * FROM topics'

    if (topic) {
        query += ' WHERE slug = $1';
        return db.query(query, [topic]).then(({ rows }) => {
            if (!rows.length) {
                return Promise.reject({ status: 400, msg: 'Invalid topic!' });
            }
            return rows;
        })
    }



    return db.query(query).then(({ rows: topics }) => {

        return topics;
    });
}