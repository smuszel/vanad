const { isMainThread, workerData, parentPort } = require('worker_threads');
const getBrowser = require('./getBrowser');

/** @type {Worker} */
const main = ({ mode, emitter }) => {
    const _browser = getBrowser(mode);
    /** @param {MessageType} type */
    const send = type => emitter.emit('*', { type });

    return async job => {
        const context = await _browser.then(b => b.createIncognitoBrowserContext());
        const testModule = require(job.path);
        const testGenerator = testModule(context, job.data);
        const testIterator = testGenerator();

        send('testStart');
        for await (const step of testIterator) {
            const expectationError = step.expect && await step.expect();
            send(expectationError ? 'stepFailure' : 'stepSuccess');
        }
        send('testEnd');
    }
};

const execMain = () => {
    const emitter = { emit: (a, b) => parentPort.postMessage(b) };
    //@ts-ignore
    const je = main({ workerData, emitter });
    parentPort.on('message', job => {
        je(JSON.parse(job));
    });

}

module.exports = isMainThread ? main : execMain()