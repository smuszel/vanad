const rootUrl = 'http://localhost:5500/';

const sel = {
    button: 'button',
    disabledButton: 'button:disabled',
    textResponse: 'textarea'
}

module.exports = [async function* (browser) {
    /** @type {import('puppeteer').Page} */
    const page = await (await browser).newPage();
    await page.goto(rootUrl);
    yield['I arrived at XYZ', [sel.button], page];
    await page.click(sel.button);
    yield['I clicked xhr button', [sel.textResponse, sel.disabledButton], page];
}];