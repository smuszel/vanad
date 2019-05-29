const { isMainThread } = require('worker_threads');
const jobExecution = require('../helpers/jobExecution');

const parallelMain = () => {
    const { workerData, parentPort } = require('worker_threads');
    if (!parentPort) {
        throw 'unable to resolve parent port';
    }

    const executionGenerator = jobExecution(workerData);
    parentPort.on('message', job => {
        executionGenerator(msg => {
            const reason = msg.value.reason
                ? { message: msg.value.reason.message, stack: '' }
                : {};
            parentPort.postMessage({ ...msg, value: { ...msg.value, reason } });
        }, job);
    });
};

/** @type {(argv: ArgVars) => (chanel: Chanel, job: Job) => void} */
const parallelLauncher = argv => {
    const { Worker } = require('worker_threads');
    let _chanel;
    const makeWorker = () => {
        const worker = new Worker(__filename, { workerData: argv });
        worker.on('message', msg => {
            _chanel(msg);
        });
        return worker;
    };
    const workers = Array(+argv.threads)
        .fill(undefined)
        .map(makeWorker);

    const workerIterator = (function*() {
        let i = 0;
        while (true) {
            yield workers[i];
            i++;
            i === workers.length && (i = 0);
        }
    })();

    return (chanel, job) => {
        _chanel = chanel;
        const worker = workerIterator.next().value;
        worker.postMessage(job);
    };
};

if (isMainThread) {
    /** @type {VPluginFactory} */
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
