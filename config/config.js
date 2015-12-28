'use strict';

const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';

let config = require('./config.default.js');

try {
  const envConfig = require(`./config.${env}.js`);
  config = _.extend(config, envConfig);
} catch (ex) {
  // no env specific config could be found, no biggie
}

module.exports = config;
