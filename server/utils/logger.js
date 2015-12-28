'use strict';

var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      depth: 4,
      handleExceptions: true
    })
  ]
});

logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
