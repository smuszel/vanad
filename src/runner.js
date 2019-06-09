const glob = require('glob');
const path = require('path');
const yargs = require('yargs');

const main = () => {
    const { pattern, cwd } = yargs
        .option('cwd', { default: process.cwd() })
        .option('pattern', {
            alias: 'p',
            default: './**/*.spec.js',
        }).argv;

    glob(pattern, { cwd }, (_, testFiles) => {
        testFiles.forEach((tf, ix) => {
            const fullPath = path.join(cwd, tf);
            require(fullPath);
        });
    });
};
main();
