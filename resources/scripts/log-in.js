const displayMessage = (message) => {
  console.log(message);
};

const submitForm = () => {
  const name = document.querySelector('#name').value;

  return fetch('/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
};

const setUpFormSubmission = () => {
  const logInForm = document.querySelector('#log-in');
  logInForm.onsubmit = (event) => {
    event.preventDefault();
    submitForm()
      .then((res) => res.json())
      .then((redirectionUrl) => (window.location.href = redirectionUrl));
  };
};

const main = () => {
  setUpFormSubmission();
};

window.onload = main;
