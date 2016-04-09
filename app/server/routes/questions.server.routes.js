'use strict';

module.exports = function(app) {
    var questions = require('../controllers/questions.server.controller');

    app.route('/questions')
        .get(questions.list)
        .post(questions.create);

    app.route('/questions/:question_id')
        .get(questions.read)
        .put(questions.update)
        .delete(questions.delete);

    app.param('question_id', questions.questionsByID);
};
