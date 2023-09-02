const { initiateFlowerCatalog } = require('./src/server');

const main = () => {
  const port = 8000;
  const storagePath = './data/comments.json';
  initiateFlowerCatalog(port, storagePath);
};

main();
