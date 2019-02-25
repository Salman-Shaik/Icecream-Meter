const express = require('express');
const path = require('path');
const lib = require(path.resolve('src/handlers/middlewares'));
const getHandler = require(path.resolve('src/handlers/getHandler'));
const postHandler = require(path.resolve('src/handlers/postHandler'));
const putHandler = require(path.resolve('src/handlers/putHandler'));
const deleteHandler = require(path.resolve('src/handlers/deleteHandler'));

const app = express();
app.initialize = function(meterData){
  app.meterData = meterData;
};

app.use(express.json());
app.use(lib.logger);
app.use(express.static('public'))
app.get('/members', getHandler.getMember)
app.get('/tick', getHandler.getTicks);
app.post('/member', postHandler.createMember);
app.put('/tick', putHandler.incrementTicks);
app.delete('/member', deleteHandler.deleteMember);
app.delete('/tick', deleteHandler.clearTicks);

module.exports = app;
