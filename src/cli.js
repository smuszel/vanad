const { Worker, isMainThread, workerData } = require('worker_threads');
const executeTest = require('./executeTest');

const bootstrap = async () => {
    const config = require('./dotenv');
    const glob = require('glob');
    const cwd = process.cwd();
    const path = require('path');

    const argv = require('yargs')
        .option('debug', { alias: 'd', default: false })
        .option('data', { alias: 't', default: {} })
        .option('mode', { alias: 'm', default: 'headless' })
        .option('verbosity', { alias: 'v', default: 'silent' })
        .config(config)
        .argv;
    
    const pathPattern = argv._[0] || './test/**/*.spec.js';

    const launchSelfWorker = workerData => new Promise(rez => {
        const worker = new Worker(__filename, { workerData });
        worker.on('close', rez);
    });

    const specFileMatches = await new Promise(rez => {
        glob(pathPattern, { cwd }, (err, matches) => rez(matches));
    });

    const run = argv.debug ? executeTest : launchSelfWorker;

    const work = specFileMatches.map(sfm => {
        const testPath = path.join(cwd, sfm);
        const testName = path.basename(testPath);
        return run({ ...argv, testPath, testName });
    });

    return Promise.all(work);
}

//@ts-ignore
(isMainThread ? bootstrap() : executeTest(workerData)).then(() => process.exit());