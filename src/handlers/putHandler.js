const {saveData} = require('./utils.js');
const incrementTicks = ({body,app},res) =>{
  const memberName = body.memberName;
  app.memberData[memberName]['actualCount']++;
  app.memberData[memberName]['totalCount']++;
  saveData(app);
  res.send('Updated Meter successfully');
}
const treatGiven = ({body,app},res)=>{
  const memberName = body.memberName;
  app.memberData[memberName]['actualCount']-=5;
  saveData(app);
  res.status(202).send('Updated Ticks');
}

module.exports = {
  incrementTicks,
  treatGiven
}
