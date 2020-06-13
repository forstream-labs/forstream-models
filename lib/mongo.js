'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const mongoose = require('mongoose');

exports.setup = (config) => {
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  if (config.username && config.password) {
    options.user = config.username;
    options.pass = config.password;
    options.authSource = 'admin';
  }
  if (config.cert) {
    options.sslValidate = true;
    options.checkServerIdentity = false;
    options.sslCA = [fs.readFileSync(config.cert)];
  }
  mongoose.Promise = Promise;
  mongoose.set('debug', config.debug);
  mongoose.set('useCreateIndex', true);
  mongoose.set('bufferCommands', false);
  mongoose.connect(`mongodb://${config.host}:${config.port}/${config.schema}?${config.options}`, options).catch((err) => {
    if (config.logger) {
      config.logger.error('Could not connect to MongoDB: ', err);
    }
  });
  mongoose.connection.on('connected', () => {
    if (config.logger) {
      config.logger.info('Connection established with MongoDB (schema %s)', config.schema);
    }
  });
  mongoose.connection.on('disconnected', () => {
    if (config.logger) {
      config.logger.info('Connection with MongoDB was lost');
    }
  });
};
