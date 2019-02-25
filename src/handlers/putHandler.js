const incrementTicks = ({body,app},res) =>{
  const memberName = body.memberName;
  app.meterData[memberName]++;
  res.send('Updated Meter Successfully');
}


module.exports = {
  incrementTicks,
}
