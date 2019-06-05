const {saveData} = require('./utils.js');

const deleteMember = ({body,app}, res)=>{
  const memberName = body.memberName;
  delete app.memberData[memberName];
  saveData(app);
  res.status(202).send('Member Deleted successfully');
}

module.exports = {
  deleteMember
}
