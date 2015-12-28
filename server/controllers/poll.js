'use strict';
const path = require('path');
const mongoose = require('mongoose');
const router = require('express').Router();
const Poll = require(path.resolve('./models/poll.js'));
const NotFound = require(path.resolve('./utils/notFound.js'));

function createPoll(title, answers) {
  const poll = new Poll({
    title: title,
    answers: answers
  });
  return poll.save();
}

function findPollById(id) {
  return Poll.findById(id).exec();
}

function listPolls() {
  return Poll.find().select('id title').sort('-created').exec();
}

function deletePollById(id) {
  return Poll.findByIdAndRemove(id).exec();
}

router.post('/', function (req, res, next) {
  createPoll(req.body.title, req.body.answers)
    .then(poll => res.send(poll))
    .catch(next);
});

router.get('/', function(req, res, next) {
  listPolls()
    .then(polls => res.send(polls))
    .catch(next);
});

router.get('/:id', function(req, res, next) {
  findPollById(req.params.id)
    .then(poll => {
      if (!poll) {
        throw new NotFound();
      }
      res.send(poll);
    })
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  deletePollById(req.params.id)
    .then(poll => {
      if (!poll) {
        throw new NotFound();
      }
      res.send(poll);
    })
    .catch(next);
});

// Check if 'id' is a valid ObjectId
router.param('id', function(req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new NotFound();
  }
  next();
});

module.exports = router;
