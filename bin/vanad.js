const glob = require('glob');
const path = require('path');
const mri = require('mri');
const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];
const polyfill = () => require('@babel/register')({ extensions });

const main = () => {
    const { cwd, babel, watch } = mri(process.argv.slice(2), {
        alias: {
            c: 'cwd',
            b: 'babel',
            w: 'watch',
        },
        default: {
            c: process.cwd(),
            b: false,
            w: false,
        },
        boolean: ['b', 'w'],
    });

    babel && polyfill();

    const prepWatch = () => {
        const chokidar = require('chokidar');
        const esc = require('ansi-escapes');
        let current;
        let history;

        const mockSend = message => {
            history.push(message);
            if (message.diff) {
                console.log(message.title);
                console.log(message.callers[1]);
                console.log(message.diff);
            }
        };

        const getResult = () => {
            const byTitle = {};
            history.forEach(message => {
                const prev = byTitle[message.title] || [];
                byTitle[message.title] = [...prev, message];
            });

            return Object.keys(byTitle).every(title => {
                const group = byTitle[title];
                const allFinished = group.length === group[0].total;

                return allFinished;
            });
        };

        const _run = () => {
            if (!current) {
                history = [];
                clearStd();
                process.stdout.write(esc.cursorHide);
                clearTests();
                return run()
                    .then(() => {
                        return new Promise(rez => {
                            const i = setInterval(() => {
                                if (getResult()) {
                                    clearInterval(i);
                                    rez();
                                }
                            }, 50);
                        });
                    })
                    .then(() => {
                        process.stdout.write(esc.cursorShow);
                        current = null;
                    });
            }
        };

        const clearCache = dirname => () => {
            const frag = path.join(cwd, dirname);
            const modulePaths = Object.keys(require.cache).filter(p => p.includes(frag));
            modulePaths.forEach(p => {
                delete require.cache[require.resolve(p)];
            });
        };

        const clearSources = clearCache('src');
        const clearTests = clearCache('test');

        const clearStd = () => {
            process.stdout.write(esc.clearTerminal);
        };

        chokidar
            .watch('src', { cwd, ignoreInitial: true })
            .on('all', (name, filePath) => {
                if (name === 'change' || name === 'unlink') {
                    clearSources();
                    _run();
                }
            });

        chokidar
            .watch('test/**/*.spec.*', { cwd, ignoreInitial: true })
            .on('all', (name, filePath) => {
                if (name === 'change' || name === 'add') {
                    _run();
                }
            });

        !process.send && (process.send = mockSend);
        const first = _run();
        current = first;
    };

    const run = () => {
        return new Promise(rez => {
            glob('test/**/*.spec.*', { cwd }, (_, testFiles) => {
                testFiles.forEach(tf => {
                    const fullPath = path.join(cwd, tf);
                    require(fullPath);
                });
                rez();
            });
        });
    };

    watch ? prepWatch() : run();
};

main();
