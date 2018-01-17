// src/request
const https = require('https');
const join  = require('path').join;
const conf  = require('./conf').conf;

const API_HOST = 'cloud.ravellosystems.com';
const API_PATH = '/api/v1';

const DOMAIN   = process.env.RAVELLO_DOMAIN;
const USERNAME = process.env.RAVELLO_USERNAME;
const PASSWORD = process.env.RAVELLO_PASSWORD;

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

      try {
        if (responseData.length > 0) {
          try {
            responseData = JSON.parse(responseData);
          }
          catch(e) {
            console.log('Could not parse responseData:', e);
          }
        }

        if (!res.statusCode.toString().startsWith('2')) {
          const apiError = new Error();
          apiError.message = res.statusMessage;
          apiError.code = res.statusCode;
          apiError.data = responseData;
          reject(apiError);
        }

        else {
          resolve(responseData || true);
        }
      }

      catch(e) { reject(e); }
    });

  });

  req.on('error', (err) => { reject(err); });

  if (body) { req.write(JSON.stringify(body)); }

  req.end();
});

const authenticate = () => (
  ravelloRequest({
    headers: makeAuthHeader(DOMAIN, USERNAME, PASSWORD),
    method:  'POST',
    path:    '/login',
  })
);

// TODO: check cookie expiration
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
        return authenticate().then(() => ravelloRequest(opts));
      }

      console.log('Unhandled error:', err.message);
      throw err;
    })
  ));

};

module.exports = request;
