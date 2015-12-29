'use strict';
const should = require('chai').use(require('chai-fuzzy')).use(require('chai-things')).use(require('chai-as-promised')).should();
const path = require('path');
const app = require(path.resolve('./server/app.js'));
const controller = require(path.resolve('./server/controllers/polls.js'));
const Poll = require(path.resolve('./server/models/poll.js'));
const error = require(path.resolve('./server/utils/error.js'));

describe('poll controller', () => {
  before(() => app.initMongo());

  afterEach(() => {
    return Poll.remove();
  });

  it('should create and save new poll', () => {
    const title = 'lorem ipsum';
    const poll = controller.createPoll(title, ['foo', 'bar']);
    return Promise.all([
      poll.should.eventually.have.property('title', title),
      poll.should.eventually.have.property('answers').that.contains.an.item.with.property('title', 'foo'),
      poll.should.eventually.have.property('answers').that.contains.an.item.with.property('title', 'bar')
    ]);
  });

  describe('poll operations', () => {
    let _poll = null;

    beforeEach(() => {
      const poll = new Poll({
        title: 'lorem ipsum',
        answers: [
          {
            title: 'foo',
            votes: 2
          },
          {
            title: 'bar',
            votes: 3
          }
        ]
      });
      return poll.save().then(poll => _poll = poll);
    });

    it('should return existing poll', () => {
      const poll = controller.findPollById(_poll.id).then(poll => poll.toObject());
      return poll.should.become(_poll.toObject());
    });

    it('should update existing poll', () => {
      const title = 'baz';
      const poll = controller.updatePoll(_poll, title).then(poll => poll.toObject());
      return Promise.all([
        poll.should.eventually.have.property('title', title)
      ]);
    });

    it('should remove existing poll', () => {
      const poll = controller.removePoll(_poll).then(poll => poll.toObject());
      return Promise.all([
        poll.should.become(_poll.toObject()),
        Poll.findById(_poll.id).should.eventually.be.null
      ]);
    });

    it('should throw NotFound', () => {
      const poll = controller.findPollById(_poll.id.split('').reverse().join(''));
      return poll.should.be.rejectedWith(error.NotFound);
    });

    it('should throw InvalidRequest', () => {
      should.throw(() => controller.findPollById('x'), error.InvalidRequest);
    });

    describe('poll votes', () => {
      it('should increase vote by 1', () => {
        const oldVotes = _poll.answers[0].votes;
        const poll = controller.vote(_poll, _poll.answers[0].id);
        return poll.should.eventually.have.property('answers').to.have.property('0').to.have.property('votes', oldVotes+1);
      });

    });

  });

});
