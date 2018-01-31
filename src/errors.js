// src/errors

// TODO: test for presence of configuration errors in app JSON
const hasError = (res) => (
  res.headers['error-code'] || !res.statusCode.toString().startsWith('2')
);

function RavelloError({ res, responseData }, message, fileName, lineNumber) {
  const err = new Error(message, fileName, lineNumber);

  if (Object.setPrototypeOf && Object.getPrototypeOf) {
    Object.setPrototypeOf(err, Object.getPrototypeOf(this));
  } else {
    err.__proto__ = this.proto;
  }

  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, RavelloError);
  }

  // If error-code / error-message headers exist
  if (res && res.headers && res.headers['error-code'] && res.headers['error-message']) {
    err.code = parseInt(res.headers['error-code'], 10);
    err.message = res.headers['error-message'];
  }

  // Otherwise, use HTTP status code
  else {
    err.code = res.statusCode;
    err.message = res.statusMessage;
  }

  // If responseData exists
  if (responseData) {
    err.data = responseData;
  }

  return err;
}

if (Object.setPrototypeOf) {
  Object.setPrototypeOf(RavelloError, Error);
} else {
  RavelloError.__proto__ = Error;
}

module.exports = { hasError, RavelloError };
