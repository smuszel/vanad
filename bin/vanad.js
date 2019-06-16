const glob = require('glob');
const path = require('path');
const mri = require('mri');

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

const main = () => {
    const { pattern, cwd, babel, verbosity, watch } = mri(process.argv.slice(2), {
        alias: {
            c: 'cwd',
            b: 'babel',
            p: 'pattern',
            v: 'verbosity',
            w: 'watch',
        },
        default: {
            c: process.cwd(),
            b: false,
            p: '{,./!(node_modules)/**/*.spec.js}',
            v: 'basic',
            w: false,
        },
        boolean: ['b', 'w'],
    });

    if (babel) {
        require('@babel/register')({ extensions });
    }

    global['verbosity'] = verbosity;

    const watchRun = () => {
        const chokidar = require('chokidar');
        const getCachePaths = () => {
            return Object.keys(require.cache).filter(x => !x.includes('node_modules'));
        };

        let watcher;

        const reset = changedPath => {
            const mod = require.resolve(changedPath);
            if (mod) {
                delete require.cache[mod];
                require(changedPath);
                watcher.close();
                watcher = createWatcher();
            }
        };

        createWatcher = () => {
            const ps = getCachePaths();
            return chokidar.watch(ps, { cwd }).on('all', (name, filePath) => {
                if (name === 'change') {
                    console.log('change');
                    reset(path.join(cwd, filePath));
                }
            });
        };

        watcher = createWatcher();
    };

    const run = () => {
        return new Promise(rez => {
            glob(pattern, { cwd }, (_, testFiles) => {
                testFiles.forEach(tf => {
                    const fullPath = path.join(cwd, tf);
                    require(fullPath);
                });
                rez();
            });
        });
    };

    run().then(() => {
        watch && watchRun();
    });
};

main();
