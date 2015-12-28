'use strict';

const config = {
  modules: ['poll', 'vote'],
  mongo: {
    host: 'localhost',
    port: 27017,
    db: 'voting-app'
  }
};

module.exports = config;
