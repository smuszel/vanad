const sel = {
    searchButton: 'input[type="submit"]',
    searchInput: 'input[title="Search"]'
}

const gotoGoogle = async browser => {
    /** @type {import('puppeteer').Page} */
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForSelector(sel.searchButton);

    return { page };
}

module.exports = [
    {
        description: 'When I arrive',
        resolver: gotoGoogle,
        selectors: [sel.searchButton, sel.searchInput]
    }
];
