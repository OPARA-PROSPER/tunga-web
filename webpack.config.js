"use strict";

const webpack = require("webpack");
const path = require("path");
const common_config = require("./webpack.common.config");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        vendor: [
            "babel-polyfill",
            "react",
            "react-dom",
            "react-router",
            "redux",
            "react-redux"
        ],
        app: "app.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[hash].bundle.js",
        library: ["[name]"],
        publicPath: "/",
        //chunkFilename: "[id].chunk.js" // TODO find fix for when using lazyloading
    },
    target: "web",
    cache: true,
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                include: [path.resolve(__dirname, "src")],
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    cacheCompression: true
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            { test: /\.coffee$/, use: "coffee-loader" },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            hmr: process.env.NODE_ENV === "development"
                        }
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)(\?.*)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "images/[hash].[ext]",
                            esModule: false,
                        },
                    }
                ]
            },
            {
                test: /\.webp$/,
                use: 'file-loader?name=images/[hash].[ext]'
            },
            {
                test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
                use:
                    "url-loader?mimetype=application/font-woff&name=fonts/[hash].[ext]"
            },
            {
                test: /\.(otf|ttf|eot|svg)(\?v=[0-9]+\.[0-9]+\.[0-9]+)?$/,
                loader: 'url-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.ejs$/,
                use: "@testerum/ejs-compiled-loader-webpack4-nodeps"
            },
            {
                test: /\.mp4$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "videos/[hash].[ext]?v=" + common_config.hash
                    }
                }
            },
            {
                test: /\.(mp3|wav)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "audio/[hash].[ext]?v=" + common_config.hash
                    }
                }
            },
            { test: /\.json$/, use: "file-loader", type: "javascript/auto" }
        ]
    },
    plugins: [
        common_config.plugins.HTMLInjectPlugin,
        common_config.plugins.magicGlobalsPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        extensions: [
            ".js",
            ".jsx",
            ".json",
            ".coffee",
            ".less",
            ".css",
            ".png",
            ".jpg",
            ".gif"
        ]
    },
    devtool: "source-map",
    devServer: {
        open: true,
        compress: true,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        headers: {
            'Cache-Control': 'max-age=31536000', // help Remo understand that he has to set this in nginx
            "Set-Cookie": "SameSite=None;Secure"
        }
    }
};
