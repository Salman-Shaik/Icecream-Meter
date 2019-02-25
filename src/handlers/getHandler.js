const getMember = ({app},res) => res.json(app.meterData);

const getTicks = ({query,app},res)=>{
  const memberName = query.memberName;
  res.json(app.meterData[memberName]);
}

module.exports = {
  getMember,
  getTicks,
}
