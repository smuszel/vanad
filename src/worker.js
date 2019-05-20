const { isMainThread } = require('worker_threads');
const getBrowser = require('./getBrowser');

/** @type {Worker} */
const main = (argv, cluster) => {
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());
    /** @param {MessageType} type */
    const send = type => cluster.emit('*', { type });

    return async job => {
        const context = await getContext();
        const testModule = require(job.path);
        const testGenerator = testModule(context, job.data);
        const testIterator = testGenerator();

        send('testStart');
        for await (const step of testIterator) {
            const expectationError = step.expect && (await step.expect());
            send(expectationError ? 'stepFailure' : 'stepSuccess');
        }
        send('testEnd');
    };
};

const execMain = () => {
    const { workerData, parentPort } = require('worker_threads');
    if (!parentPort) {
        throw 'unable to resolve parent port';
    }
    /** @type {any} */
    const dummyCluster = {
        emit: (_, message) => {
            parentPort.postMessage(message);
            return true;
        },
    };
    const execution = main(workerData, dummyCluster);
    parentPort.on('message', job => {
        execution(JSON.parse(job));
    });
};

module.exports = isMainThread ? main : execMain();
