/** @type {Dict<VerbosityLevel, OptDict<MessageType, StdoutRender> | null>} */
module.exports.logger = {
    bare: {
        testStart: () => console.log('testStart'),
        testEnd: () => console.log('testEnd'),
        stepSuccess: () => console.log('success'),
        stepFailure: () => console.log('failure'),
        finished: () => console.log('done'),
    },
    basic: {
        testStart: test => console.log('started: ' + test.name),
        testEnd: test => console.log('finished: ' + test.name),
        stepSuccess: (stepTest, err) => {
            const base = stepTest.test.name + ' > ' + stepTest.step.label;
            const errMsg = err && err.value ? 'fails for ' + err.value : '';
            console.log(base + ' ' + errMsg);
        },
        stepFailure: () => console.log('x'),
        finished: () => console.log('done'),
    },
    silent: null,
};
