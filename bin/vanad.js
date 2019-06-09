const glob = require('glob');
const path = require('path');
const yargs = require('yargs');

const extensions = ['.js', '.jsx', '.es6', '.es', '.mjs', '.ts', '.tsx'];

const main = () => {
    const { pattern, cwd, babel } = yargs
        .option('cwd', { default: process.cwd() })
        .option('babel', { alias: 'b' })
        .option('pattern', {
            alias: 'p',
            default: './**/*.spec.js',
        }).argv;

    if (babel) {
        require('@babel/register')({ extensions });
    }

    glob(pattern, { cwd }, (_, testFiles) => {
        testFiles.forEach((tf, ix) => {
            const fullPath = path.join(cwd, tf);
            require(fullPath);
        });
    });
};
main();
