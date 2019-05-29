const ppr = require('puppeteer');
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };

const opt = {
    connect: {
        browserURL,
        defaultViewport,
    },
    preview: {
        defaultViewport,
        headless: false,
        devtools: true,
        args: ['--start-maximized'],
    },
};

/** @param {ArgVars} argv */
module.exports = argv => {
    /** @type {Promise<Browser> | undefined} */
    let browser;

    if (argv.browser === 'remote') {
        browser = ppr.connect(opt.connect);
    } else if (argv.browser === 'preview') {
        browser = ppr.launch(opt.preview);
    } else if (argv.browser === 'headless') {
        browser = ppr.launch();
    }

    return async () => {
        const context = await (browser && browser.then(b => b.createIncognitoBrowserContext()));

        return context ? { context } : {};
    };
};
