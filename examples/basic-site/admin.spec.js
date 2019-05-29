const assert = x => {
    if (!x) throw '';
};

const assertNoValue = el => {
    if (el.value) throw '';
};

const sel = {
    loginInput: 'input.login:not(:disabled)',
    passwordInput: 'input.password:not(:disabled)',
    loginButton: 'button.submit:not(:disabled)',
    disabledLoginButton: 'button.submit:disabled',
    disabledLoginInput: 'button.submit:disabled',
    disabledPasswordInput: 'input.password:disabled',
    logoutButton: 'button.logout',
    dashboard: '.dashboard',
};

// use --data.admin to put a value
/** @typedef {{ admin: string }} Data */

/** @type {E2ETest<Data>} */
module.exports = async function*({ context, data }) {
    const page = await context.newPage();

    await page.goto('http://localhost:5505/site');
    yield 'There is login button on landing page';
    await assert(page.$(sel.loginButton));

    yield 'I can type my username to login form';
    await page.type(sel.loginInput, data.admin || 'admin');
    yield 'I can type my password to login form';
    await page.type(sel.passwordInput, data.admin || 'admin');
    yield 'I can log in by clicking submit';
    await page.click(sel.loginButton);

    yield 'After login I see the dashboard';
    assert(await page.$(sel.logoutButton));
    assert(await page.$(sel.dashboard));

    yield 'I can log out of the dashboard to land on clean form';
    await page.click(sel.logoutButton);
    assert(await page.$(sel.loginButton));
    //@ts-ignore
    assert(await page.$eval(sel.loginInput, el => !el.value));

    yield 'c';
};
