const sel = {
    registrationLink: 'a.register',
};

/** @type {TestGenerator<{}>} */
module.exports = async function*({ context }) {
    const page = await context.newPage();
    page.goto('http://localhost:5505/site');
    yield page.$(sel.registrationLink);
};
