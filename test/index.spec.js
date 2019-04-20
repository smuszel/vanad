import test from 'ava';
import ppr from 'puppeteer';

const browser = ppr.launch();

const getPage = async () => {
    const page = await (await browser).newPage();
    await page.goto('http://localhost:8081/');

    return page;
};

const selectors = {
    reactRoot: 'div',
    component: '.select3',
    inputBox: '.s3-input',
    emptyInputBox: '.s3-input:placeholder-shown',
    dropdown: '.s3-dropdown',
    dropdownItem: '.s3-dropdown-item',
}

// Tescase is isolated and independent from other cases
// It should share procedures and configurations with other tests
// No runtime state is allowed to be shared between them
test('displays placeholder and no dropdown by default', async t => {
    // you should pass configuration of component props & environment
    const page = await getPage();
    // there are multiple steps to get to the state we can make assertion of
    // procedure is to be abstracted away and shared across testcases
    await page.waitForSelector(selectors.reactRoot);
    await page.waitForSelector(selectors.component);
    await page.waitForSelector(selectors.emptyInputBox);

    const dropdown = await page.$(selectors.dropdown);

    t.assert(!dropdown);
});