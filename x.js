import ppr from 'puppeteer';
import test from 'ava';

const initialState = {
    arrange: async () => {
        const browser = await ppr.launch();
        const page = await browser.newPage();
        await page.goto('http://localhost:8081/');

        return page;
    },
    assertions: [
        () => true,
    ]
}

const stateA = {
    follows: initialState,
    arrange: page => {
        return page.click('.s3-input');
    },
    assertions: [
        page => page.waitForSelector('.s3-dropdown'),
    ]
};


(async () => {
    const st = await initialState.arrange();
    const ass = await Promise.all(initialState.assertions.map(st));
    const failed = ass.find(ass => ass !== true);
    failed && console.log(failed);


})();

/// Lets try again
// this time make: list of states, list of assertions, declarations of expectations
