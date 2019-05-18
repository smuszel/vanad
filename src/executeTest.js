const consume = require('./consumeTest');
const getBrowser = require('./getBrowser');
const getLogger = require('./eventLoggers');

/** @param {TestExecutionOptions} options */
module.exports = async (options) => {
    /** @type {TestFactory} */
    const testFactory = require(options.testPath);
    const logger = getLogger[options.verbosity];
    const browser = await getBrowser(options.mode);
    const test = testFactory(browser, options.data);
    Reflect.defineProperty(test, 'name', { value: options.testName });
    const it = test();

    logger.testStarted(test);
    await consume(async step => {
        const expectationError = step.expect && await step.expect();
        logger.stepResolved({ step, test }, expectationError);
    }, it);
    logger.testEnded(test);

    return;
}