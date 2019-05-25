const frames = ['-', '\\', '|', '/'];

/** @type {Loggers} */
module.exports = {
    debug: () => (end, history) => {
        end && console.log(JSON.stringify(history));
    },
    advanced: () => {
        const R = require('ramda');
        const { renderAdvancedMessageRecord } = require('./util');
        const chalk = require('../node_modules/chalk/index');
        //@ts-ignore
        const logUpdate = require('log-update');

        let i = 0;
        return (_, history) => {
            const frame = frames[(i = ++i % frames.length)];
            const jobNameMessages = R.groupBy(m => m.name, history);
            const lines = R.mapObjIndexed((v, k) => {
                const types = v.map(m => m.type);
                return renderAdvancedMessageRecord(chalk, k, types, frame);
            }, jobNameMessages);
            const txt = R.values(lines).join('\n');

            logUpdate(txt);
        };
    },
    none: () => {},
    basic: () => {
        const { renderBasicMessageRecord } = require('./util');
        return (end, history) => {
            if (end) {
                const R = require('ramda');
                const jobNameMessages = R.groupBy(m => m.name, history);
                const lines = R.mapObjIndexed((v, k) => {
                    const types = v.map(m => m.type);
                    renderBasicMessageRecord(k, types);
                }, jobNameMessages);
                const txt = R.values(lines)
                    .filter(Boolean)
                    .join('\n');
                console.log(txt);
            }
        };
    },
};
