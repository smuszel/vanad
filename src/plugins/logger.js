const { progressSelector } = require('../selectors');

const frames = ['-', '\\', '|', '/'];

// return history => {
//     const frame = frames[(i = ++i % frames.length)];
//     const jobNameMessages = R.groupBy(m => m.type, history);
//     const lines = R.mapObjIndexed((v, k) => {
//         const types = v.map(m => m.type);
//         return renderAdvancedMessageRecord(chalk, k, types, frame);
//     }, jobNameMessages);
//     const txt = R.values(lines).join('\n');

// };

/** @type {Dict<VerbosityLevel, () => (progression: Progress[]) => void>} */
const L = {
    debug: () => p => {
        console.log(JSON.stringify(p));
    },
    advanced: () => {
        const R = require('ramda');
        const { renderAdvancedMessageRecord } = require('../helpers/util');
        const chalk = require('chalk');
        //@ts-ignore
        const logUpdate = require('log-update');

        let i = 0;
        return progresses => {
            const frame = frames[(i = ++i % frames.length)];
            const render = p => renderAdvancedMessageRecord(chalk, p, frame);
            const txt = progresses.map(render).join('\n');

            logUpdate(txt);
        };
    },
    none: () => () => {},
    basic: () => {
        const { renderBasicMessageRecord } = require('../helpers/util');
        return () => {
            console.log('ni');
        };
    },
};

/** @type {PluginFactory} */
module.exports = argv => {
    const logger = L[argv.verbosity]();

    return (done, diff) => {
        logger(progressSelector(done, diff));

        return [];
    };
};
