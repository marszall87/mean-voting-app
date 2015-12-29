'use strict';
require('chai').use(require('chai-fuzzy')).use(require('chai-things')).use(require('chai-as-promised')).should();
const request = require('supertest');
const path = require('path');
const app = require(path.resolve('./server/app.js'));
const Poll = require(path.resolve('./server/models/poll.js'));

describe('poll routes', () => {
  let agent, pollA, pollB;

  before(() => {
    return app.initMongo()
      .then(() => app.initExpress())
      .then((app) => {
        agent = request.agent(app);
      });
  });

  beforeEach(() => {
    return Promise.all([
      new Poll({
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
      }).save().then(poll => pollA = poll),
      new Poll({
        title: 'baz',
        answers: [
          {
            title: 'a',
            votes: 5
          },
          {
            title: 'b',
            votes: 0
          },
          {
            title: 'c',
            votes: 8
          }
        ]
      }).save().then(poll => pollB = poll)
    ]);
  });

  afterEach(() => {
    return Poll.remove();
  });

  it('should return polls', () => {
    return agent.get('/polls').expect(200).expect(res => {
      console.log(res.body);
      res.body.should.include.something.that.have.property('_id', pollA.id);
      res.body.should.include.something.that.have.property('_id', pollB.id);
    });
  });

  it('should return poll A', () => {
    return agent.get(`/polls/${pollA.id}`).expect(200).expect(res => {
      res.body.should.be.like(JSON.parse(JSON.stringify(pollA)));
    });
  });

  it('should return poll B', () => {
    return agent.get(`/polls/${pollB.id}`).expect(200).expect(res => {
      res.body.should.be.like(JSON.parse(JSON.stringify(pollB)));
    });
  });

});
