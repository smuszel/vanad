const { Worker, isMainThread, workerData } = require('worker_threads');
const cwd = process.cwd();
const path = require('path');

const bootstrap = async () => {
    const config = require('./dotenv');
    const glob = require('glob');

    const argv = require('yargs')
        .option('debug', { alias: 'd' })
        .option('slug', { alias: 's', default: 'hotfix' })
        .option('credentials', { alias: 'c', required: true })
        .config(config)
        .argv;
    
    const pathPattern = argv._[0] || './test/**/*.spec.js';

    const resolveWorker = workerData => new Promise(rez => {
        const worker = new Worker(__filename, { workerData });
        worker.on('close', rez);
    });

    const specFiles = await new Promise(rez => {
        glob(pathPattern, { cwd }, (err, matches) => rez(matches));
    });

    const work = specFiles.map(sf => {
        const f = argv.debug ? runner : resolveWorker;
        return f({ ...argv, sf });
    });

    return Promise.all(work);
}

const runner = (data = workerData) => {
    const testGenerator = require(path.join(cwd, data.sf));
    const getSuiteResult = require('./getSuiteResult');
    const browserMode = data.browserMode || 'headless';
    
    return getSuiteResult({ testGenerator, browserMode });
}

(isMainThread ? bootstrap() : runner()).then(() => process.exit());