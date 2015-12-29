'use strict';

showPoll.$inject = ['Poll', '$stateParams'];

function showPoll(Poll, $stateParams) {
  const vm = this;

  vm.poll = null;
  vm.vote = vote;

  init();

  function init() {
    Poll.get({id: $stateParams.id}).$promise
      .then(calculatePercentage)
      .then(selectWinner)
      .then(poll => {
        vm.poll = poll;
      });
  }

  function calculatePercentage(poll) {
    const sum = poll.answers.reduce((sum, answer) => sum + answer.votes, 0);
    poll.answers.forEach(answer => answer.percent = answer.votes * 100 / sum);
    return poll;
  }

  function selectWinner(poll) {
    const sorted = poll.answers.slice().sort((a, b) => a.votes < b.votes);
    // check if it's not a tie
    if (sorted[0].votes > sorted[1].votes) {
      sorted[0].winner = true;
    }
    return poll;
  }

  function vote(answer) {
    Poll.vote({id: vm.poll._id, answerId: answer._id}, {}).$promise
      .then(calculatePercentage)
      .then(selectWinner)
      .then(result => {
        vm.poll = result;
      });
  }
}

module.exports = showPoll;
