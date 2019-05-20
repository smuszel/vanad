const workerAppender = require('./workerAppender');
const middleware = require('./middleware');
const { EventEmitter } = require('events');
const noop = () => null;

/** @param {ArgVars} argv */
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

/** @param {Job[]} jobs */
/** @param {Cluster} cluster */
const schedule = (cluster, jobs) => {
    let currentJobs = jobs;
    currentJobs.forEach(value => {
        cluster.emit('*', { type: 'jobRequest', value });
    });
};

/** @param {ArgVars} argv */
const run = async argv => {
    /** @type {Cluster} */
    const cluster = new EventEmitter();
    const jobs = await jobFactory(argv);
    const addWorker = workerAppender(argv);
    const logger = middleware.logger[argv.verbosity];
    const ended = new Promise(rez => {
        let i = 0;
        const f = ({ type }) => {
            type === 'testEnd' && i++;
            i === jobs.length && rez();
        };

        cluster.addListener('*', f);
    });

    cluster.addListener('*', message => {
        logger && (logger[message.type] || noop)(message);
    });
    addWorker(cluster);
    schedule(cluster, jobs);

    return ended;
};

module.exports = run;
