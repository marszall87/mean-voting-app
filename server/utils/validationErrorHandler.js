'use strict';

const _ = require('lodash');

/* eslint no-unused-vars: 0 */
//noinspection JSUnusedLocalSymbols
function validationErrorHandler(err, req, res, next) {
  if (err.name === 'ValidationError') {
    res.status(400).send({
      errors: _.mapValues(err.errors, e => e.message)
    });

  } else {
    // it's not validation error, pass it on
    next(err);
  }
}

module.exports = validationErrorHandler;
