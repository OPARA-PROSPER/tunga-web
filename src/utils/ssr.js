const fs = require('fs'), 
    path = require('path'),
    axios = require('axios');

const cacheDir = path.join(__dirname, '..', '..', 'build', 'cache');

const readCacheFile = (filename) => {
    try {
        return JSON.parse(fs.readFileSync(path.join(cacheDir, 'blogs.json'), 'utf-8'));
    } catch(e) {}
    return null;
};

const retrieveBlogs = async () => {
    const res =  await axios.get('https://tunga.io/api/medium/?page_size=5').catch(e => {});
    return res && res.data || [];
};

const retrieveVlogs = async () => {
    const res = await axios.get(
        'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAuIXqeLrUkyZhsau0WpAVzWlyuv_P9YE8&channelId=UC_Pl6wmR-t9Zv9z7_s1aWNg&part=snippet,id&order=date&maxResults=20',
        {headers: {referer: 'https://tunga.io'}}
    ).catch(e => {});
    return res && res.data && res.data.items || [];
};

const retrieveCachedBlogs = async () => {
    const cache = readCacheFile('blogs.json');
    if(cache && cache.blogs && Array.isArray(cache.blogs) && blogs.length) {
        return cache.blogs;
    }
    return retrieveBlogs();
};

const retrieveCachedVlogs = async () => {
    const cache = readCacheFile('vlogs.json');
    if(cache && cache.vlogs && Array.isArray(cache.vlogs) && vlogs.length) {
        return cache.vlogs;
    }
    return retrieveVlogs();
};

module.exports = {
    retrieveBlogs,
    retrieveVlogs,
    retrieveCachedBlogs,
    retrieveCachedVlogs
};