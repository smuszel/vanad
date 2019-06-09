import t from '../src/index';
import core from '../src/core';

const errMsg = '__err';
const comparisonEngine = (a, b) => {
    return a === b ? null : errMsg;
};
const callers = [{ line: 2, path: 'none' }];
const stackParser = () => {
    return callers;
};

const loggerFactory = () => {
    const xs: any[] = [];
    const f = x => xs.push(x);
    return {
        log: f,
        curr: xs,
    };
};

t('Successful comparison is logged with null as diff', c => {
    const _logger = loggerFactory();
    const logger = _logger.log;
    const regularCore = core({ comparisonEngine, stackParser, logger });
    regularCore('test1', c => c(1, 1));
    c(_logger.curr, [{ callers, diff: null, title: 'test1' }]);
});

t('Failed comparison is logged', c => {
    const _logger = loggerFactory();
    const logger = _logger.log;
    const regularCore = core({ comparisonEngine, stackParser, logger });
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => c(1, 2));
    c(_logger.curr, [
        { callers, diff: null, title: 'test1' },
        { callers, diff: errMsg, title: 'test2' },
    ]);
});

t('Errors at comparison execution are treateated as failures', c => {
    const _logger = loggerFactory();
    const logger = _logger.log;
    const regularCore = core({ comparisonEngine, stackParser, logger });
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => c(1, 2));
    regularCore('test3', c => {
        throw new Error('test err');
    });
    regularCore('test4', c => c(1, 2));
    c(_logger.curr, [
        { callers, diff: null, title: 'test1' },
        { callers, diff: errMsg, title: 'test2' },
        { callers, diff: 'test err', title: 'test3' },
        { callers, diff: errMsg, title: 'test4' },
    ]);
});

t('Comparison can be async', c => {
    const _logger = loggerFactory();
    const logger = _logger.log;
    const regularCore = core({ comparisonEngine, stackParser, logger });
    regularCore('test1', c => c(1, 1));
    regularCore('test2', c => {
        setImmediate(() => {
            c(1, 1);
            c(1, 2);
        });
        c(1, 2);
    });
    c(_logger.curr, [
        { callers, diff: null, title: 'test1' },
        { callers, diff: errMsg, title: 'test2' },
    ]);

    setTimeout(() => {
        c(_logger.curr, [
            { callers, diff: null, title: 'test1' },
            { callers, diff: errMsg, title: 'test2' },
            { callers, diff: null, title: 'test2' },
            { callers, diff: errMsg, title: 'test2' },
        ]);
    });
});
