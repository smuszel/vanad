module.exports.MessageType = {
    testStart: 'testStart',
    init: 'init',
    testEnd: 'testEnd',
    stepSuccess: 'stepSuccess',
    stepFailure: 'stepFailure',
    jobScheduled: 'jobScheduled',
    debug: 'debug',
    exit: 'exit',
};

module.exports.VerbosityLevel = {
    none: 'none',
    normal: 'normal',
};

module.exports.BrowserMode = {
    headless: 'headless',
    remote: 'remote',
    preview: 'preview',
    none: 'none',
};
