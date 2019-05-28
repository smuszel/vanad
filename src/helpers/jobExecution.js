/** @type {(argv: ArgVars) => (chanel: Chanel, job: Job) => void} */
module.exports = argv => {
    const getBrowser = require('./getBrowser');
    const _browser = getBrowser(argv.browser);
    const getContext = () => _browser.then(b => b.createIncognitoBrowserContext());

    return async (chanel, job) => {
        const context = await getContext();
        const testGenerator = require(job.path);
        const testIterator = testGenerator({ context, data: job.data });
        /** @param {MessageType} type */
        const send = type => chanel({ type, value: job });

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
