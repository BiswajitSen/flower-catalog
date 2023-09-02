const { readFile, sendResponse } = require('./io-handlers');
const { getHeaders } = require('./headers');
const FILE_PATHS = require('./file-paths');
const HTTP_STATUS = require('./http-status');

const serveContent = (req, res, errorType) => {
  const headers = getHeaders('html');

  readFile(
    FILE_PATHS[errorType],
    (content) => sendResponse(res, HTTP_STATUS[errorType], headers, content),
    (err) => console.log(err.message)
  );
};

const handleInternalServerError = (req, res) => {
  serveContent(req, res, 'INTERNAL_SERVER_ERROR');
};

const handlePageNotFound = (req, res) => {
  serveContent(req, res, 'NOT_FOUND');
};

const handleBadRequest = (req, res) => {
  serveContent(req, res, 'BAD_REQUEST');
};

const handleInvalidmethod = (req, res) => {
  serveContent(req, res, 'METHOD_NOT_ALLOWED');
};

const handleUnacceptableRequest = (req, res) => {
  serveContent(req, res, 'REQUEST_NOT_ACCEPTABLE');
};

module.exports = {
  handleBadRequest,
  handleInternalServerError,
  handlePageNotFound,
  handleInvalidmethod,
  handleUnacceptableRequest,
};
