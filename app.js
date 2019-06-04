const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const lib = require(path.resolve('src/handlers/middlewares'));
const getHandler = require(path.resolve('src/handlers/getHandler'));
const postHandler = require(path.resolve('src/handlers/postHandler'));
const putHandler = require(path.resolve('src/handlers/putHandler'));
const deleteHandler = require(path.resolve('src/handlers/deleteHandler'));

const createFileIfNotExists = fileName =>{
  if(!fs.existsSync(fileName)){
    fs.appendFileSync(fileName, JSON.stringify({}));
  }
}

const app = express();
app.initialize = function(memberDataFile,userDataFile) {
  createFileIfNotExists(memberDataFile);
  createFileIfNotExists(userDataFile);
  app.memberDataFile = path.resolve(memberDataFile);
  app.userDataFile = path.resolve(userDataFile);
  app.memberData = JSON.parse(fs.readFileSync(app.memberDataFile,'utf-8'));
  app.userData = JSON.parse(fs.readFileSync(app.userDataFile,'utf-8'));
};

app.use(express.json());
app.use(cookieParser());
app.use(lib.getFirstPage);
app.use(lib.logger);
app.use(lib.intializeMeterData);
app.use(express.static('public'));
app.get('/members', getHandler.getMember);
app.post('/member', postHandler.createMember);
app.post('/login', postHandler.login);
app.put('/count', putHandler.incrementTicks);
app.put('/treat', putHandler.treatGiven);
app.delete('/member', deleteHandler.deleteMember);

module.exports = app;
