const p = require('puppeteer');
const test = require('ava');
const { screen } = require('yargs').argv;

const opt = screen ? {
    headless: false,
    devtools: true,
    args: ['--start-maximized']
} : {};

const _browser = p.launch(opt);

/**
 * @typedef {import('puppeteer').Page} Page
 * @typedef {import('ava').ExecutionContext<{}>} ExecutionContext
 */

/**
 * @callback fn
 * @param {ExecutionContext} t
 * @param {Page} page
 */

/** @param {string} desc */
/** @param {fn} fn */
module.exports.e2e = async (desc, fn) => {
    const browser = await _browser;
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/src/index.html');

    test.default(desc, t => fn(t, page));
}