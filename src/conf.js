// src/conf
// Set default configuration and provide a method for overriding
const conf = {
  Promise: Promise,
};

module.exports.conf = conf;

module.exports.configure = (newConf) => Object.assign(conf, newConf);


