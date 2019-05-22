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

const render = console.log;

/** @param {ArgVars} argv */
const run = async argv => {
    const worker = workerFactory(argv);
    const logger = middleware.logger[argv.verbosity];
    const jobs = await jobFactory(argv);
    /** @type {MessageType[]} */
    const history = [];
    const chanel = x => history.push(x);

    jobs.map(j => {
        worker(chanel, j);
    });

    const p = new Promise(rez => {
        setInterval(() => {
            const end = history.filter(msg => msg === 'testEnd').length === jobs.length;
            render(history);
            end && rez();
        }, 30);
    });

    return p;
};

module.exports = run;
