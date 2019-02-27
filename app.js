const express = require('express');
const path = require('path');
const fs = require('fs');

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
app.initialize = function(fileName) {
  createFileIfNotExists(fileName);
  app.dataFileName = fileName;
  app.meterData = JSON.parse(fs.readFileSync(path.resolve(fileName),'utf-8'));
};

app.use(express.json());
app.use(lib.logger);
app.use(lib.indexHandler);
app.use(express.static('public'))
app.get('/members', getHandler.getMember)
app.post('/member', postHandler.createMember);
app.put('/count', putHandler.incrementTicks);
app.delete('/member', deleteHandler.deleteMember);
app.delete('/count', deleteHandler.clearTicks);

module.exports = app;
