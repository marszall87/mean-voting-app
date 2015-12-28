'use strict';

pollForm.$inject = ['pollResource'];

function pollForm(pollResource) {
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

  function save() {
    const poll = new pollResource(vm.poll);
    poll.$save().then(() => {
      console.log('saved');
    });
  }
}

module.exports = pollForm;
