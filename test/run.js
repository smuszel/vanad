const tests = require('./test.spec');
const ppr = require('puppeteer');
const { cyan, green, red } = require('chalk').default;
const browser = ppr.launch();

const run = async ({ resolver, description, selectors }) => {
    const state = resolver(await browser);
    const page = (await state).page;
    const selPromises = selectors.map(sel => {
        return page.waitForSelector(sel, { timeout: 3000 })
            .then(() => ({ err: false, sel }))
            .catch(err => ({ err, sel }));
    });
    const stateResults = await Promise.all(selPromises);

    return { description, stateResults };
};

Promise.all(tests.map(run))
    .then(suiteResults => {
        const formattedResults = suiteResults.map(sr => {
            const header = `${cyan(sr.description)} I should see:`;
            const units = sr.stateResults.map(r => {
                const txt = `* ${r.sel}`
                return { txt: r.err ? red(txt) : green(txt), err: r.err };
            });
            const txt = `${header}\n${units.map(xs => xs.txt).join('\n')}`;
            const errs = units.map(u => u.err).filter(Boolean);
            return { txt, errs };
        });
        formattedResults.forEach(fr => {
            console.log(fr.txt);
            fr.errs.length && fr.errs.forEach(err => console.log(err))
        });
    })
    .catch(console.log)
    .then(() => process.exit())


    // refactor runner
    // refactor test declarations
    // use .env
    // use workers/threads
    // use register
    // add selector lib
    // refactor utlis