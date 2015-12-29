'use strict';

Poll.$inject = ['$resource', 'config'];

function Poll($resource, config) {
  const baseURL = `http://${config.server.host}:${config.server.port}`;
  return $resource(`${baseURL}/polls/:id`, null, {
    vote: {
      method: 'POST',
      url: `${baseURL}/polls/:id/vote/:answerId`
    }
  });
}

module.exports = Poll;
