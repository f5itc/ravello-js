// src/Ravello

const methods = require('./methods');
const request = require('./request');
const waiters = require('./waiters');

// Set default configuration and provide a method for overriding
const conf = {
  Promise: Promise,
};

const configure = (newConf) => Object.assign(conf, newConf);

// Compose library methods
const composeMethod = ({ method, path }) => (body) => request({ path, method, body, conf });

const builtMethods = {};

Object.keys(methods).forEach((key) => { builtMethods[key] = composeMethod(methods[key]); });

// Compose export
const Ravello = Object.assign({ configure }, builtMethods, waiters);

module.exports = Ravello;
