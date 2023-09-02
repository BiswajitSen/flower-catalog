const fs = require('fs');

const sendResponse = (res, statusCode, headers, content = '') => {
  res.writeHead(statusCode, {
    ...headers,
    'Content-Length': content.length,
  });
  res.end(content);
};

const readFile = (filePath, onCompletion, onError, encoding = null) => {
  fs.readFile(filePath, encoding, (err, content) => {
    if (err) {
      console.log(err.message);
      onError();
      return;
    }
    onCompletion(content);
  });
};

module.exports = {
  sendResponse,
  readFile,
};
