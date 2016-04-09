'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller.js'),
    Question = mongoose.model('Question'),
    _ = require('lodash');

/**
 * Create a Question
 */
exports.create = function(req, res) {
    var question = new Question(req.body);

    question.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.status(201).json(question);
        }
    });
};

/**
 * Show the current Question
 */
exports.read = function(req, res) {
    var question = req.question ? req.question.toJSON() : {};
    res.json(question);
};

/**
 * Update a Question
 */
exports.update = function(req, res) {

};

/**
 * Delete an Question
 */
exports.delete = function(req, res) {
    var question = req.question;

    question.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(question);
        }
    });
};

/**
 * List of Questions
 */
exports.list = function(req, res) {
    Question.find().exec(function(err, questions) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(questions);
        }
    });
};


exports.questionsByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Question is invalid'
        });
    }

    Question.findById(id).exec(function (err, question) {
        if (err) {
            return next(err);
        } else if (!question) {
            return res.status(404).send({
                message: 'No question with that identifier has been found'
            });
        }
        req.question = question;
        next();
    });
};
