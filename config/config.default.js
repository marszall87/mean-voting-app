module.exports = {
  routes: ['polls'],
  mongo: {
    host: 'localhost',
    port: 27017,
    db: 'voting-app'
  },
  server: {
    host: 'localhost',
    port: 3000
  },
  logger: {
    level: 'info'
  }
};
