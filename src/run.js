const prepareJobExecution = require('./jobExecution');
const loggers = require('./loggers');

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
    const worker = prepareJobExecution(argv);
    const render = loggers[argv.verbosity]();
    const jobs = await jobFactory(argv);
    /** @type {Message[]} */
    const history = [];
    /** @type {Chanel} */
    const chanel = x => void history.push(x);

    jobs.map(j => {
        worker(chanel, j);
    });

    const p = new Promise(rez => {
        let end = false;
        setInterval(() => {
            render(end, history);
            end && rez();
            const allFinished = history.filter(msg => msg.type === 'testEnd');
            end = allFinished.length === jobs.length;
        }, 100);
    });

    return p;
};

module.exports = run;
