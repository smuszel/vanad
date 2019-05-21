const { isMainThread } = require('worker_threads');
const getBrowser = require('./getBrowser');

// /** @type {Worker} */
const main = argv => {
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());

    return async function*(job) {
        const context = await getContext();
        const testModule = require(job.path);
        const testGenerator = testModule(context, job.data);
        const testIterator = testGenerator();

        yield 'testStart';
        for await (const step of testIterator) {
            const expectationError = step.expect && (await step.expect());
            yield expectationError ? 'stepFailure' : 'stepSuccess';
        }
        yield 'testEnd';
    };
};

const execMain = () => {
    const { workerData, parentPort } = require('worker_threads');
    if (!parentPort) {
        throw 'unable to resolve parent port';
    }

    const executionGenerator = main(workerData);
    parentPort.on('message', async job => {
        for await (const message of executionGenerator(JSON.parse(job))) {
            parentPort.postMessage(message);
        }
    });
};

module.exports = isMainThread ? main : execMain();
