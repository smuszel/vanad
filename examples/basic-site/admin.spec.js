const assert = x => {
    if (!x) throw '';
};

const sel = {
    loginInput: 'input.login:not(:disabled)',
    passwordInput: 'input.password:not(:disabled)',
    loginButton: 'button.submit:not(:disabled)',
    disabledLoginButton: 'button.submit:disabled',
    disabledLoginInput: 'button.submit:disabled',
    disabledPasswordInput: 'input.password.submit:disabled',
    logoutButton: 'button.logout',
    dashboard: '.dashboard',
    userList: 'ul.user',
    userItem: 'li.user',
};

/** @typedef {{ admin: string }} Data */

/** @type {E2ETest<Data>} */
module.exports = async function*({ context }) {
    const page = await context.newPage();

    await page.goto(`http://localhost:5505/site`);
    yield 'There is login button on landing page';
    await page.$(sel.loginButton).then(assert);

    yield 'I can log in by filling form with credentials';
    await page.type(sel.loginInput, 'admin');
    await page.type(sel.passwordInput, 'admin');
    await page.click(sel.loginButton);

    yield 'While log in for is processed the form is disabled';
    page.$(sel.disabledLoginButton).then(assert);
    page.$(sel.disabledLoginInput).then(assert);
    page.$(sel.disabledPasswordInput).then(assert);
    await page.waitForNavigation();

    yield 'After login I see the dashboard';
    page.$(sel.logoutButton).then(assert);
    page.$(sel.dashboard).then(assert);
    page.$(sel.userList).then(assert);

    yield 'I can log out of the dashboard to land on clean form';
    await page.click(sel.logoutButton);
    await page.waitForNavigation();
    page.$(sel.loginButton).then(assert);
    page.$(sel.loginInput).then(assert);
    page.$(sel.passwordInput).then(assert);
};
