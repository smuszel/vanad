const selectors = require('./selectors');

const initial = async browser => {
    const page = await browser.newPage();
    await page.goto('http://localhost:8081/');
    await page.waitForSelector(selectors.component);

    return page;
}

// const clikedOnBox = async () => {
//     const page = await initial();
//     await page.click(selectors.inputBox);

//     return page;
// }
    
module.exports = {
    initial,
    // clikedOnBox: clikedOnBox(),
}
