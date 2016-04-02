'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    AnswerSchema = require('./answer.server.model.js'),
    UserSchema = require('./user.server.model.js'),
    Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
	},
    description: {
        type: String,
        default: '',
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    answers: [ AnswerSchema ],
    user: UserSchema
});

mongoose.model('Question', QuestionSchema);
