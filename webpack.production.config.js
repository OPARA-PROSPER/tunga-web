"use strict";

const config = require("./webpack.config");
const common_config = require("./webpack.common.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin");

config.devtool = "source-map";
config.plugins = [
    common_config.plugins.CleanWebpackPlugin,
    common_config.plugins.HTMLInjectPlugin,
    common_config.plugins.noErrorsPlugin,
    common_config.plugins.magicGlobalsPlugin,
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
    }),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
        async: 'app'
    }),
    new DynamicCdnWebpackPlugin({
        env: 'production',
        exclude: 'babel-polyfill'
    }),
    new ImageminWebpWebpackPlugin()
];
config.optimization = {
    minimize: true,
    usedExports: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
        cacheGroups: {
            vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
            },
        },
    }
};

module.exports = config;
