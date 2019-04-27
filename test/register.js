const ppr = require('puppeteer');
// const argv = require('yargs').argv;
// const opt = argv.screen ? {
//     headless: false,
//     devtools: true,
//     args: ['--start-maximized']
// } : {};

// console.log(argv);
// console.log(process.argv);

const browser = ppr.launch({});
global.browser = browser;