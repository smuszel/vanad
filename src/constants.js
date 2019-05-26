module.exports.MessageType = {
    testStart: 'testStart',
    init: 'init',
    testEnd: 'testEnd',
    stepSuccess: 'stepSuccess',
    stepFailure: 'stepFailure',
    debug: 'debug',
};

module.exports.VerbosityLevel = {
    none: 'none',
    basic: 'headless',
    advanced: 'remote',
    debug: 'preview',
};

module.exports.BrowserMode = {
    headless: 'headless',
    remote: 'remote',
    preview: 'preview',
};
