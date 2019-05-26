const { isMainThread } = require('worker_threads');
const jobExecution = require('./jobExecution');

/** @type {() => void} */
const parallelMain = () => {
    const { workerData, parentPort } = require('worker_threads');
    if (!parentPort) {
        throw 'unable to resolve parent port';
    }

    const executionGenerator = jobExecution(workerData);
    parentPort.on('message', async job => {
        executionGenerator(msg => parentPort.postMessage(msg), job);
    });
};

/** @type {(argv: ArgVars) => JobExecution} */
const parallelLauncher = argv => {
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
            return parallelLauncher(argv);
        } else {
            return jobExecution(argv);
        }
    };
} else {
    parallelMain();
}
