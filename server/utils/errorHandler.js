'use strict';

const path = require('path');
const logger = require(path.resolve('./utils/logger.js'));

/* eslint no-unused-vars: 0 */
//noinspection JSUnusedLocalSymbols
function errorHandler(err, req, res, next) {
  logger.error(err);
  res.status(err.statusCode || 500).send({
    error: err.message
  });
}

module.exports = errorHandler;
