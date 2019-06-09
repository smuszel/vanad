const { DEFAULT_EXTENSIONS } = require('@babel/core');
const resolve = require('rollup-plugin-node-resolve');
const json = require('rollup-plugin-json');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');
const extensions = [...DEFAULT_EXTENSIONS, '.ts'];

module.exports = {
    input: 'src/index.ts',
    output: [
        { file: pkg.main, name: 'vanad', format: 'umd', sourcemap: true },
        { file: pkg.module, format: 'es', sourcemap: true },
    ],
    external: [],
    watch: {
        include: 'src/**',
    },
    plugins: [
        json(),
        resolve({ extensions }),
        commonjs(),
        babel({
            babelrc: false,
            plugins: ['@babel/plugin-transform-typescript'],
            extensions,
        }),
        resolve(),
    ],
};
