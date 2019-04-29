const selectors = require('./selectors');
const { addNameMeta } = require('./util');

const initial = async browser => {
    /** @type {import('puppeteer').Page} */
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');
    await page.waitForSelector(selectors.bootstrapped);

    return page;
};

const typedNumber = async browser => {
    const page = await initial(browser);
    await page.type(selectors.numberInput, '10');

    return page;
};

const clickedXhr = async browser => {
    const page = await typedNumber(browser);
    await page.click(selectors.xhrButton);
    await xhrStart(page);
    
    return page;
};

const afterXhr = async browser => {
    const page = await clickedXhr(browser);
    await xhrEnd(page);

    return page;
};

clearedOutNumberInput = async browser => {
    const page = await afterXhr(browser);
    page.click(selectors.numberInput, { clickCount: 3 });
    await page.keyboard.press('Backspace');

    return page;
};

typedOtherNumber = async browser => {
    const page = await clearedOutNumberInput(browser);
    page.type(selectors.numberInput, '11');

    return page;
};

typedOldNumber = async browser => {
    const page = await clearedOutNumberInput(browser);
    page.type(selectors.numberInput, '10');

    return page;
};
    
module.exports = {
    initial,
    // typedNumber,
    // clickedXhr,
    // afterXhr,
    // afterXhrClear,
    // afterClearOldNumber,
    // afterClearOtherNumber
};

addNameMeta(module.exports);
