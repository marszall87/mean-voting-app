'use strict';

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const config = require(path.resolve('./config/config.js'));
const logger = require(path.resolve('./utils/logger.js'));
const validationErrorHandler = require(path.resolve('./utils/validationErrorHandler.js'));
const errorHandler = require(path.resolve('./utils/errorHandler.js'));

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`);

const app = express();

app.use(morgan('dev', {'stream': logger.stream}));
app.use(bodyParser.json());

for (let module of config.modules) {
  app.use(`/${module}`, require(path.resolve(`./controllers/${module}.js`)));
}

app.use(validationErrorHandler);
app.use(errorHandler);

app.listen(3000, function() {
  logger.info('Server running...');
});
