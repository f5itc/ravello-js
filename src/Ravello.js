// src/Ravello

const methods = require('./methods');
const request = require('./request');
const waiters = require('./waiters');
const constants = require('./constants');

const composeMethod = ({ method, path }) => (body) => request({ path, method, body });

const builtMethods = {};

Object.keys(methods).forEach((key) => { builtMethods[key] = composeMethod(methods[key]); });

const Ravello = Object.assign({}, builtMethods, waiters, constants);

module.exports = Ravello;
