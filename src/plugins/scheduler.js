/** @type {VPluginFactory} */
module.exports = argv => {
    const glob = require('glob');
    const path = require('path');

    const opt = { cwd: argv.cwd };
    /** @type {(match: string) => Job} */
    const jobOf = match => {
        return {
            data: argv.data,
            name: path.basename(match),
            path: path.join(argv.cwd, match),
        };
    };
    let jobs;
    let pristine = true;
    glob(argv.path, opt, (_, matches) => {
        jobs = matches.map(jobOf);
    });

    return done => {
        /** @type {Message | undefined} */
        let msg;
        if (jobs && pristine) {
            msg = { type: 'jobScheduled', value: jobs };
            pristine = false;
        } else if (jobs && done.filter(d => d.type === 'testEnd').length === jobs.length) {
            msg = { type: 'exit' };
            setTimeout(() => {
                process.exit();
            }, 500);
        }

        return msg ? [msg] : [];
    };
};
