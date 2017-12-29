// src/Ravello

const methods = require('./methods');
const request = require('./request');
const waiters = require('./waiters');

const composeMethod = ({ method, path }) => (body, pathArgs) => request({ path, pathArgs, method, body });

const builtMethods = {};

Object.keys(methods).forEach((key) => { builtMethods[key] = composeMethod(methods[key]); });

const Ravello = Object.assign({}, builtMethods, waiters);

module.exports = Ravello;
