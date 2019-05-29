const assert = x => {
    if (!x) throw '';
};

const sel = {
    registrationLink: 'a.register',
};

/** @type {E2ETest<{}>} */
module.exports = async function*({ context }) {
    const page = await context.newPage();
    await page.goto('http://localhost:5505/site');
    yield 'I can see registration link on the landing page';
    assert(await page.$(sel.registrationLink));

    yield 'end';
};
