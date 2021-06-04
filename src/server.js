const app = require('express')();
const express = require('express');
const { ValidationError } = require('express-validation');
const users = require('./routes/users');
const contracts = require('./routes/contracts');
const Path = require('path');
const fs = require('fs')

const API_PORT = process.env.API_PORT || 3000;


function createRoutes(baseDir, currDir, dirList) {

  console.log('currDir', currDir);
  const readDirMain = fs.readdirSync(currDir);
    
  console.log(readDirMain);
    
  readDirMain.forEach((dirNext) => {
    const dirName = currDir + "/" + dirNext;
    console.log(dirNext, fs.lstatSync(currDir).isDirectory());
    if (fs.lstatSync(dirName).isDirectory()) {
      console.log('dirNAme', dirNext);
      const routeStuff = {routeName:dirName.split(baseDir)[1],dirPath:dirName};
      dirList.push(routeStuff);
      const route = require(routeStuff.dirPath);
      console.log('/api'+ routeStuff.routeName,route);
      app.use('/api'+ routeStuff.routeName,route);

      createRoutes(baseDir, dirName, dirList);
    } 
  });  
}

let dirList = [];
const baseDir = Path.join(__dirname, 'routes');
createRoutes(baseDir, baseDir, dirList);

console.log('dirList',dirList);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));


