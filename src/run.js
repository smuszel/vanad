const workerFactory = require('./workerFactory');
const middleware = require('./middleware');
const R = require('ramda');
const { renderMessageRecord } = require('./util');
const noop = () => null;

/** @param {ArgVars} argv */
/** @returns {Promise<Job[]>} */
const jobFactory = argv => {
    const glob = require('glob');
    const path = require('path');

    const opt = { cwd: argv.cwd };
    const f = match => {
        return {
            data: argv.data,
            name: path.basename(match),
            path: path.join(argv.cwd, match),
        };
    };

    return new Promise(rez => {
        glob(argv.pattern, opt, (err, matches) => {
            rez(matches.map(f));
        });
    });
};

const logUpdate = require('log-update');

const frames = ['-', '\\', '|', '/'];
let i = 0;

/** @param {Message[]} history */
const render = history => {
    const frame = frames[(i = ++i % frames.length)];
    const historyG = R.groupBy(m => m.name, history);
    const lines = R.mapObjIndexed((v, k) => {
        const types = v.map(m => m.type);
        return renderMessageRecord(k, types, frame);
    }, historyG);

    logUpdate(R.values(lines).join('\n'));
};

/** @param {ArgVars} argv */
const run = async argv => {
    const worker = workerFactory(argv);
    const logger = middleware.logger[argv.verbosity];
    const jobs = await jobFactory(argv);
    /** @type {Message[]} */
    const history = [];
    /** @type {Chanel} */
    const chanel = x => void history.push(x);

    jobs.map(j => {
        worker(chanel, j);
    });

    const p = new Promise(rez => {
        setInterval(() => {
            const allFinished = history.filter(msg => msg.type === 'testEnd');
            const end = allFinished.length === jobs.length;
            end && rez();
            render(history);
        }, 100);
    });

    return p;
};

module.exports = run;
