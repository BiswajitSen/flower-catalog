const FILE_PATHS = require('./file-paths');
const HTTP_STATUS = require('./http-status');
const { getHeaders } = require('./headers');
const { readFile, sendResponse } = require('./io-handlers');
const { handleSearchRequest } = require('./search-handler');
const { isRegisteredUser, handleLogIn, handleUserName } = require('./log-in-handlers');
const { handleNewComment, handleRequestForComments } = require('./guest-book-handler');
const {
  handleBadRequest,
  handlePageNotFound,
  handleInvalidmethod,
  handleUnacceptableRequest,
} = require('./error-handlers');

const isRooturl = (url) => url === '/';
const isValidUrl = (url) => !url.includes('../');
const isRequestToAddComment = (url) => url.startsWith('/guestbook/addComment');
const isRequestForComments = (url) => url === '/guestbook/comments';
const isSearchRequest = (url) => url.startsWith('/search');
const isRequestForGuestBook = (url) => /\/pages\/guest-book.html/.test(url);
const isRequestForLogIn = (url) => /\/login/.test(url);
const isRequestForLogInPage = (url) => /\/pages\/log-in.html/.test(url);
const isRequestForUserName = (url) => url === '/userName';

const resolveTargeturl = (url) => (isRooturl(url) ? FILE_PATHS.HOME_PAGE : url);
const resolveFilePath = (url) => `./resources${url}`;

const serveContent = (res, content, targetUrl) => {
  const headers = getHeaders(targetUrl);
  sendResponse(res, HTTP_STATUS.OK, headers, content);
};

const serveFile = (req, res) => {
  const targetUrl = resolveTargeturl(req.url);
  const filePath = resolveFilePath(targetUrl);
  readFile(
    filePath,
    (content) => serveContent(res, content, targetUrl),
    () => handlePageNotFound(req, res)
  );
};

const redirectToLogIn = (res) => {
  const headers = getHeaders('html');
  sendResponse(res, HTTP_STATUS.REDIRECT, {
    ...headers,
    location: '/pages/log-in.html',
  });
};

const handleRequestForLogInPage = (req, res) => {
  if (isRegisteredUser(req)) {
    handleBadRequest(req, res);
    return;
  }

  serveFile(req, res);
};

const handleRequestForGuestBook = (req, res) => {
  if (!isRegisteredUser(req)) {
    redirectToLogIn(res);
    return;
  }

  serveFile(req, res);
};

const isGetRequest = (method) => method === 'GET';
const isPostRequest = (method) => method === 'POST';

const handleGetRequest = (req, res, commentStorage) => {
  const url = req.url;

  if (!isValidUrl(url)) {
    handleBadRequest(req, res);
    return;
  }

  if (isSearchRequest(url)) {
    handleSearchRequest(req, res);
    return;
  }

  if (isRequestForUserName(url)) {
    handleUserName(req, res);
    return;
  }

  if (isRequestForComments(url)) {
    handleRequestForComments(req, res, commentStorage);
    return;
  }

  if (isRequestForGuestBook(url)) {
    handleRequestForGuestBook(req, res, commentStorage);
    return;
  }

  if (isRequestForLogInPage(url)) {
    handleRequestForLogInPage(req, res);
    return;
  }

  serveFile(req, res);
};

const handlePostRequest = (req, res, commentStorage) => {
  if (isRequestToAddComment(req.url)) {
    handleNewComment(req, res, commentStorage);
    return;
  }

  if (isRequestForLogIn(req.url)) {
    handleLogIn(req, res);
    return;
  }

  handleUnacceptableRequest(req, res, commentStorage);
};

const handle = (req, res, commentStorage) => {
  if (isGetRequest(req.method)) {
    handleGetRequest(req, res, commentStorage);
    return;
  }

  if (isPostRequest(req.method)) {
    handlePostRequest(req, res, commentStorage);
    return;
  }

  handleInvalidmethod(req, res, commentStorage);
};

module.exports = {
  handle,
};
