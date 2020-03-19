"use strict";

var config = require("./webpack.config"),
    common_config = require("./webpack.common.config"),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    TerserPlugin = require('terser-webpack-plugin'),
    DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin'),
    ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
    ResourceHintWebpackPlugin = require('resource-hints-webpack-plugin'),
    HtmlCriticalPlugin = require("html-critical-webpack-plugin");

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
    new ResourceHintWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
        async: 'app'
    }),
    new DynamicCdnWebpackPlugin({
        env: 'production',
        exclude: 'babel-polyfill'
    }),
    new HtmlCriticalPlugin({
        base: 'build/',
        src: 'index.html',
        dest: 'index.html',
        inline: true,
        minify: true,
        extract: true,
        width: 375,
        height: 565,
        penthouse: {
            blockJSRequests: false,
        }
    }),
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
