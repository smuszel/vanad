const p = require('puppeteer');
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };
const opt = {
    browserURL,
    defaultViewport,
    headless: false,
    devtools: true,
    args: ['--start-maximized']
}

module.exports = mode => {
    /** @type {Promise<import('puppeteer').Browser>} */
    let browser;

    if (mode === 'remote') {
        browser = p.connect(opt);
    } else {
        browser = p.launch();
    }

    return browser;
};
