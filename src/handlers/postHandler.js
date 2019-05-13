const {saveMeterData} = require('./utils.js');

const createMember = ({body,app},res)=>{
  const memberName = body.memberName;
  app.meterData[memberName] = {};
  app.meterData[memberName]['actualCount'] = 0;
  app.meterData[memberName]['totalCount'] = 0;
  saveMeterData(app);
  res.status(201).send('Member Created Succesfully');
};

module.exports = {
  createMember,
}
