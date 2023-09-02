const createSpanElement = (text) => {
  const spanContainer = document.createElement('span');
  spanContainer.innerText = text;
  return spanContainer;
};

const createCommentElement = ({ commenter, comment, timestamp }) => {
  const commentElement = document.createElement('li');

  [commenter, comment, timestamp]
    .map(createSpanElement)
    .forEach((element) => commentElement.append(element));

  return commentElement;
};

const displayComment = (commentInfo) => {
  const commentLog = document.querySelector('.comment-log');
  commentLog.prepend(createCommentElement(commentInfo));
};

const displayComments = (comments) => comments.forEach(displayComment);
const loadComments = () => fetch('/guestbook/comments').then((res) => res.json());
const loadAndDisplayComments = () => loadComments().then(displayComments);
const displayNewComment = (commentInfo) => displayComment(commentInfo);

const submitForm = () => {
  const comment = document.querySelector('#comment').value;

  fetch('/guestbook/addComment/', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ comment }),
  })
    .then((res) => res.json())
    .then(displayNewComment);
};

const setUpFormSubmit = () => {
  const formElement = document.querySelector('.flower-comments');

  formElement.onsubmit = (event) => {
    event.preventDefault();
    submitForm();
  };
};

window.onload = () => {
  loadAndDisplayComments();
  setUpFormSubmit();
};
