const displayUserName = (userName) => {
  const accountSection = document.querySelector('.account-section');
  const nameContainer = document.createElement('div');
  nameContainer.innerText = userName;
  accountSection.prepend(nameContainer);
};

const removeLogInBtn = () => {
  const loginBtn = document.querySelector('#log-in-btn');
  loginBtn.classList.add('hidden');
};

const addLogInBtn = () => {
  const loginBtn = document.querySelector('#log-in-btn');
  loginBtn.classList.remove('hidden');
};

const fetchUserName = () => {
  fetch('/userName', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then(({ userName }) => {
      if (!userName) {
        addLogInBtn();
        return;
      }
      displayUserName(userName);
    })
    .then(removeLogInBtn());
};

const setUpJar = () => {
  const jar = document.querySelector('#jar-image');
  jar.onclick = () => {
    jar.classList.add('hidden');
    setTimeout(() => jar.classList.remove('hidden'), 1000);
  };
};

const main = () => {
  setUpJar();
  fetchUserName();
};

window.onload = main;
