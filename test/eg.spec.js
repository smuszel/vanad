const { selectorsPresence } = require('../util');
const rootUrl = 'http://localhost:5500/';

const sel = {
    button: 'button',
    disabledButton: 'button:disabled',
    textResponse: 'textarea'
}

const onArrive = page => ({
    label: 'I arrived at XYZ',
    expect: selectorsPresence(page, [sel.button])
});

const afterClick = page => ({
    label: 'I clicked xhr button',
    expect: selectorsPresence(page, [sel.disabledButton])
});

module.exports = async function* (browser) {
    /** @type {import('puppeteer').Page} */
    const page = await (await browser).newPage();
    await page.goto(rootUrl);
    yield onArrive(page);
    await page.click(sel.button);
    yield afterClick(page);
};