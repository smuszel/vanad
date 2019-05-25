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

/** @type {TestGenerator<Data>} */
module.exports = async function*({ context }) {
    const page = await context.newPage();

    await page.goto(`http://localhost:5505/site`);
    yield page.$(sel.loginButton);

    await page.type(sel.loginInput, 'admin');
    await page.type(sel.passwordInput, 'admin');
    await page.click(sel.loginButton);
    yield page.$(sel.disabledLoginButton);
    yield page.$(sel.disabledLoginInput);
    yield page.$(sel.disabledPasswordInput);

    await page.waitForNavigation();
    yield page.$(sel.logoutButton);
    yield page.$(sel.dashboard);
    yield page.$(sel.userList);

    await page.click(sel.logoutButton);
    await page.waitForNavigation();
    yield page.$(sel.loginButton);
    yield page.$(sel.loginInput);
    yield page.$(sel.passwordInput);
};
