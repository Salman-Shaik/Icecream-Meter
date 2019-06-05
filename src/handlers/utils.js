const fs = require('fs');

const saveData = ({
  meterData,
  memberDataFile,
  memberData,
  userDataFile,
  userData,
  userName}) => {
  meterData[userName]=memberData
  fs.writeFileSync(memberDataFile,JSON.stringify(meterData));
  fs.writeFileSync(userDataFile,JSON.stringify(userData));
}

module.exports = {
  saveData
}
