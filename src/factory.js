// Bring back as private to runner module
/** @param {ArgVars} argv */
module.exports.job = (argv) => {
    const glob = require('glob');
    const path = require('path');

    const opt = { cwd: argv.cwd };
    const f = match => {
        return {
            data: argv.data,
            name: path.basename(match),
            path: path.join(argv.cwd, match)
        }
    }

    return new Promise(rez => {
        glob(argv.pattern, opt, (err, matches) => {
            rez(matches.map(f));
        });
    });
}

// middleware folder, loggers file
/** @type {Dict<VerbosityLevel, Dict<MessageType, StdoutRender> | null>} */
module.exports.logger = {
    bare: {
        testStart: () => console.log('testStart'),
        testEnd: () => console.log('testEnd'),
        stepSuccess: () => console.log('success'),
        stepFailure: () => console.log('failure'),
        finished: () => console.log('done'),
    },
    basic: {
        testStart: (test) => console.log('started: ' + test.name),
        testEnd: (test) => console.log('finished: ' + test.name),
        stepSuccess: (stepTest, err) => {
            const base = stepTest.test.name + ' > ' + stepTest.step.label;
            const errMsg = err && err.value ? 'fails for ' + err.value : '';
            console.log(base + ' ' + errMsg);
        },
        stepFailure: () => console.log('x'),
        finished: () => console.log('done'),
    },
    silent: null
}

// Create single method
/** @type {(mode: BrowserMode) => Dict<ConcurrencyMode, (ee: EE) => void>} */
module.exports.workerAppender = mode => ({
    none: (emitter) => {
        //@ts-ignore; should throw in case of invoking undefined
        const je = require('./worker')({ mode, emitter });
        emitter.addListener('*', message => {
            message.type === 'job' && je(message.value);
        })
    },
    threads: (emitter) => {
        const { Worker } = require('worker_threads');
        const workerData = { mode };
        const worker = new Worker(__dirname + '/worker.js', { workerData });

        worker.addListener('message', msg => {
            emitter.emit('*', msg)
        });
        emitter.addListener('*', message => {
            message.type === 'job' && worker.postMessage(JSON.stringify(message.value));
        });
    }
})