const { MIME_TYPES } = require('./mime-types');

const getHeaders = (contentPath) => {
  const Headers = {
    html: { 'Content-Type': MIME_TYPES.html },
    css: { 'Content-Type': MIME_TYPES.css },
    plain: { 'Content-type': MIME_TYPES.plain },
    jpg: { 'Content-Type': MIME_TYPES.jpg },
    jpeg: { 'Content-Type': MIME_TYPES.jpeg },
    pdf: { 'Content-Type': MIME_TYPES.pdf, 'Content-Disposition': 'attachment' },
    gif: { 'Content-Type': MIME_TYPES.gif },
    js: { 'Content-Type': MIME_TYPES.js },
    png: { 'Content-Type': MIME_TYPES.png },
  };

  const fileType = contentPath.split('.').pop();
  return { ...Headers[fileType] };
};

module.exports = {
  getHeaders,
};
