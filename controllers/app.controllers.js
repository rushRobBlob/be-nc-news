const { retrieveAllTopics } = require('../models/app.models.js')

exports.getAllTopics = (req, res, next) => {
    retrieveAllTopics().then((topics) => {
        res.status(200).send(topics);
    })
        .catch(next);

}