# Tunga Web Client
Web Client App for [tunga.io](http://tunga.io/)

# Installation
1. run this command from project root
```
npm install webpack -g
npm install webpack-dev-server -g
npm install
```
2. Install [ImageMagick](https://www.imagemagick.org/script/download.php)

# Coding Guide
* Built with [React,js](https://facebook.github.io/react/) and [Redux](http://redux.js.org/)
* All source code goes into /src
* Actions, Reducers, Components and Containers go in respective directories
* App Logic goes in app.js
* index.html is a template, refrain from editing (except when adding global libraries served via a CDN)
* Leverage [ES6/ES2015](https://babeljs.io/docs/learn-es2015/) features in your code
* Use [axios](https://github.com/mzabriskie/axios) for networking
* Use \_\_DEV\_\_ , \_\_PRERELEASE\_\_ and \_\_PRODUCTION\_\__ predefined globals to filter code the should only be added in development and testing

#### Importing modules
Use either ES6 imports
```
import MyAction from 'actions/MyAction';
```

Or CommonJS imports
```
MyAction = require('actions/MyAction');
```

#### Importing Style sheets
Add this to app.js
```
import 'css/style.css';
import 'css/style.less';
```

#### Importing non NPM scripts
Add this to app.js
```
import "script!file.js";
```


# Development
1. run this command from project root

To connect to the test/sandbox API at http://test.tunga.io/api/
```
npm run watch
```

To connect to a local version of the API running on your machine at http://localhost:8000/
```
npm run watch:local
```

2. A new browser tab with automatically open at http://127.0.0.1:8080/
(The browser will auto reload when changes are made to the code)

# Debugging

[React Developer Tools](https://github.com/facebook/react-devtools)

[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

# Documentation
Find API Documentation at https://tunga.io/api/docs/

# Deployment

## Automated

### Sandbox
1. Push changes to `develop` branch
2. Run the following commands
```
npm run deploy:sandbox
```
or
```
cd .ansible
ansible-playbook deploy.yml -i env/test
```

### Production
1. Push changes to `master` branch
2. Run the following commands
```
npm run deploy
```
or
```
cd .ansible
ansible-playbook deploy.yml -i env/prod
```


## Manual

### Sandbox
1. run the following commands from project root
```
npm install
npm run build:sandbox
```
2. copy contents of /build folder to webserver

### Production
1. run the following commands from project root
```
npm install --production
npm run build
```
2. copy contents of /build folder to webserver
