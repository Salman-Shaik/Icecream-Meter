const {saveMeterData} = require('./utils.js');
const incrementTicks = ({body,app},res) =>{
  const memberName = body.memberName;
  app.meterData[memberName]++;
  saveMeterData(app);
  res.send('Updated Meter Successfully');
}


module.exports = {
  incrementTicks,
}
