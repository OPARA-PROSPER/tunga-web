"use strict";

var webpack = require("webpack"),
    path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    config = require("./webpack.config"),
    commonConfig = require("./webpack.common.config"),
    isProductionEnv = process.env.NODE_ENV === 'production';

config.target = 'node';
config.node = {
    __dirname: false,
    __filename: false,
};
config.mode = isProductionEnv?'production':'development';
config.entry = path.join(srcPath, 'server.js');
config.output = {
    path: config.output.path,
    filename: '../server.js', // server file goes in top level directory
};

delete config.devtool;
config.optimization = {
    ...config.optimization,
    splitChunks: false,
};


config.plugins = [
    commonConfig.plugins.magicGlobalsPlugin({
        "process.env": {
            NODE_ENV: JSON.stringify(isProductionEnv?'production':'development')
        },
        __SSR__: true,
    }),
    new webpack.ProvidePlugin({
        window: 'shims/window',
        self: 'shims/self'
    }),
];

module.exports = config;
