const {saveData} = require('./utils.js');

const createMember = ({body,app},res)=>{
  const memberName = body.memberName;
  app.memberData[memberName] = {};
  app.memberData[memberName]['actualCount'] = 0;
  app.memberData[memberName]['totalCount'] = 0;
  saveData(app);
  res.status(201).send('Member Created successfully');
};

const register = ({body,app},res) => {
  const userName = body.userName;
  const password = body.password;
  if(app.userData[userName]){
    res.status(400).send('Bad Request: User Already Exists');
    return;
  }
  app.userData[userName]={}
  app.userData[userName].userName=userName;
  app.userData[userName].password=password;
  console.log(app);
  saveData(app);
  res.status(201).send('Registration successful');
}

const login = ({body,app},res) => {
    const userName = body.userName;
    const password = body.password;
    const userData = app.userData[userName];
    if(userData) {
      if(userData.password==password){
        res.cookie('userName',userName);
        res.status(200).send('Login successful');
        return;
      }
      res.status(400).send('Bad Request: Invalid Password');
      return;
    }
    res.status(400).send("Bad Request: Username Doesn't exist");
}

module.exports = {
  createMember,
  login,
  register,
}
