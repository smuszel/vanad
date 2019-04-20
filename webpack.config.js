const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');

const paths = {
    index: path.resolve(__dirname, 'src', 'index.js'),
}

/** @type {webpack.Configuration} */
module.exports =  {
    entry: {
        index: paths.index,
    },
    resolve: {
        extensions: ['.js', '.css'],
    },
    module: {
        rules: [
            { test: /\.js/, use: 'babel-loader' },
            { test: /\.css/, use: ['style-loader', 'css-loader'] },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlPlugin(),
    ],
}