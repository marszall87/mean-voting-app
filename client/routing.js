'use strict';

const pollList = require('./controllers/pollList.js');
const pollForm = require('./controllers/pollForm.js');
const showPoll = require('./controllers/showPoll.js');

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
    })
    .state('show-poll', {
      url: '/:id',
      controller: showPoll,
      controllerAs: 'vm',
      templateUrl: 'templates/showPoll.html'
    });
}

module.exports = routing;
