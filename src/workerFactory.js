const { isMainThread } = require('worker_threads');

/** @type {(argv: ArgVars) => Worker} */
const concurrentWorker = argv => {
    const getBrowser = require('./getBrowser');
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());

    return async (chanel, job) => {
        const context = await getContext();
        const testGenerator = require(job.path);
        const testIterator = testGenerator({ context, data: job.data });
        /** @param {MessageType} type */
        const send = type => chanel({ type, name: job.name });

        send('testStart');
        for await (const step of testIterator) {
            send(step ? 'stepSuccess' : 'stepFailure');
            if (!step) {
                break;
            }
        }
        send('testEnd');
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

/** @type {(argv: ArgVars) => Worker} */
const parallelWorkerLauncher = argv => {
    const { Worker } = require('worker_threads');
    const makeWorker = () => new Worker(__filename, { workerData: argv });
    const workers = [makeWorker()];

    const workerIterator = (function*() {
        let i = 0;
        while (true) {
            yield workers[i];
            i++;
            i === argv.threads && (i = 0);
            i === workers.length && workers.push(makeWorker());
        }
    })();

    return async (chanel, job) => {
        const worker = workerIterator.next().value;
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
