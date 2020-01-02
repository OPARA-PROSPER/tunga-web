'use strict';

const webpack = require('webpack'),
    path = require('path'),
    srcPath = path.join(__dirname, 'src'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    commonConfig = require('./webpack.common.config'),
    isProductionEnv = process.env.NODE_ENV === 'production';

const imagesUrlLoader = {
    loader: 'url-loader',
    options: {limit: 4096, name: 'images/[hash].[ext]?v='+ commonConfig.hash, publicPath: '/'}
};

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
        filename: '[name].js?v='+ commonConfig.hash,
        library: ['[name]']
    },
    module: {
        rules: [
            { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader?cacheDirectory'},
            { test: /\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'] },
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
            { test: /\.(png|jpg)(\?.*)?$/, use: [
                {
                    loader: 'responsive-loader',
                    options: {
                        adapter: require('responsive-loader/sharp'),
                        sizes: [1200, 50, 100, 300, 600, 1600, 2000, 4000], // starts with default
                        placeholder: true,
                        placeholderSize: 50,
                        name: 'images/[hash]-[width].[ext]?v='+ commonConfig.hash,
                        publicPath: '/'
                    }
                },
            ]},
            { test: /\.gif(\?.*)?$/, use: [imagesUrlLoader]},
            { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, use: "url-loader?publicPath=/&mimetype=application/font-woff&name=fonts/[hash].[ext]?v="+ commonConfig.hash },
            { test: /\.(otf|ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, use: "file-loader?publicPath=/&name=fonts/[hash].[ext]?v="+ commonConfig.hash },
            { test: /\.ejs$/, use: 'ejs-compiled-loader?htmlmin' },
            { test: /\.mp4$/, use: 'file-loader?publicPath=/&name=videos/[hash].[ext]?v='+ commonConfig.hash},
            { test: /\.(mp3|wav)$/, use: 'file-loader?publicPath=/&name=audio/[hash].[ext]?v='+ commonConfig.hash},
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.coffee', '.less', '.scss', '.css', '.png', '.jpg', '.gif'],
        alias: {
            'shims': path.join(srcPath, 'shims'),
            'images': path.join(srcPath, 'assets', 'images'),
        }
    },
    plugins: [
        commonConfig.plugins.appInjectPlugin,
        commonConfig.plugins.styleGuideInjectPlugin,
        commonConfig.plugins.magicGlobalsPlugin(),
        commonConfig.plugins.miniCssExtractPlugin,
        new webpack.HotModuleReplacementPlugin(),
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
        minimize: isProductionEnv,
        noEmitOnErrors: true,
        runtimeChunk: false,
        splitChunks: {
            chunks: isProductionEnv?'all':'async'
        },
        usedExports: true,
    }
};
