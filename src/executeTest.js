const consume = require('./consumeAsyncGenerator');

module.exports = async (testGenerator, logger) => {
    const name = testGenerator.name;
    const logStep = async step => {
        const expectationError = step.expect && await step.expect();
        logger.stepResolved(name, step.label, expectationError);
    }

    logger.suiteStart(name);
    await consume(logStep, testGenerator());
    logger.suiteEnd(name);
};