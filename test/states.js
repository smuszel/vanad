const sel = require('./selectors');
const rootUrl = 'http://localhost:5500/';

const initial = async browser => {
    /** @type {import('puppeteer').Page} */
    const page = await (await browser).newPage();
    await page.goto(rootUrl);
    await page.waitForSelector(sel.bootstrapped);

    return { page, browser, label: '' };
}

const afterClick = async browser => {
    const state = await initial(browser);
    const { page } = state;
    await page.click(sel.button);

    return { ...state, page };
};

const obj = {
    initial,
    afterClick
}

const f = () => {
    /** @type {typeof obj} */
    const res = {};
    Object.keys(obj).forEach(label => {
        res[label] = async _browser => {
            const browser = await _browser;
            const o = await obj[label](browser);
            return { ...o, label }
        }
    });

    return res;
}

module.exports = f()