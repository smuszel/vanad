const { selectorsPresence } = require('../src/util');
const rootUrl = 'http://localhost:5505/';

const sel = {
    button: 'button',
    disabledButton: 'button:disabled',
    textResponse: 'textarea',
    disabledText: 'textarea:disabled',
};

const onArrive = page => ({
    label: 'I arrived at the page',
    expect: selectorsPresence(page, [sel.button]),
});

const afterFirstClick = page => ({
    label: 'I clicked xhr button for the first time',
    expect: selectorsPresence(page, [sel.disabledButton]),
});

const afterTextResponseShowed = page => ({
    label: 'I waited for text',
    expect: selectorsPresence(page, [sel.button, sel.textResponse]),
});

const afterSubsequentClick = page => ({
    label: 'I clicked xhr button again',
    expect: selectorsPresence(page, [sel.disabledButton, sel.disabledText]),
});

/** @type {(shouldPass: boolean) => TestFactory<never>} */
module.exports = shouldPass => browser =>
    async function*() {
        const page = await browser.newPage();
        await page.goto(rootUrl);
        yield onArrive(page);
        await page.click(sel.button);
        yield (shouldPass ? afterFirstClick : afterSubsequentClick)(page);
        await page.waitForSelector(sel.textResponse);
        yield afterTextResponseShowed(page);
        await page.click(sel.button);
        yield afterSubsequentClick(page);
    };
