'use strict';
const path = require('path');
const mongoose = require('mongoose');
const Poll = require(path.resolve('./server/models/poll.js'));
const error = require(path.resolve('./server/utils/error.js'));

function createPoll(title, answers) {
  const poll = new Poll({
    title: title,
    answers: answers.map(a => {
      return {
        title: a
      };
    })
  });
  return poll.save();
}

function findPollById(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new error.InvalidRequest('Requested id is invalid');
  }
  return Poll.findById(id).exec().then(poll => {
    if (!poll) {
      throw new error.NotFound('Requested poll couldn\'t be found');
    }
    return poll;
  });
}

function listPolls() {
  return Poll.find().select('title created').sort('-created').exec();
}

function updatePoll(poll, title, answers) {
  if (title !== undefined) {
    poll.title = title;
  }
  if (answers !== undefined) {
    poll.answers = answers.map(a => {
      return {
        title: a
      };
    });
  }
  return poll.save();
}

function removePoll(poll) {
  return poll.remove();
}

function vote(poll, answerId) {
  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    throw new error.InvalidRequest('Requested answerId is invalid');
  }
  const answer = poll.answers.id(answerId);
  if (!answer) {
    throw new error.NotFound('Requested answer couldn\'t be found');
  }
  answer.votes++;
  return poll.save();
}

module.exports = {
  createPoll,
  findPollById,
  listPolls,
  updatePoll,
  removePoll,
  vote
};
