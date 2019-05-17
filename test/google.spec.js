const sel = {
    searchButton: 'input[type="submit"]',
    searchInput: 'input[title="Search"]'
}

module.exports = [async function* (browser) {
    /** @type {import('puppeteer').Page} */
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForSelector(sel.searchButton);
    yield['When I arrive', [sel.searchButton, sel.searchInput], page]
}]
