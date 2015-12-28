'use strict';

const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true,
    required: 'Title cannot be empty'
  },
  answers: {
    type: [{
      title: {
        type: String,
        required: 'Title cannot be empty'
      },
      votes: {
        type: Number,
        default: 0
      }
    }],
    required: 'Answers should not be empty',
    validate: [
      validateAnswersArray, 'There should be at least 2 answers'
    ]
  }
});

function validateAnswersArray(array) {
  return array.length >= 2;
}

module.exports = mongoose.model('Poll', PollSchema);
