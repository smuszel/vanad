/** @type {(argv: ArgVars) => (chanel: Chanel, job: Job) => void} */
module.exports = argv => {
    const getLib = require('./getLib')(argv);

    return async (chanel, job) => {
        const lib = await getLib();
        const testGenerator = require(job.path);
        const testIterator = testGenerator({ ...lib, data: job.data });
        /** @param {MessageType} type */
        const send = (type, text = '') => chanel({ type, value: { job, text } });

        send('testStart');
        try {
            for await (const step of testIterator) {
                if (step === true) {
                    send('stepSuccess');
                } else if (step) {
                    send('stepSuccess', step);
                } else {
                    throw '';
                }
            }
        } catch (err) {
            send('stepFailure', err);
        }
        send('testEnd');
    };
};
