// src/request
const https = require('https');
const join  = require('path').join;
const conf  = require('./conf').conf;

const RavelloError = require('./errors').RavelloError;
const hasError = require('./errors').hasError;

const API_HOST = 'cloud.ravellosystems.com';
const API_PATH = '/api/v1';

const DEBUG    = process.env.RAVELLO_DEV_MODE_ENABLED;

// Wrap any numbers >= 16 digits in quotes. Pretty unfortunate that this is is necessary, but the
// Ravello API returns numbers in its JSON responses which are larger than Number.MAX_SAFE_INTEGER,
// and this is one of only a couple approaches which will maintain data integrity of resource IDs.
const parseJSON = (str) => (
  JSON.parse(str.replace(/([\[:])?(\d{16,})([,\}\]])/g, "$1\"$2\"$3"))
);

const baseHeaders = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const makeAuthHeader = (credentials) => {
  if (!credentials || !credentials.domain || !credentials.password || !credentials.username) {
    throw new Error('Ravello credentials (username, password, and domain) are required to make authentication request.');
  };

  const { domain, username, password } = credentials;

  return {
    Authorization: 'Basic: ' + new Buffer(`${domain}/${username}:${password}`).toString('base64'),
  }
};

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
      if (hasError(res)) {
        const err = new RavelloError({ res, responseData });
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

  // On request error, log and reject
  req.on('error', (err) => {
    conf.Logger(Object.assign({ level: 'ERROR', type: 'request', err }, opts));
    reject(err);
  });

  req.end();
});

const authenticate = () => (
  ravelloRequest({
    headers: makeAuthHeader(conf.credentials),
    method:  'POST',
    path:    '/login',
  })
);

const checkAuthentication = () => new conf.Promise((resolve, reject) => {
  if (cookie) { return resolve(true); }
  return resolve(authenticate());
});

// TODO: add retry / backoff for retryable errors
const request = (opts) => (

  // Ensure we have authentication
  checkAuthentication().then(() => (

    // Execute request
    ravelloRequest(opts).catch((err) => {


      // If unauthorized error, attempt to re-authenticate
      if (err.code === 401) {
        cookie = null;
        return authenticate().then(() => ravelloRequest(opts));
      }

      throw err;
    })

  ))

);

module.exports = request;
