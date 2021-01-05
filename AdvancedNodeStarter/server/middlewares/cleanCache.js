const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  // wait for request handler to finish
  // then call this middleware
  await next();
  clearHash(req.user.id);
};
