const execution = require('./plugins/execution');
const logger = require('./plugins/logger');
const scheduler = require('./plugins/scheduler');

/** @param {ArgVars} argv */
module.exports = async argv => {
    const plugins = [scheduler, logger, execution].map(p => p(argv));
    /** @type {Message[]} */
    let done = [];
    /** @type {Message[]} */
    let diff = [];

    setInterval(() => {
        const nextDiff = plugins.flatMap(p => p(done, diff));
        done = done.concat(diff);
        diff = nextDiff;
    }, 100);
};
