const logger = function ({url, method},res,next) {
  console.log(`${method} ${url}`);
  next();
}

module.exports = {
  logger,
}
