'use strict';

pollList.$inject = ['pollResource'];

function pollList(pollResource) {
  const vm = this;

  pollResource.query().$promise.then(result => {
    vm.polls = result;
  });

  return vm;
}

module.exports = pollList;
