const fs = require('fs'),
    path = require('path'), 
    mkdirp = require('mkdirp'), 
    ssrUtils = require('../../src/utils/ssr');

const cacheDir = path.join(__dirname, '..', '..', 'build', 'cache');

mkdirp(cacheDir, e => {
    if(e) {
        console.error('Failed to create cache folder', e);
        return;
    }

    ssrUtils.retrieveBlogs().then(blogs => {
        if(blogs && Array.isArray(blogs) && blogs.length) {
            fs.writeFileSync(path.join(cacheDir, 'blogs.json'), JSON.stringify({ts: Date.now(), blogs}), 'utf-8');
        }
    });

    ssrUtils.retrieveVlogs().then(vlogs => {
        if(vlogs && Array.isArray(vlogs) && vlogs.length) {
            fs.writeFileSync(path.join(cacheDir, 'vlogs.json'), JSON.stringify({ts: Date.now(), vlogs}), 'utf-8');
        }
    });

});
