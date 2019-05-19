const consume = require('./consumeTest');
const getBrowser = require('./getBrowser');
const getLogger = require('./eventLoggers');

/** @param {TestExecutionOptions} options */
module.exports = async (options) => {
    /** @type {TestFactory<any>} */
    const testFactory = require(options.path);
    // not logger - event emitter
    const logger = getLogger[options.verbosity];
    const browser = await getBrowser(options.mode);
    const testGen = testFactory(browser, options.data);
    const test = { name: options.name, gen: testGen };
    const it = test.gen();

    logger.testStarted(test);
    await consume(async step => {
        const expectationError = step.expect && await step.expect();
        logger.stepResolved({ step, test }, expectationError);
    }, it);
    logger.testEnded(test);
}