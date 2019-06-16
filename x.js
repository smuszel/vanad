const y = require('./y');
const chokidar = require('chokidar');
const getC = () => {
    return Object.keys(require.cache).filter(x => !x.includes('node_modules'));
};

const main = () => {
    let watcher;
    let changed;

    const reset = () => {
        const mod = require.resolve(changed);
        if (mod) {
            delete require.cache[mod];
            require(changed);
            watcher.close();
            watcher = createWatcher();
        }
    };

    createWatcher = () => {
        return chokidar.watch(getC()).on('all', (name, path) => {
            console.log(name, path);
            if (name === 'change') {
                changed = path;
                reset();
            }
        });
    };

    watcher = createWatcher();
};
main();

// chokidar.watch('./{,!(node_modules)}/**/*.spec.*').on('all', (name, path) => {
// process.stdin.addListener('data', () => {
//     console.log(require('./y'));
//     delete require.cache[require.resolve('./y')];
// });
