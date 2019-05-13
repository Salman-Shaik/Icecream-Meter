const {saveMeterData} = require('./utils.js');

const deleteMember = ({body,app}, res)=>{
  const memberName = body.memberName;
  delete app.meterData[memberName];
  saveMeterData(app);
  res.status(202).send('Member Deleted Successfully');
}

module.exports = {
  deleteMember
}
