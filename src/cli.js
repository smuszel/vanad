const { Worker, isMainThread, workerData } = require('worker_threads');

const bootstrap = async () => {
    const config = require('./dotenv');
    const glob = require('glob');

    const resolveWorker = workerData => new Promise(rez => {
        const worker = new Worker(__filename, { workerData });
        worker.on('close', rez);
    });

    const argv = require('yargs')
        .option('debug', { alias: 'd' })
        .option('slug', { alias: 's', default: 'hotfix' })
        .option('credentials', { alias: 'c', required: true })
        // .option('pool', { alias: 'p', default: false })
        .config(config)
        .argv;
    // console.log(argv);
    
    if (argv.debug) {
        throw 'ni'
    } else {
        const specFiles = await new Promise(rez => {
            glob('../test/**/*.spec.js', { cwd: __dirname }, (err, matches) => rez(matches));
        });

        // console.log(specFiles);

        const work = specFiles.map(sf => {
            return resolveWorker({ ...argv, sf })
        });
        

        Promise.all(work)
    }
}

const runner = (data = workerData) => {
    const tests = require(data.sf);
    const run = require('./run');
    run(tests).then(() => process.exit())
    // require(data.scriptPath)(data);
}

// const main = async () => {
//     const fx = Array(1).fill(undefined).map(run);
//     await Promise.all(fx);

//     process.exit();
// }

isMainThread ? bootstrap() : runner();