const getCallers = require('./stackParse');
const cnc = require('concordance');

const out = caller => {
    console.log(JSON.stringify(caller));
};

/** @type {Testcase[]} */
const runningTests = [];

const comparator = (a, b) => {
    const pass = cnc.compare(a, b).pass;

    if (!pass) {
        const diff = cnc.diff(a, b);
        const { line } = getCallers()[2];

        out({ callerLine: line, diff });
    }
};

module.exports = (title, t) => {
    const mainCaller = getCallers()[2];
    runningTests.push({ title, caller: mainCaller });
    setImmediate(() => {
        try {
            t(comparator);
        } catch (err) {
            const caller = err.stack.find(c => c.filePath === mainCaller.filePath);
            out({ callerLine: caller.line, diff: err.message });
        }
    });
};
