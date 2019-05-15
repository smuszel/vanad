const rootUrl = 'http://localhost:5500/';

const sel = {
    button: 'button',
    disabledButton: 'button:disabled',
    textResponse: 'textarea'
}

const initial = async browser => {
    /** @type {import('puppeteer').Page} */
    const page = await (await browser).newPage();
    await page.goto(rootUrl);
    await page.waitForSelector(sel.bootstrapped);

    return { page };
}

const afterClick = async browser => {
    const { page } = await initial(browser);
    await page.click(sel.button);

    return { page };
};


module.exports = [
    {
        description: 'When I arrive',
        resolver: initial,
        selectors: [sel.button]
    },
    {
        description: 'After I click xhr button',
        resolver: afterClick,
        selectors: [sel.textResponse, sel.disabledButton]
    },
];