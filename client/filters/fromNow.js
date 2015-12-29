const moment = require('moment');

function fromNow() {
  return input => moment(input).fromNow();
}

module.exports = fromNow;
