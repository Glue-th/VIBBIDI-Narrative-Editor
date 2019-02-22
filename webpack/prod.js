import baseConfig from './base';

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

export default {
    ...baseConfig,
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        ...baseConfig.plugins,
        new CleanWebpackPlugin(['dist']),
        // new UglifyJsPlugin({
        //     parallel: true,
        //     uglifyOptions: {
        //         compress: {
        //             drop_console: true,
        //         },
        //     },
        // }),
        new MiniCssExtractPlugin(),
    ],
};
