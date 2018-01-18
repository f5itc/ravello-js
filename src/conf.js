// src/conf
// Set default configuration and provide a method for overriding
const util  = require('util');

const baseLogger = (response) => {
  console.log(util.inspect(response, { colors: true, depth: null }));
}

const conf = {
  Promise: Promise,
  Logger: baseLogger
};

module.exports.conf = conf;

module.exports.configure = (newConf) => Object.assign(conf, newConf);
