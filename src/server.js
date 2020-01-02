import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import ejs from 'ejs';
import path from 'path';
import { HelmetProvider } from 'react-helmet-async';
import striptags from 'striptags';
import axios from 'axios';

import App from './components/App';
import Guide from './components/guide/Guide';

import store from './store.js';
import {getMediumPosts} from './actions/UtilityActions';
import {GET_MEDIUM_POSTS_SUCCESS, GET_MEDIUM_POSTS_FAILED} from './actions/UtilityActions';

const app = express();

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// View directory
app.set('views', path.join(__dirname, 'public'));


// Template Engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

const port = 3000;

const getPreloadedState = async (req) => {
    let defaultState = store.getState();

    return new Promise((resolve, reject) => {
        // Get medium blog posts
        getMediumPosts()((data) => {
            switch(data.type) {
                case GET_MEDIUM_POSTS_SUCCESS:
                case GET_MEDIUM_POSTS_FAILED:
                    if(data.type === GET_MEDIUM_POSTS_SUCCESS && data.posts && Array.isArray(data.posts)) {
                        defaultState.app.Utility.posts = data.posts;
                        defaultState.app.blogs.blogs.is = {fetching: false, ok: true, error: false};
                        defaultState.app.blogs.blogs.blogList = data.posts;
                    }

                    const returnState = () => {
                        resolve(JSON.stringify(defaultState));
                    };

                    // Get vlogs for news page
                    if(req.url === '/news') {
                        axios.get(
                            'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAuIXqeLrUkyZhsau0WpAVzWlyuv_P9YE8&channelId=UC_Pl6wmR-t9Zv9z7_s1aWNg&part=snippet,id&order=date&maxResults=20',
                            {headers: {referer: `https://${__PRODUCTION__?'':'sandbox.'}tunga.io${req.url}`}}
                        ).then(res => {   
                            if(res && res.data && res.data.items && Array.isArray(res.data.items)) {
                                defaultState.app.vlogs.vlogs.is = {fetching: false, ok: true, error: false};
                                defaultState.app.vlogs.vlogs.list = res.data.items;
                            } 
                            returnState();
                        }).catch(e => {
                            returnState();
                        });
                    } else {
                        returnState();
                    }
                    break;
                default:
                    break;
            }
        });
    });
};

app.use(async (req, res) => {

    if(/^\/(dashboard|projects|network|payments|settings|onboard|work|proposal)/i.test(req.url)) {
        // No SSR for dashboard pages
        res.render('index');
    }

    const context = {},
        helmetContext = {},
        isGuideRoute = /\/guide(\.html)?/i.test(req.url),
        AppComp = isGuideRoute?Guide:App;

    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <HelmetProvider context={helmetContext}>
                    <AppComp />
                </HelmetProvider>
            </StaticRouter>
        </Provider>
    );

    if (context.url) {
        res.redirect(301, context.url);
    } else {
        const { helmet } = helmetContext;
        let title = null,
            description = null;
        if(helmet) {
            title = striptags(helmet.title.toString());
            const matches = helmet.meta.toString().match(/<meta\s+[^>]*name="description"\s+content="([^"]+)"\s*\/>/i);
            description = matches?matches[1]:null;
        }

        res.render(isGuideRoute?'guide':'index', {
            title,
            description,
            html,
            preloadedState: await getPreloadedState(req)
        });
    }
});

var server = app.listen(port, () => {
    console.log(`Server is running on port ${port}…`);
});


/*
process.on('SIGTERM', () => {
    console.log("SIGTERM received");
    server.close();
});

process.on('SIGHUP', () => {
    console.log("SIGHUP received");
    server.close();
});
*/