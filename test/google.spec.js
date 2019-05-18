const sel = {
    searchButton: 'input[type="submit"]',
    searchInput: 'input[title="Search"]'
}

const onArrive = () => ({
    label: 'When I arrive at google',
});

/** @type {TestFactory<any>} */
module.exports = (browser, data) => async function* () {
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    await page.waitForSelector(sel.searchButton);
    yield onArrive();
}
