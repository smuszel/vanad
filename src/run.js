const workerFactory = require('./workerFactory');
const middleware = require('./middleware');
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

/** @param {ArgVars} argv */
const run = async argv => {
    const jobs = await jobFactory(argv);
    const logger = middleware.logger[argv.verbosity];
    const worker = workerFactory(argv);
    const p = new Promise(rez => {
        let i = 0;
        jobs.map(async j => {
            for await (const message of worker(j)) {
                logger && (logger[message] || noop)(message);
            }
            i++;
            i === 2 && rez();
        });
    });

    return p;
};

module.exports = run;
