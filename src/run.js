const ppr = require('puppeteer');
const { cyan, green, red } = require('chalk').default;
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };
const opt = {
    browserURL,
    defaultViewport,
    headless: false,
    devtools: true,
    args: ['--start-maximized']
}
// const browser = ppr.launch();
const browser = ppr.connect({ browserURL, defaultViewport });

const run = async ({ resolver, description, selectors }) => {
    const { page } = await resolver(await browser);
    const selPromises = selectors.map(sel => {
        return page.waitForSelector(sel, { timeout: 3000 })
            .then(() => ({ err: false, sel }))
            .catch(err => ({ err, sel }));
    });
    const stateResults = await Promise.all(selPromises);

    return { description, stateResults };
};

module.exports = tests => Promise.all(tests.map(run))
    .then(suiteResults => {
        const formattedResults = suiteResults.map(sr => {
            const header = `${cyan(sr.description)} I should see:`;
            const units = sr.stateResults.map(r => {
                const txt = `* ${r.sel}`;
                return { txt: r.err ? red(txt) : green(txt), err: r.err };
            });
            const txt = `${header}\n${units.map(xs => xs.txt).join('\n')}`;
            const errs = units.map(u => u.err).filter(Boolean);
            return { txt, errs };
        });
        // console.log(formattedResults);
        formattedResults.forEach(fr => {
            console.log(fr.txt);
            fr.errs.length && fr.errs.forEach(err => console.log(err))
        });
    })
    .catch(console.log)