/** @type {LoggerDict} */
const loggers = {
    basic: {
        testStarted: (test) => console.log(test.name),
        testEnded: (test) => console.log(test.name),
        stepResolved: (stepTest, err) => {
            console.log(stepTest.test.name + ' > ' + stepTest.step.label, (err && err.value) || '');
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