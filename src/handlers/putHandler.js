const {saveMeterData} = require('./utils.js');
const incrementTicks = ({body,app},res) =>{
  const memberName = body.memberName;
  app.meterData[memberName]['actualCount']++;
  app.meterData[memberName]['totalCount']++;
  saveMeterData(app);
  res.send('Updated Meter successfully');
}
const treatGiven = ({body,app},res)=>{
  const memberName = body.memberName;
  app.meterData[memberName]['actualCount']-=5;
  saveMeterData(app);
  res.status(202).send('Updated Ticks');
}

module.exports = {
  incrementTicks,
  treatGiven
}
