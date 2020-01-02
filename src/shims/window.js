var window = {
    location: {}, 
    navigator: {userAgent: ''}, 
    matchMedia: (mediaQueryString) => ({
        matches: false, 
        addListener: () => {},
        //removeListener: () => {}
    })
};

module.exports = window;