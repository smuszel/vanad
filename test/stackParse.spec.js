import vanad from '../src/index';
import stackParse from '../src/stackParse';
const t = vanad();

const normalStack = `
Error
    at Object.<anonymous> (D:\\Repos\\vanad\\x.js:1:13)
`;

const nestedStack = `
Error
at f (D:\\Repos\\vanad\\x.js:2:11)
    at module.exports (D:\\Repos\\vanad\\x.js:116:12)
    at Object.<anonymous> (D:\\Repos\\vanad\\y.js:2:19)
`;

const internalsStack = `
Error
at f (D:\\Repos\\vanad\\x.js:2:11)
    at module.exports (D:\\Repos\\vanad\\x.js:116:12)
    at Object.<anonymous> (D:\\Repos\\vanad\\y.js:2:19)
    at Module._compile (internal/modules/cjs/loader.js:774:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:785:10)
    at Module.load (internal/modules/cjs/loader.js:641:32)
    at Function.Module._load (internal/modules/cjs/loader.js:556:12)
    at Function.Module.runMain (internal/modules/cjs/loader.js:837:10)
`;

const noParensStack = `
Error
    at Timeout._onTimeout D:\\Repos\\vanad\\y.js:9:19
    at Timeout._onTimeout (D:\\Repos\\vanad\\x.js:9:19)
    at listOnTimeout (internal/timers.js:531:17)
    at processTimers internal/timers.js:475:7
`;

t('Extracts file path and line number from simple stack', c => {
    c(stackParse({ stack: normalStack }), [{ path: 'D:\\Repos\\vanad\\x.js', line: 1 }]);
});

t('Extracts nested stacks', c => {
    c(stackParse({ stack: nestedStack }), [
        { path: 'D:\\Repos\\vanad\\x.js', line: 2 },
        { path: 'D:\\Repos\\vanad\\x.js', line: 116 },
        { path: 'D:\\Repos\\vanad\\y.js', line: 2 },
    ]);
});

t('Omits internal modules', c => {
    c(stackParse({ stack: internalsStack }), [
        { path: 'D:\\Repos\\vanad\\x.js', line: 2 },
        { path: 'D:\\Repos\\vanad\\x.js', line: 116 },
        { path: 'D:\\Repos\\vanad\\y.js', line: 2 },
    ]);
});

t('Stack lines do not have to be wrapped in parens', c => {
    c(stackParse({ stack: noParensStack }), [
        { path: 'D:\\Repos\\vanad\\y.js', line: 9 },
        { path: 'D:\\Repos\\vanad\\x.js', line: 9 },
    ]);
});
