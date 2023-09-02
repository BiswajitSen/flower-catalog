const fs = require('fs');
const http = require('http');
const { handle } = require('./router');
const { CommentStorage } = require('./comment-storage');

const logRequest = (req) => console.log(req.method, req.url);

const createServer = (port, commentStorage) => {
  const server = http.createServer((req, res) => {
    logRequest(req);
    handle(req, res, commentStorage);
  });

  server.listen(port, () => {
    console.log('Server is listening on', port);
  });
};

const updateLocalStorage = (storagePath, comments) => {
  const stringyfiedComments = JSON.stringify(comments, null, 2);
  fs.writeFile(storagePath, stringyfiedComments, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
};

const initiateFlowerCatalog = (port, commentStoragePath) => {
  const updateCommentStorage = updateLocalStorage.bind(null, commentStoragePath);
  let comments = undefined;
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');

  try {
    comments = JSON.parse(fs.readFileSync(commentStoragePath, 'utf-8'));
  } catch {
    comments = [];
  } finally {
    const commentStorage = new CommentStorage(comments, updateCommentStorage);
    createServer(port, commentStorage);
  }
};

module.exports = {
  initiateFlowerCatalog,
};
