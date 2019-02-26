const fs = require('fs');

const saveMeterData = ({dataFileName,meterData}) => {
  fs.writeFileSync(dataFileName,JSON.stringify(meterData));
}

module.exports = {
  saveMeterData
}
