const { sendResponse, readFile } = require('./io-handlers');
const { handlePageNotFound } = require('./error-handlers');
const { getHeaders } = require('./headers');
const HTTP_STATUS = require('./http-status');

const getQueryParams = (url) => {
  const queryString = url.split('?').pop();
  return new URLSearchParams(queryString);
};

const handleSearchRequest = (req, res) => {
  const queryParams = getQueryParams(req.url);
  const searchedFlower = queryParams.get('searched-flower').toLowerCase();

  const filePath = `./resources/pages/${searchedFlower}.html`;
  const headers = getHeaders('html');

  readFile(
    filePath,
    (content) => sendResponse(res, HTTP_STATUS.OK, headers, content),
    () => handlePageNotFound(req, res)
  );
};

module.exports = {
  handleSearchRequest,
};
