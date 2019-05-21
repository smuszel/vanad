// /** @type {(argv: ArgVars) => (emitter: Cluster) => void} */
module.exports = argv => {
    /**@type {Worker} */
    let executionGenerator;

    if (argv.threads) {
        const { Worker } = require('worker_threads');
        const worker = new Worker(__dirname + '/worker.js', { workerData: argv });

        executionGenerator = async function*(job) {
            worker.postMessage(job);
            while (true) {
                const x = await new Promise(rez => worker.on('message', msg => rez(msg)));
                yield x;
            }
        };
    } else {
        const workerModule = require('./worker');
        if (!workerModule) {
            throw '';
        }
        executionGenerator = workerModule(argv);
    }

    return executionGenerator;
};
