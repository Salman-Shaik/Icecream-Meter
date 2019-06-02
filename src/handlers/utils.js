const fs = require('fs');

const saveMeterData = ({memberDataFile,meterData}) => {
  fs.writeFileSync(memberDataFile,JSON.stringify(meterData));
}

module.exports = {
  saveMeterData
}
