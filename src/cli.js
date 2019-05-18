const { Worker, isMainThread, workerData } = require('worker_threads');

const bootstrap = async () => {
    const config = require('./dotenv');
    const glob = require('glob');
    const cwd = process.cwd();
    const path = require('path');

    const argv = require('yargs')
        .option('debug', { alias: 'd' })
        .option('data', { alias: 't', default: {} })
        .config(config)
        .argv;
    
    const pathPattern = argv._[0] || './test/**/*.spec.js';

    const resolveWorker = workerData => new Promise(rez => {
        const worker = new Worker(__filename, { workerData });
        worker.on('close', rez);
    });

    const specFileMatches = await new Promise(rez => {
        glob(pathPattern, { cwd }, (err, matches) => rez(matches));
    });

    const resolveSuite = argv.debug ? runner : resolveWorker;

    const work = specFileMatches.map(sfm => {
        return resolveSuite({ ...argv, testPath: path.join(cwd, sfm) });
    });

    return Promise.all(work);
}

const runner = (options = workerData) => {
    const testGeneratorFactory = require(options.testPath);
    const getSuiteResult = require('./getSuiteResult');
    const getBrowser = require('./getBrowser');
    const browser = getBrowser(options.browserMode || 'headless');
    
    return getSuiteResult(testGeneratorFactory(browser, options.data));
}

(isMainThread ? bootstrap() : runner()).then(() => process.exit());