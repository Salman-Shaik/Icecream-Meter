const {saveMeterData} = require('./utils.js');

const createMember = ({body,app},res)=>{
  const memberName = body.memberName;
  app.meterData[memberName] = {};
  app.meterData[memberName]['actualCount'] = 0;
  app.meterData[memberName]['totalCount'] = 0;
  saveMeterData(app);
  res.status(201).send('Member Created successfully');
};

const login = ({body,app},res) => {
    const userName = body.userName;
    const password = body.password;
    const userData = app.userData[userName];
    if(userData) {
      if(userData.password==password){
        res.status(200).send('Login successful');
        return;
      }
      res.status(400).send('Invalid Password');
      return;
    }
    res.status(400).send("Username Doesn't exist");
}

module.exports = {
  createMember,
  login,
}
