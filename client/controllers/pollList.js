'use strict';

pollList.$inject = ['Poll'];

function pollList(Poll) {
  const vm = this;

  vm.polls = [];

  init();

  function init() {
    Poll.query().$promise.then(result => {
      vm.polls = result;
    });
  }

  return vm;
}

module.exports = pollList;
