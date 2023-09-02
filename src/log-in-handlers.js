const FILE_PATHS = require('./file-paths');
const HTTP_STATUS = require('./http-status');
const { sendResponse } = require('./io-handlers');

const isRegisteredUser = (req) => 'cookie' in req.headers;
const getUserName = (req) => {
  const userToken = req.headers.cookie;
  return userToken.split('=').pop();
};

const registerUser = (req, res, name) => {
  const redirection = FILE_PATHS.HOME_PAGE;

  sendResponse(
    res,
    HTTP_STATUS.CREATED,
    {
      'Set-Cookie': `username=${name}`,
    },
    JSON.stringify(redirection)
  );
};

const handleLogIn = (req, res) => {
  let reqBody = '';
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => {
    const { name } = JSON.parse(reqBody);
    registerUser(req, res, name);
  });
};

const handleUserName = (req, res) => {
  let reqBody;
  req.on('data', (data) => {
    reqBody += data;
  });

  req.on('end', () => {
    if (isRegisteredUser(req)) {
      const userName = getUserName(req);
      console.log(userName);
      sendResponse(
        res,
        HTTP_STATUS.OK,
        { 'content-type': 'application/json' },
        JSON.stringify({ userName })
      );
      return;
    }

    sendResponse(
      res,
      HTTP_STATUS.OK,
      { 'content-type': 'application/json' },
      JSON.stringify({})
    );
  });
};

module.exports = {
  isRegisteredUser,
  handleLogIn,
  handleUserName,
};
