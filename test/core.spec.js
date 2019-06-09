const t = require('vanad')();
const core = require('../src/core');

const errMsg = Symbol();
const comparisonEngine = (a, b) => {
    return a === b ? null : errMsg;
};
const caller = { line: 2, path: 'none' };
const stackParser = err => {
    return caller;
};

const loggerFactory = () => {
    const xs = [];
    const f = x => xs.push(x);
    Reflect.defineProperty(f, 'curr', { value: xs });
    return {
        log: f,
        curr: xs,
    };
};

t('When comparison passes sucess is logged', c => {
    const logger = loggerFactory();
    const regularCore = core(comparisonEngine, stackParser, logger.log);
    regularCore('test1', c => c(1, 1));
    c(logger.curr, [{ caller, diff: null, title: 'test1' }]);
});

t('When comparison fails fail is logged', c => {
    const logger = loggerFactory();
    const regularCore = core(comparisonEngine, stackParser, logger.log);
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => c(1, 2));
    c(logger.curr, [
        { caller, diff: null, title: 'test1' },
        { caller, diff: errMsg, title: 'test2' },
    ]);
});

t('Errors at comparison execution are treateated as failures', c => {
    const logger = loggerFactory();
    const regularCore = core(comparisonEngine, stackParser, logger.log);
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => c(1, 2));
    regularCore('test3', c => {
        throw new Error('test err');
    });
    regularCore('test4', c => c(1, 2));
    c(logger.curr, [
        { caller, diff: null, title: 'test1' },
        { caller, diff: errMsg, title: 'test2' },
        { caller, diff: 'test err', title: 'test3' },
        { caller, diff: errMsg, title: 'test4' },
    ]);
});

t('Comparison can be async', c => {
    const logger = loggerFactory();
    const regularCore = core(comparisonEngine, stackParser, logger.log);
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => {
        setImmediate(() => {
            c(1, 1);
            c(1, 2);
        });
        c(1, 2);
    });
    c(logger.curr, [
        { caller, diff: null, title: 'test1' },
        { caller, diff: errMsg, title: 'test2' },
    ]);

    setTimeout(() => {
        c(logger.curr, [
            { caller, diff: null, title: 'test1' },
            { caller, diff: errMsg, title: 'test2' },
            { caller, diff: null, title: 'test2' },
            { caller, diff: errMsg, title: 'test2' },
        ]);
    });
});
