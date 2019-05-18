/** @type {LoggerDict} */
const loggers = {
    basic: {
        testStarted: (test) => console.log('started: ' + test.name),
        testEnded: (test) => console.log('finished: ' + test.name),
        stepResolved: (stepTest, err) => {
            const base = stepTest.test.name + ' > ' + stepTest.step.label;
            const errMsg = err && err.value ? 'fails for ' + err.value : '';
            console.log(base + ' ' + errMsg);
        }
    },
    silent: {
        testStarted: (test) => null,
        testEnded: (test) => null,
        stepResolved: (step, err) => null
    }
}

/** @param {LoggerDict} x */
const typecheck = (x) => null

/** @type {LoggerDict} */
module.exports = loggers;
typecheck(loggers);