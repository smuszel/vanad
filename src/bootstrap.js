const { Worker, isMainThread, workerData } = require('worker_threads');
const executeTest = require('./executeTest');

/** @type {(config: RunnerConfig) => Promise<any[]>} */
const bootstrap = config => {    
    const launchSelfWorker = workerData => new Promise(rez => {
        const worker = new Worker(__filename, { workerData });
        worker.on('close', rez);
    });

    const run = config.debug ? executeTest : launchSelfWorker;

    const work = config.specFiles.map(sf => {
        return run({
            data: config.data,
            path: sf.path,
            verbosity: config.verbosity,
            name: sf.name,
            mode: config.mode
        });
    });

    return Promise.all(work);
}

module.exports = isMainThread
    ? bootstrap
    : executeTest(workerData).then(() => setTimeout(() => process.exit(), 200));