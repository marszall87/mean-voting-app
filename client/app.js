const angular = require('angular');
require('angular-resource');
require('angular-animate');
require('angular-ui-router');

const routing = require('./routing.js');
const config = require('../config/config.js');
const Poll = require('./services/pollResource.js');
const fromNow = require('./filters/fromNow.js');

angular.module('voteApp', ['ngResource', 'ngAnimate', 'ui.router'])
  .constant('config', config)
  .config(routing)
  .factory('Poll', Poll)
  .filter('fromNow', fromNow);
