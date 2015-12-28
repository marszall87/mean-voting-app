const angular = require('angular');
require('angular-resource');
require('angular-ui-router');

const routing = require('./routing.js');
const pollResource = require('./services/pollResource.js');
const config = require('../config/config.js');

angular.module('voteApp', ['ngResource', 'ui.router'])
  .constant('config', config)
  .config(routing)
  .factory('pollResource', pollResource);
