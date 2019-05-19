const factory = require('./factory');
const { EventEmitter } = require('events');
const noop = () => null;

/** @param {Job[]} jobs */
const schedule = (cluster, jobs) => {
    let currentJobs = jobs;
    currentJobs.forEach(job => {
        cluster.emit('*', { type: 'job', value: job })
    });
}

/** @param {ArgVars} argv */
const run = async argv => {
    const jobs = await factory.job(argv);
    const addWorker = factory.workerAppender(argv.browser)[argv.concurrency];
    const logger = factory.logger[argv.verbosity];
    const cluster = new EventEmitter();
    const ended = new Promise(rez => {
        let i = 0;
        const f = ({ type }) => {
            type === 'testEnd' && i++
            i === jobs.length && rez()
        };

        cluster.on('*', f);
    });

    cluster.on('*', message => {
        (logger[message.type] || noop)(message);
    });
    addWorker(cluster);
    schedule(cluster, jobs);

    return ended;
}

module.exports = run