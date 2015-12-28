'use strict';

const pollList = require('./controllers/pollList.js');
const pollForm = require('./controllers/pollForm.js');

routing.$inject = ['$stateProvider', '$urlRouterProvider'];

function routing($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('poll-list', {
      url: '/',
      controller: pollList,
      controllerAs: 'vm',
      templateUrl: 'templates/pollList.html'
    })
    .state('new-poll', {
      url: '/new',
      controller: pollForm,
      controllerAs: 'vm',
      templateUrl: 'templates/pollForm.html'
    });
}

module.exports = routing;
