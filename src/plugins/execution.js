const { isMainThread } = require('worker_threads');
const jobExecution = require('../helpers/jobExecution');

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

/** @type {(argv: ArgVars) => (chanel: Chanel, job: Job) => void} */
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

    return (chanel, job) => {
        const worker = workerIterator.next().value;
        worker.postMessage(job);
        worker.on('message', msg => chanel(msg));
    };
};

if (isMainThread) {
    /** @type {PluginFactory} */
    module.exports = argv => {
        let launcher;

        if (argv.threads) {
            launcher = parallelLauncher;
        } else {
            launcher = jobExecution;
        }

        const execution = launcher(argv);
        /** @type {Message[]} */
        const queue = [];
        /** @type {Chanel} */
        const chanel = x => {
            queue.push(x);
        };

        return (_, diff) => {
            const msg = diff.find(x => x.type === 'jobScheduled');
            const curr = queue.splice(0, queue.length);

            if (msg) {
                msg.value.forEach(job => {
                    execution(chanel, job);
                });
            }

            return curr;
        };
    };
} else {
    parallelMain();
}
