'use strict';

var webpack = require('webpack'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    common_config = require('./webpack.common.config'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'web',
    cache: true,
    mode: 'development',
    entry: {
        app: path.join(srcPath, 'app.js'),
        guide: path.join(srcPath, 'guide.js')
    },
    output: {
        path: path.join(__dirname, 'build', 'public'),
        publicPath: '/',
        filename: '[name].js?v='+ common_config.hash,
        library: ['[name]']
    },
    module: {
        rules: [
            { test: /\.coffee$/, use: 'coffee-loader' },
            { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader?cacheDirectory'},
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test: /\.(png|jpg|gif)(\?.*)?$/, use: [
                {loader: 'url-loader', options: {limit: 8192, name: 'images/[name].[hash].[ext]?v='+ common_config.hash, 'publicPath': '/'}},
                {loader: 'image-maxsize-webpack-loader', options: {'max-width': 1600, useImageMagick: true}},
            ]},
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: "url-loader?publicPath=/&mimetype=application/font-woff&name=fonts/[hash].[ext]?v="+ common_config.hash },
            { test: /\.(otf|ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: "file-loader?publicPath=/&name=fonts/[hash].[ext]?v="+ common_config.hash },
            { test: /\.ejs$/, use: 'ejs-compiled-loader?htmlmin' },
            { test: /\.mp4$/, use: 'file-loader?publicPath=/&name=videos/[hash].[ext]?v='+ common_config.hash},
            { test: /\.(mp3|wav)$/, use: 'file-loader?publicPath=/&name=audio/[hash].[ext]?v='+ common_config.hash},
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.coffee', '.less', '.css', '.png', '.jpg', '.gif'],
        alias: {
            'shims': path.join(srcPath, 'shims'),
            'images': path.join(srcPath, 'assets', 'images'),
        }
    },
    plugins: [
        common_config.plugins.appInjectPlugin,
        common_config.plugins.styleGuideInjectPlugin,
        common_config.plugins.magicGlobalsPlugin(),
        common_config.plugins.miniCssExtractPlugin,
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './build/public',
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        open: true
    },
    optimization: {
        minimize: true,
        noEmitOnErrors: true,
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all'
        }
    }
};
