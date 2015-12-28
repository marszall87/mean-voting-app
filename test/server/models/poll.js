'use strict';
const should = require('chai').use(require('chai-fuzzy')).use(require('chai-things')).use(require('chai-as-promised')).should();
const path = require('path');
const app = require(path.resolve('./server/app.js'));
const Poll = require(path.resolve('./server/models/poll.js'));

describe('poll model', () => {
  before(() => app.initMongo());

  afterEach(() => {
    return Poll.remove();
  });

  it('should create and save new poll', () => {
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
    return poll.save().should.eventually.be.resolved;
  });

  it('should be rejected because of empty title', () => {
    const poll = new Poll({
      title: '',
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
    return poll.save().should.be.rejected;
  });

  it('should be rejected because of one answer', () => {
    const poll = new Poll({
      title: 'lorem ipsum',
      answers: [
        {
          title: 'foo',
          votes: 2
        }
      ]
    });
    return poll.save().should.be.rejected;
  });

  it('should be rejected because of empty answer', () => {
    const poll = new Poll({
      title: 'lorem ipsum',
      answers: [
        {
          title: '',
          votes: 2
        },
        {
          title: 'bar',
          votes: 3
        }
      ]
    });
    return poll.save().should.be.rejected;
  });

});
