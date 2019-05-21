const { isMainThread } = require('worker_threads');
const getBrowser = require('./getBrowser');

/** @type {(argv: ArgVars) => Worker} */
const concurrentWorker = argv => {
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());

    return async function*(job) {
        const context = await getContext();
        const testModule = require(job.path);
        const testGenerator = testModule(context, job.data);
        const testIterator = testGenerator();

        yield 'testStart';
        for await (const step of testIterator) {
            const expectationError = step.expect && (await step.expect());
            yield expectationError ? 'stepFailure' : 'stepSuccess';
        }
        yield 'testEnd';
    };
};

/** @type {() => void} */
const parallelWorkerThread = () => {
    const { workerData, parentPort } = require('worker_threads');
    if (!parentPort) {
        throw 'unable to resolve parent port';
    }

    const executionGenerator = concurrentWorker(workerData);
    parentPort.on('message', async job => {
        for await (const message of executionGenerator(JSON.parse(job))) {
            parentPort.postMessage(message);
        }
    });
};

/** @type {(argv: ArgVars) => Worker} */
const parallelWorkerLauncher = argv => {
    const { Worker } = require('worker_threads');
    const worker = new Worker(__filename, { workerData: argv });

    return async function*(job) {
        worker.postMessage(job);
        while (true) {
            const x = await new Promise(rez => worker.on('message', msg => rez(msg)));
            yield x;
        }
    };
};

if (isMainThread) {
    /** @param {ArgVars} argv */
    module.exports = argv => {
        if (argv.threads) {
            return parallelWorkerLauncher(argv);
        } else {
            return concurrentWorker(argv);
        }
    };
} else {
    parallelWorkerThread();
}
