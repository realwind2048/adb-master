# adb-master
adb-master is a tool to help typing and execute adb commands in a easy way. It is built on Electron.

## Download app
check the releases https://github.com/realwind2048/adb-master/releases

## Prerequisite
- adb should be ready to use: adb-master is just a tool for typing and excute adb commands. It means adb-master use adb.
- connected devices which are turned developer mode on.

### How to use
- open up adb-master
- click `Get Devices`
- pick a device form `device list`

`Apk` tab: Install apk through drag and drop apk 
- drag and drop a apk file into `Install Apk` area
`Log` tab: Dump Logs as a file
- click `Select Log Path` to set a log path
- click `dump Log` to save logs as a file
- click `open log location ` to open a log path

### Hot to build
- clone repository: ```$ git clone repository```
- install dependencies: ```$ npm install```
- typescript compile: ```$ npm run build``` or ```$ npm run watch```
- launch debugging app: ```$ npm start```
- make app: ```$ npm run make```


## Contribute
anyone who is instrested in this project can contribute through pull requests.
