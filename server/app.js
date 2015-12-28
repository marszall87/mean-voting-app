'use strict';

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require(path.resolve('./config/config.js'));
const logger = require(path.resolve('./server/utils/logger.js'));
const validationErrorHandler = require(path.resolve('./server/utils/validationErrorHandler.js'));
const errorHandler = require(path.resolve('./server/utils/errorHandler.js'));

function initMongo() {
  mongoose.Promise = global.Promise;
  return new Promise((resolve, reject) => {
    if (!mongoose.connection.readyState) {
      const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`;
      mongoose.connect(uri, {}, (err) => {
        if (err) {
          reject(err);
        } else {
          logger.info(`Connected to MongoDB (${uri})`);
          resolve();
        }
      });
    } else {
      resolve();
    }
  });
}

function initExpress() {
  const app = express();

  app.use(morgan('dev', {'stream': logger.stream}));
  app.use(bodyParser.json());
  app.use(cors());

  for (let route of config.routes) {
    app.use(`/${route}`, require(path.resolve(`./server/routes/${route}.js`)));
  }

  app.use(validationErrorHandler);
  app.use(errorHandler);

  return new Promise(resolve => {
    resolve(app);
  });
}

function startExpress(app) {
  return new Promise((resolve, reject) => {
    app.listen(config.server.port, () => {
      logger.info(`Server running on port ${config.server.port}`);
      resolve(app);
    }).on('error', reject);
  });
}

function start() {
  return initMongo()
    .then(initExpress)
    .then(startExpress)
    .then((app) => {
      logger.info('Application started');
      return app;
    }).catch(err => {
      logger.error('Application failed during initialization');
      logger.error(err);
      process.exit(1);
    });
}

module.exports = {
  start,
  initMongo,
  initExpress
};
