const deleteMember = ({body,app}, res)=>{
  const memberName = body.memberName;
  delete app.meterData[memberName];
  res.status(202).send('Member Deleted Successfully');
}

const clearTicks = ({body,app},res)=>{
  const memberName = body.memberName;
  app.meterData[memberName] = 0;
  res.status(202).send('Cleared Ticks Successfully');
}

module.exports = {
  deleteMember,
  clearTicks,
}