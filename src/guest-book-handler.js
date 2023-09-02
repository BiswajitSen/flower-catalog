const HTTP_STATUS = require('./http-status');
const { getHeaders } = require('./headers');
const { sendResponse } = require('./io-handlers');

const getCommenterName = (req) => req.headers.cookie.split('=').pop();

const handleNewComment = (req, res, commentStorage) => {
  let reqBody = '';
  req.on('data', (chunk) => {
    reqBody += chunk;
  });

  req.on('end', () => {
    const commenter = getCommenterName(req);
    const { comment } = JSON.parse(reqBody);
    const newComment = {
      commenter,
      comment,
      timestamp: new Date().toUTCString(),
    };

    commentStorage.add(newComment);
    const headers = getHeaders('html');
    sendResponse(res, HTTP_STATUS.OK, { ...headers }, JSON.stringify(newComment));
  });
};

const handleRequestForComments = (req, res, commentStorage) => {
  const comments = commentStorage.getComments();
  const headers = getHeaders('html');
  sendResponse(res, HTTP_STATUS.OK, headers, JSON.stringify(comments));
};

module.exports = {
  handleNewComment,
  handleRequestForComments,
};
