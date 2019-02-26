const logger = function ({url, method},res,next) {
  console.log(`${method} ${url}`);
  next();
}
const indexHandler = (req,res,next) => {
  if(req.url==="/") res.location('/index.html')
  next();
}
module.exports = {
  logger,
  indexHandler
}
