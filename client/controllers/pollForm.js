'use strict';

pollForm.$inject = ['Poll', '$state'];

function pollForm(Poll, $state) {
  const vm = this;

  const defaultPoll = {
    title: '',
    answers: [
      '',
      ''
    ]
  };

  vm.poll = defaultPoll;
  vm.addAnswer = addAnswer;
  vm.save = save;

  function addAnswer() {
    vm.poll.answers.push('');
  }

  function parseErrors(errors) {
    const parsedErrors = {};
    // crazy... deals with 'answers.0.title' validation error keys from Mongoose
    Object.keys(errors).map(e => {
      e.split('.').reduce((object, item, index, array) => {
        if (index == array.length - 1) {
          object[item] = errors[e];
        } else if (!object[item]) {
          object[item] = {};
        }
        return object[item];
      }, parsedErrors);
    });
    vm.errors = parsedErrors;
  }

  function save() {
    const poll = new Poll(vm.poll);
    poll.$save().then(() => {
      $state.go('poll-list');
    }).catch(err => parseErrors(err.data.errors));
  }
}

module.exports = pollForm;
