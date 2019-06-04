const logger = function ({url, method},res,next) {
  console.log(`${method} ${url}`);
  next();
}

const intializeMeterData = ({cookies,app},res,next) => {
  app.meterData = app.memberData[cookies.userName];
  next();
}

const indexHandler = (req,res,next) => {
  if(req.url==="/") res.location('/index.html')
  next();
}
module.exports = {
  logger,
  intializeMeterData,
  indexHandler
}
