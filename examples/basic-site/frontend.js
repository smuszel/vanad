// let _state = {
//     view: 'login',
//     username: '',
// };
// const state = {
//     get value() {
//         return _state;
//     },
//     set value(v) {
//         _state = v;
//         render(v);
//     },
// };

// const loginField = document.createElement('input');
// const passwordField = document.createElement('input');
// const loginContainer = document.createElement('div');
// const loginSubmitButton = document.createElement('button');
// const registerLink = document.createElement('a');
// const dashboardMessage = document.createElement('h1');
// const dashboardContainer = document.createElement('div');
// const logoutButton = document.createElement('button');
// const mainContainer = document.createElement('div');

// passwordField.type = 'password';
// passwordField.placeholder = 'password';
// loginField.placeholder = 'your login';
// registerLink.href = 'javasript:';
// logoutButton.innerText = 'log out';
// logoutButton.tabIndex = 0;
// registerLink.style.justifySelf = 'center';
// mainContainer.style.display = 'flex';
// mainContainer.style.justifyContent = 'center';
// dashboardContainer.style.justifyContent = 'space-between';

// const render = ({ username, view }) => {
//     passwordField.value = '';
//     loginField.value = username;
//     loginContainer.style.display = 'none';
//     dashboardContainer.style.display = 'none';

//     if (view === 'login') {
//         mainContainer.style.display = 'flex';
//         loginContainer.style.display = 'inline-grid';
//         loginSubmitButton.innerText = 'Log In';
//         registerLink.innerText = 'registration form';
//     } else if (view === 'register') {
//         mainContainer.style.display = 'flex';
//         loginContainer.style.display = 'inline-grid';
//         loginSubmitButton.innerText = 'Submit';
//         registerLink.innerText = 'back';
//     } else if (view === 'admin') {
//         mainContainer.style.display = 'block';
//         dashboardContainer.style.display = 'flex';
//         dashboardMessage.innerText = 'This is admin panel';
//     } else if (view === 'user') {
//         mainContainer.style.display = 'block';
//         dashboardContainer.style.display = 'flex';
//         dashboardMessage.innerText = 'Welcome ' + username;
//     }
// };

// registerLink.addEventListener('click', () => {
//     if (state.value.view === 'login') {
//         state.value = { view: 'register', username: '' };
//     } else {
//         state.value = { view: 'login', username: '' };
//     }
// });

// logoutButton.addEventListener('click', () => {
//     state.value = { view: 'login', username: '' };
// });

// loginSubmitButton.addEventListener('click', () => {
//     if (state.value.view === 'register') {
//         state.value = { view: 'login', username: loginField.value };
//     } else if (loginField.value === 'admin') {
//         state.value = { view: 'admin', username: 'x' };
//     } else {
//         state.value = { view: 'user', username: loginField.value };
//     }
// });

// loginContainer.appendChild(loginField);
// loginContainer.appendChild(passwordField);
// loginContainer.appendChild(loginSubmitButton);
// loginContainer.appendChild(registerLink);

// dashboardContainer.appendChild(dashboardMessage);
// dashboardContainer.appendChild(logoutButton);

// mainContainer.appendChild(dashboardContainer);
// mainContainer.appendChild(loginContainer);
// document.body.appendChild(mainContainer);
// render(_state);
