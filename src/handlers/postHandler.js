const createMember = ({body,app},res)=>{
  const memberName = body.memberName;
  app.meterData[memberName] = 0;
  res.status(201).send('Member Created Succesfully');
};

module.exports = {
  createMember,
}
