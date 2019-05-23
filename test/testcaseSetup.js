const rootUrl = 'http://localhost:5505/';

const sel = {
    button: 'button',
    disabledButton: 'button:disabled',
    textResponse: 'textarea',
    disabledText: 'textarea:disabled',
    nope: '#nope',
};

/** @param {Page} page*/
const expectFactory = page => {
    return {
        $: (...selectors) =>
            Promise.all(selectors.map(s => page.$(s))).then(xs => xs.every(Boolean)),
        url: expUrl => page.url().includes(expUrl),
    };
};

/** @type {(shouldPass: boolean) => TestGenerator<never>} */
module.exports = shouldPass =>
    async function*({ context }) {
        const page = await context.newPage();
        const expect = expectFactory(page);

        await page.goto(rootUrl);
        yield expect.url('local');

        await page.click(sel.button);
        yield expect.$(...[sel.disabledButton, shouldPass ? null : sel.nope].filter(Boolean));

        await page.waitForSelector(sel.textResponse);
        yield expect.$(sel.button);

        await page.click(sel.button);
        yield expect.$(sel.disabledButton, sel.disabledText);
    };
