"use strict";

var webpack = require("webpack"),
    config = require("./webpack.config"),
    commonConfig = require("./webpack.common.config");

config.mode = 'production';
delete config.devtool;

config.plugins = [
    //commonConfig.plugins.cleanBuildFolderPlugin,
    commonConfig.plugins.appInjectPlugin,
    commonConfig.plugins.styleGuideInjectPlugin,
    commonConfig.plugins.magicGlobalsPlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        },
        __SSR__: true,
    }),
    commonConfig.plugins.miniCssExtractPlugin,
    commonConfig.plugins.imageminPlugin,
    commonConfig.plugins.webpPlugin,
];

module.exports = config;
