const sx = {
    searchButton: 'input[type="submit"]',
    searchInput: 'input[title="Search"]',
    results: '#top_nav'
}

const gotoGoogle = async browser => {
    /** @type {import('puppeteer').Page} */
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForSelector(sx.searchButton);

    return { page };
}

const makeSearch = async browser => {
    const { page } = await gotoGoogle(browser);
    await page.type(sx.searchInput, 'abc');
    await page.keyboard.press('Enter');

    return { page }
}

module.exports = [
    {
        description: 'When I arrive',
        resolver: gotoGoogle,
        selectors: [sx.searchButton, sx.searchInput]
    },
    {
        description: 'After I click xhr button',
        resolver: makeSearch,
        selectors: [sx.results]
    },
];
