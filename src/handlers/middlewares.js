const logger = function ({url, method},res,next) {
  console.log(`${method} ${url}`);
  next();
}

const intializeMeterData = ({cookies,app},res,next) => {
  app.meterData = app.memberData[cookies.userName];
  next();
}

const isNotValidUser= userName => {
  if(userName) return false;
  return true;
}

const getFirstPage = ({url,cookies},res,next) => {
  const restrictedURLs=['/','/index.html']
  if(isNotValidUser(cookies.userName) && restrictedURLs.includes(url)){
    console.log("Hey");
    res.redirect('/login.html')
  }
  next();
}

module.exports = {
  logger,
  intializeMeterData,
  getFirstPage
}
