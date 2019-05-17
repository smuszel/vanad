const sel = {
    searchButton: 'input[type="submit"]',
    searchInput: 'input[title="Search"]'
}

const onArrive = () => ({
    label: 'When I arrive at google',
});

module.exports = async function* (browser) {
    /** @type {import('puppeteer').Page} */
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForSelector(sel.searchButton);
    yield onArrive(page);
}
