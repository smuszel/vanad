/** @type {(argv: ArgVars) => (emitter: Cluster) => void} */
module.exports = argv => cluster => {
    if (argv.threads) {
        const { Worker } = require('worker_threads');
        const worker = new Worker(__dirname + '/worker.js', { workerData: argv });

        worker.on('message', msg => {
            cluster.emit('*', msg);
        });
        cluster.addListener('*', message => {
            message.type === 'jobRequest' && worker.postMessage(JSON.stringify(message.value));
        });
    } else {
        const workerModule = require('./worker');
        const execution = workerModule && workerModule(argv, cluster);
        cluster.addListener('*', message => {
            message.type === 'jobRequest' && execution && execution(message.value);
        });
    }
};
