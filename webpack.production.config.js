"use strict";

var webpack = require("webpack"),
    config = require("./webpack.config"),
    common_config = require("./webpack.common.config");

config.mode = 'production';
delete config.devtool;

config.plugins = [
    //common_config.plugins.cleanBuildFolderPlugin,
    common_config.plugins.appInjectPlugin,
    common_config.plugins.styleGuideInjectPlugin,
    common_config.plugins.magicGlobalsPlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        },
        __SSR__: true,
    }),
    common_config.plugins.miniCssExtractPlugin,
];

module.exports = config;
