'use strict';

function NotFound(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Requested resource couldn\'t be found';
  this.statusCode = 404;
}

function InvalidRequest(message) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message || 'Request is invalid';
  this.statusCode = 400;
}

module.exports = {
  NotFound,
  InvalidRequest
};
