'use strict';

pollResource.$inject = ['$resource', 'config'];

function pollResource($resource, config) {
  return $resource(`http://${config.server.host}:${config.server.port}/polls/:id`);
}

module.exports = pollResource;
