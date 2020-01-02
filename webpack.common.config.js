'use strict';

const webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    { CleanWebpackPlugin } = require('clean-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    ImageminPlugin = require("imagemin-webpack"),
    ImageminWebpWebpackPlugin= require("imagemin-webp-webpack-plugin"),
    unixTimestamp = Date.now(),
    isProductionEnv = process.env.NODE_ENV === 'production',
    isDevelopmentAnalyticsEnv = process.env.ANALYTICS_ENV === "development";

const ssrAwareMetaContent = (name, text, raw) => {
    return isProductionEnv?`<%${raw?'-':'='} locals.${name} || "${text}" %>`:text;
};

let siteSettings = {
    inject: true,
    excludeChunks: ['guide', 'vendors~guide'],
    template: 'src/templates/index.ejs',
    filename: `index.${isProductionEnv?'ejs':'html'}`,
    env: process.env.NODE_ENV || 'development',
    hash: true,
    timestamp: unixTimestamp,
    minify: isProductionEnv,
    site: {
        title: ssrAwareMetaContent('title', "Tunga | Unleashing Africa's Tech Talent"),
        description: ssrAwareMetaContent('description', "Small and large businesses from all over the world use Tunga for hiring African software engineers to address their most pressing software development needs."),
        html: ssrAwareMetaContent('html', '', true),
        images: {
            hero: ssrAwareMetaContent('image', 'https://tunga.io/icons/tunga_hero_devs_working.jpg')
        },
        colors: {
            primary: '#f41152'
        },
        fb_app_id: '518348818336672',
        optimizely_id: process.env.NODE_ENV?(isProductionEnv && !isDevelopmentAnalyticsEnv?'8175822119':'8182460702'):'',
        ga_tracker: process.env.NODE_ENV?(isProductionEnv?(isDevelopmentAnalyticsEnv?'UA-102018659-1':'UA-70644715-1'):''):'',
        gtm_tracker: process.env.NODE_ENV?(isProductionEnv?(isDevelopmentAnalyticsEnv?'GTM-KKS9DVD':'GTM-PDS4Q4'):''):'',
        enable_tracking: isProductionEnv && !isDevelopmentAnalyticsEnv,
        enable_ssr: isProductionEnv
    }
};

module.exports = {
    plugins: {
        appInjectPlugin: new HtmlWebpackPlugin(siteSettings),
        styleGuideInjectPlugin: new HtmlWebpackPlugin({
            ...siteSettings,
            excludeChunks: ['app', 'vendors~app'],
            template: 'src/templates/guide.ejs',
            filename: `guide.${isProductionEnv?'ejs':'html'}`,
            site: {
                ...siteSettings.site,
                title: ssrAwareMetaContent('title', 'Tunga | Style & Component Guide'),
                description: ssrAwareMetaContent('description', 'Style & Component Guide for Tunga'),
                html: ssrAwareMetaContent('html', '', true)
            }
        }),
        magicGlobalsPlugin: (globals) => {
            return new webpack.DefinePlugin({
                __PRODUCTION__: JSON.stringify(isProductionEnv),
                __API_ROOT_URL__: JSON.stringify(process.env.API_ROOT),
                __STRIPE_KEY__: JSON.stringify(isProductionEnv && process.env.STRIPE_ENV !== 'development'?'pk_live_2AjNhLWO1Cg4nby71Vh01a2T':'pk_test_lUZpYKnVWZ5RbdPcmnBqqE8l'),
                __MAINTENANCE__: false,
                __SSR__: JSON.stringify(JSON.parse(process.env.SSR || 'false')),
                ...(globals || {})
            });
        },
        cleanBuildFolderPlugin: new CleanWebpackPlugin({
            root: __dirname,
            verbose: true,
            dry: false
        }),
        miniCssExtractPlugin: new MiniCssExtractPlugin(),
        imageminPlugin: new ImageminPlugin({
            test: /.(jpe?g|png|gif|svg)$/i,
            bail: false,
            cache: true,
            imageminOptions: {
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["mozjpeg"/*"jpegtran"*/, { progressive: true, quality: 80 }],
                ["pngquant"/*"optipng"*/, { optimizationLevel: 5, quality: [0.6, 0.8] }],
                [
                  "svgo",
                  {
                    plugins: [
                      {
                        removeViewBox: false
                      }
                    ]
                  }
                ]
              ]
            },
            // Disable `loader`
            loader: false
        }),
        webpPlugin: new ImageminWebpWebpackPlugin({
            config: [{
              test: /\.(jpe?g|png)/,
              options: {
                quality:  75
              }
            }],
            overrideExtension: true,
            detailedLogs: false,
            silent: false,
            strict: true
        })
    },
    hash: unixTimestamp
};
