// src/errors

const handleError = module.exports.handleError = (res, responseData) => {
  if (!res.statusCode.toString().startsWith('2')) {
    const apiError = new Error();
    apiError.message = res.statusMessage;
    apiError.code = res.statusCode;
    apiError.data = responseData;
    return apiError;
  }
};
