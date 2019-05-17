const ppr = require('puppeteer');
const browserURL = 'http://localhost:9222';
const defaultViewport = { width: 0, height: 0 };

const modes = {
    headless: () => ppr.launch(),
    remote: () => ppr.connect({ browserURL, defaultViewport })
};

const consume = (f, it) => new Promise(rez => {
    const acc = [];

    const inner = () => {
        it.next().then(async v => {
            !v.done && acc.push(v.value);
            !v.done && await f(v.value);
            return !v.done ? inner() : rez(acc);
        })
    }

    return inner();
});

const checkStep = async step => {
    const failMessage = step.expect && await step.expect();
    const msg = failMessage && `${failMessage} during ${step.label}`;
    
    msg && console.log(msg);
}

module.exports = async ({ browserMode, testGenerator }) => {
    const browser = await modes[browserMode]();
    const steps = await consume(checkStep, testGenerator(browser));

    console.log(steps.map(s => s.label));
};