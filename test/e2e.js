import { e2e } from './helpers';

e2e('I can type number, click and see the answer', async (t, page) => {
    await page.waitForSelector('#fib-arg', { timeout: 1000 });
    await page.type('#fib-arg', '7');
    await page.click('#fib-calc');
    const value = await page.$eval('#fib-answer', el => el.innerText);

    t.is(value, '13');
});

