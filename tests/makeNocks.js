const nock = require('nock');
const util = require('util');

const ravelloUrl = 'https://cloud.ravellosystems.com:443';
const apiPath    = '/api/v1';

const makeResponseHeaders = (responseData) => ([
  'Access-Control-Allow-Credentials', 'false',
  'Access-Control-Allow-Headers', 'X-Is-Ephemeral,X-Ephemeral-Token-Status,X-EPHEMERAL-TOKEN-AUTHORIZATION,RAVELLO-REQUEST-ID,X-LongToString,X-Ravello-Ui,Accept,Origin,Content-Type,Cache-Control,If-Modified-Since,X-Requested-With,User-Agent,Keep-Alive,X-Requested-With,Authorization,ERROR-CODE,ERROR-MESSAGE',
  'Access-Control-Expose-Headers', 'X-Is-Ephemeral,X-Ephemeral-Token-Status,X-EPHEMERAL-TOKEN-AUTHORIZATION,RAVELLO-REQUEST-ID,X-LongToString,X-Ravello-Ui,Accept,Origin,Content-Type,Cache-Control,If-Modified-Since,X-Requested-With,User-Agent,Keep-Alive,X-Requested-With,Authorization,ERROR-CODE,ERROR-MESSAGE',
  'Content-Type', 'application/json',
  'Date', new Date().toUTCString(),
  'Operation-ID', 'woo',
  'Server', 'nginx',
  'Vary', 'Accept-Encoding',
  'X-Content-Type-Options', 'nosniff',
  'X-Frame-Options', 'SAMEORIGIN',
  'X-Is-Ephemeral', 'false',
  'X-Nginx-Operation-ID', 'woo.otherwoo',
  'X-XSS-Protection', '1; mode=block',
  'Content-Length', '1',
  'Connection', 'Close' 
]);

const makeAuthResponseHeaders = () => ([
  'Access-Control-Allow-Credentials', 'false',
  'Access-Control-Allow-Headers', 'X-Is-Ephemeral,X-Ephemeral-Token-Status,X-EPHEMERAL-TOKEN-AUTHORIZATION,RAVELLO-REQUEST-ID,X-LongToString,X-Ravello-Ui,Accept,Origin,Content-Type,Cache-Control,If-Modified-Since,X-Requested-With,User-Agent,Keep-Alive,X-Requested-With,Authorization,ERROR-CODE,ERROR-MESSAGE',
  'Access-Control-Expose-Headers', 'X-Is-Ephemeral,X-Ephemeral-Token-Status,X-EPHEMERAL-TOKEN-AUTHORIZATION,RAVELLO-REQUEST-ID,X-LongToString,X-Ravello-Ui,Accept,Origin,Content-Type,Cache-Control,If-Modified-Since,X-Requested-With,User-Agent,Keep-Alive,X-Requested-With,Authorization,ERROR-CODE,ERROR-MESSAGE',
  'Content-Type', 'application/json',
  'Date', new Date().toUTCString(),
  'Operation-ID', 'woo',
  'Server', 'nginx',
  'Set-Cookie', 'JSESSIONID=numbers1-numb-ers1-numb-ers123456789; Path=/; Secure; HttpOnly',
  'Set-Cookie', 'rememberMe=deleteMe; Path=/; Max-Age=0; Expires=' + new Date().toUTCString(),
  'Vary', 'Accept-Encoding',
  'X-Content-Type-Options', 'nosniff',
  'X-Frame-Options', 'SAMEORIGIN',
  'X-Is-Ephemeral', 'false',
  'X-Nginx-Operation-ID', 'woo.otherwoo',
  'X-XSS-Protection', '1; mode=block',
  'Content-Length', '787',
  'Connection', 'Close' 
]);

module.exports.makeAuthorizationNock = () => (
  nock('https://cloud.ravellosystems.com:443', { "encodedQueryParams": true })
  .post(apiPath + '/login')
  .reply(200, {  
    "id": 10000000,
    "roles": [
      "USER"
    ],
    "uuid": "numbers1-numb-ers1-numb-ers123456789",
    "name": "woo",
    "surname": "API",
    "email": "woo-api@woo.com",
    "username": "Ravello/a000000/woo-api@woo.com",
    "identityDomain": "a000000",
    "enabled": true,
    "activated": true,
    "locked": false,
    "deleted": false,
    "organization": 10000000,
    "invitationTime": "0000000000000",
    "activateTime": "0000000000000",
    "country": "MOON",
    "nickname": "WOO API",
    "publicUrlClassifier": "wooapi",
    "socialNetworks": {},
    "publicProfileAccess": "ONLY_ME",
    "organizationProfile": {  
        "organizationName": "a000000",
        "id": 10000000,
        "accountStatus": "REGULAR",
        "identityDomain": "a000000",
        "identityDomainDisplayName": "a000000",
        "creationTime": 1000000000000,
        "serviceName":"Ravello",
        "uuid": "numbers1-numb-ers1-numb-ers123456789",
        "nickname": "a000000",
        "publicProfileAccess": "MY_ORG_ONLY"
    }
  }, makeAuthResponseHeaders())
);

module.exports.makeRavelloGETNock = (path, responseData) => (
  nock(ravelloUrl, { encodedQueryParams: true })
  .get(apiPath + path)
  .reply(200, responseData, makeResponseHeaders(responseData))
);

module.exports.makeRavelloPOSTNock = (path, requestData, responseData) => (
  nock(ravelloUrl, { encodedQueryParams: true })
  .post(apiPath + path, requestData)
  .reply(201, responseData, makeResponseHeaders(responseData))
);

module.exports.makeRavelloPUTNock = (path, requestData, responseData) => (
  nock(ravelloUrl, { encodedQueryParams: true })
  .put(apiPath + path, requestData)
  .reply(200, responseData, makeResponseHeaders(responseData))
);

module.exports.makeRavelloDELETENock = (path) => (
  nock(ravelloUrl, { encodedQueryParams: true })
  .delete(apiPath + path)
  .reply(204, '', makeResponseHeaders())
);
