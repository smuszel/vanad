const { isMainThread } = require('worker_threads');

/** @type {(argv: ArgVars) => Worker} */
const concurrentWorker = argv => {
    const getBrowser = require('./getBrowser');
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());

    return async (chanel, job) => {
        const context = await getContext();
        const testModule = require(job.path);
        const testGenerator = testModule(context, job.data);
        const testIterator = testGenerator();

        chanel('testStart');
        for await (const step of testIterator) {
            const expectationError = step.expect && (await step.expect());
            chanel(expectationError ? 'stepFailure' : 'stepSuccess');
        }
        chanel('testEnd');
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
        executionGenerator(msg => parentPort.postMessage(msg), job);
    });
};

// TODO handle pool size
/** @type {(argv: ArgVars) => Worker} */
const parallelWorkerLauncher = argv => {
    const { Worker } = require('worker_threads');
    const worker = new Worker(__filename, { workerData: argv });

    return async (chanel, job) => {
        worker.postMessage(job);
        worker.on('message', msg => chanel(msg));
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
