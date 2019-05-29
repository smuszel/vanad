const { progressSelector } = require('../selectors');
const frames = ['-', '\\', '|', '/'];

const renderRecord = (colorizer, progress, spiner) => {
    let colorize;
    let fix;
    let post;
    const last = progress.step[progress.step.length - 1] || '';

    if (progress.failed) {
        fix = last;
        post = progress.reason
            ? '\n' + progress.reason.messsage + '\n' + progress.reason.stack
            : '';
        colorize = colorizer.red;
    } else if (progress.finished) {
        fix = '';
        post = '';
        colorize = colorizer.green;
    } else {
        fix = ' ' + last + ' ' + spiner;
        post = '';
        colorize = x => x;
    }

    const result = (progress.job.name + ' ' + fix).trim();
    return colorize(result) + post;
};

/** @type {Dict<VerbosityLevel, () => (progression: Progress[]) => void>} */
const L = {
    normal: () => {
        const chalk = require('chalk');
        const logUpdate = require('log-update');

        let i = 0;
        return progresses => {
            const frame = frames[(i = ++i % frames.length)];
            const render = p => renderRecord(chalk, p, frame);
            const txt = progresses.map(render).join('\n');

            logUpdate(txt);
        };
    },
    none: () => () => {},
};

/** @type {VPluginFactory} */
module.exports = argv => {
    const logger = L[argv.verbosity]();

    return (done, diff) => {
        logger(progressSelector(done, diff));

        return [];
    };
};
