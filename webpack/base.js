import path from 'path';
import webpack from 'webpack';

const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const env = dotenv.config().parsed;
const nameEnv = {
    production: '.env',
    stg: '.env.stg',
    dev: '.env.development',
};
const env = dotenv.config({
    path: nameEnv[process.env.NODE_ENV || 'dev'],
}).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});
const config = {
    entry: [path.join(__dirname, '../', 'src', 'app')],
    output: {
        path: path.join(__dirname, '../', 'dist'),
        filename: 'js/[name]_[hash].js',
        publicPath: '/',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /src\/styles\/vendor/],
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(jpe?g|ttf|eot|svg|png|woff(2)?)(\?[a-z0-9=&.]*)?$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new webpack.DefinePlugin(envKeys),
    ],
};

export default config;
