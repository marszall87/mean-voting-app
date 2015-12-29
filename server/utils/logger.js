'use strict';

var winston = require('winston');
var path = require('path');
var config = require(path.resolve('./config/config.js'));

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      depth: 4,
      handleExceptions: true,
      level: config.logger.level
    })
  ]
});

logger.stream = {
  write: function (message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
