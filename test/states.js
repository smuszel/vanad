const ppr = require('puppeteer');
const selectors = require('./selectors');
const argv = require('yargs').argv;

const opt = argv.screen ? {
    headless: false,
    devtools: true,
    args: ['--start-maximized']
} : {};

console.log(argv);

const browser = ppr.launch(opt);

const getPage = async () => {
    const page = await (await browser).newPage();
    await page.goto('http://localhost:8081/');

    return page;
};

const initial = async () => {
    const page = await getPage();
    await page.waitForSelector(selectors.component);

    return page;
}

const clikedOnBox = async () => {
    const page = await initial();
    await page.click(selectors.inputBox);

    return page;
}
    
module.exports = {
    initial: initial(),
    // clikedOnBox: clikedOnBox(),
}
