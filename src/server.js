import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import ejs from 'ejs';
import path from 'path';
import { HelmetProvider } from 'react-helmet-async';
import striptags from 'striptags';

import App from './components/App';
import Guide from './components/guide/Guide';

import store from './store.js';
import {retrieveCachedBlogs, retrieveCachedVlogs} from './utils/ssr';

const app = express();

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// View directory
app.set('views', path.join(__dirname, 'public'));


// Template Engine
app.engine('ejs', ejs.renderFile);
app.set('view engine', 'ejs');

const port = 3000;

const getPreloadedState =  async (req) => {
    let defaultState = store.getState();

    // Get Medium blog posts
    const blogs = await retrieveCachedBlogs().catch(e => {}) || [];
    if(blogs && Array.isArray(blogs)) {
        defaultState.app.Utility.posts = blogs;
        defaultState.app.blogs.blogs.is = {fetching: false, ok: true, error: false};
        defaultState.app.blogs.blogs.blogList = blogs;
    }

    // Get Youtube vlogs for news page
    if(req.url === '/news') {
        const vlogs = await retrieveCachedVlogs().catch(e => {}) || [];
        if(vlogs && Array.isArray(vlogs)) {
            defaultState.app.vlogs.vlogs.is = {fetching: false, ok: true, error: false};
            defaultState.app.vlogs.vlogs.list = vlogs;
        }
    }

    // Return stringified state
    return JSON.stringify(defaultState);
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

app.listen(port, () => {
    console.log(`Server is running on port ${port} …`);
});
