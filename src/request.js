// src/request
const https = require('https');
const join  = require('path').join;
const conf  = require('./conf').conf;
const parseJSON = require('../lib/json_parse');
const handleError = require('./errors').handleError;

const API_HOST = 'cloud.ravellosystems.com';
const API_PATH = '/api/v1';

const DOMAIN   = process.env.RAVELLO_DOMAIN;
const USERNAME = process.env.RAVELLO_USERNAME;
const PASSWORD = process.env.RAVELLO_PASSWORD;
const DEBUG    = process.env.RAVELLO_DEV_MODE_ENABLED;

const baseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const makeAuthHeader = (domain, user, pass) => ({
  Authorization: 'Basic: ' + new Buffer(`${domain}/${user}:${pass}`).toString('base64'),
});

let cookie;

const ravelloRequest = ({ body, headers={}, method, path }) => new conf.Promise((resolve, reject) => {
  if (typeof path === 'function') {
    if (typeof body !== 'object') { throw new Error('Body must be an object'); }
    path = path(body);
  }

  const opts = {
    method,
    hostname: API_HOST,
    path:     join(API_PATH, path),
    port:     443,
    headers:  Object.assign({}, baseHeaders, headers),
  };

  if (cookie) { opts.headers['Cookie'] = cookie; }
  if (body) { opts.headers['Content-Length'] = (JSON.stringify(body)).length }

  const req = https.request(opts, (res) => {
    let responseData = '';

    res.on('data', (chunk) => { responseData += chunk; });

    res.on('end', () => {
      if (res.headers['set-cookie']) { cookie = res.headers['set-cookie'] }

      if (responseData.length > 0) {
        try {
          responseData = parseJSON(responseData);
        }
        catch(e) {
          console.log('Could not parse responseData:', e);
        }
      }

      // On response error, log and reject
      const err = handleError(res, responseData);

      if (err) {
        conf.Logger({ level: 'ERROR', type: 'response', err, body: responseData, headers: res.headers });
        return reject(err);
      }

      // On successful response, log and resolve
      conf.Logger({ level: 'INFO', type: 'response', body: responseData, headers: res.headers });
      return resolve(responseData || true);
    });

  });

  if (body) { req.write(JSON.stringify(body)); }

  // Log request
  conf.Logger(Object.assign({ level: 'INFO', type: 'request', body }, opts));

  req.on('error', (err) => {
    conf.Logger(Object.assign({ level: 'ERROR', type: 'request', err }, opts));
    reject(err);
  });

  req.end();
});

const authenticate = () => (
  ravelloRequest({
    headers: makeAuthHeader(DOMAIN, USERNAME, PASSWORD),
    method:  'POST',
    path:    '/login',
  })
);

const checkAuthentication = () => new conf.Promise((resolve, reject) => {
  if (cookie) { return resolve(true); }
  return resolve(authenticate());
});

// TODO: add retry / backoff for retryable errors
const request = (opts) => {

  // Ensure we have authentication
  return checkAuthentication().then(() => (

    // Execute request
    ravelloRequest(opts).catch((err) => {

      // If unauthorized error, attempt to re-authenticate
      if (err.statusCode === 401) {
        cookie = null;
        return authenticate().then(() => ravelloRequest(opts));
      }

      console.log('Unhandled error:', err.message);
      throw err;
    })
  ));

};

module.exports = request;
