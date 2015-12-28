'use strict';
const path = require('path');
const router = require('express').Router();
const controller = require(path.resolve('./server/controllers/polls.js'));

router.post('/', function (req, res, next) {
  controller.createPoll(req.body.title, req.body.answers)
    .then(poll => res.send(poll))
    .catch(next);
});

router.get('/', function(req, res, next) {
  controller.listPolls()
    .then(polls => res.send(polls))
    .catch(next);
});

router.get('/:id', function(req, res) {
  res.send(req.poll);
});

router.put('/:id', function(req, res, next) {
  controller.updatePoll(req.poll, req.body.title, req.body.answers)
    .then(poll => res.send(poll))
    .catch(next);
});

router.delete('/:id', function(req, res, next) {
  controller.removePoll(req.poll)
    .then(() => res.send(req.poll))
    .catch(next);
});

router.post('/:id/vote/:answerId', function(req, res, next) {
  controller.vote(req.poll, req.params.answerId)
    .then(poll => res.send(poll))
    .catch(next);
});

router.param('id', function(req, res, next, id) {
  controller.findPollById(id)
    .then(poll => {
      req.poll = poll;
      next();
    })
    .catch(next);
});

module.exports = router;
