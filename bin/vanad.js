const glob = require('glob');
const path = require('path');
const yargs = require('yargs');

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

const main = () => {
    const { pattern, cwd, babel, verbosity } = yargs
        .option('cwd', { default: process.cwd() })
        .option('babel', { alias: 'b' })
        .option('verbosity', { alias: 'v', default: 'basic', choices: ['basic', 'full'] })
        .option('pattern', {
            alias: 'p',
            default: './**/*.spec.*',
        }).argv;

    if (babel) {
        require('@babel/register')({ extensions });
    }

    global['verbosity'] = verbosity;

    glob(pattern, { cwd }, (_, testFiles) => {
        testFiles.forEach(tf => {
            const fullPath = path.join(cwd, tf);
            require(fullPath);
        });
    });
};
main();
