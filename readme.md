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

# Development
A development environment can be started by running any of the following commands from project root

## Client-side only

To connect to the sandbox API at http://sandbox.tunga.io/api/
```
npm run watch
```

To connect to a local version of the API running on your machine at http://localhost:8000/
```
npm run watch:dev
```

> A new browser tab with automatically open at http://localhost:8080/
(The browser will auto reload when changes are made to the code)

## Server-side rendering
To connect to the sandbox API at http://sandbox.tunga.io/api/
```
npm run watch:ssr
```

To connect to a local version of the API running on your machine at http://localhost:8000/
```
npm run watch:ssr:dev
```

# Debugging

[React Developer Tools](https://github.com/facebook/react-devtools)

[Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension)

# Contributing
You can find our contribution guide here: https://github.com/tunga-io/tunga-web/blob/master/CONTRIBUTING.md

It's important to read if you want to contribute to this repo. 

Contributions that don't follow recommendations in our contribution guide may not be reviewed or accepted.

# Deployment

## Automated
Install [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) 

### Sandbox
1. Push changes to `develop` branch
2. Run the following commands
```
npm run deploy:sandbox
```
or
```
cd .ansible
ansible-playbook deploy.yml -i env/sandbox
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
