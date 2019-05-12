const states = require('./states');
const tests = require('./tests');
const ppr = require('puppeteer');
const { cyan, green, red } = require('chalk').default;
const browser = ppr.launch();

const lift = xs => {
    return Array.isArray(xs) ? xs : Array.of(xs);
}

const run = async label => {
    const state = states[label](browser);
    const testSelectors = lift(tests[label]);
    // console.log(testSelectors);
    const page = (await state).page;
    const selPromises = testSelectors.map(sel => {
        return page.waitForSelector(sel, { timeout: 3000 })
            .then(() => ({ err: false, sel }))
            .catch(err => ({ err, sel }));
    });
    const stateResults = await Promise.all(selPromises);

    return { label, stateResults };
};

Promise.all(Object.keys(tests).map(run))
    .then(suiteResults => {
        const formattedResults = suiteResults.map(sr => {
            const header = `During ${cyan(sr.label)} I should see:`;
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