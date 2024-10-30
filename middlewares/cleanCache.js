const { clearCache } = require("../utils/redisClient");

module.exports = async (req, res, next) => {
  await next();

  clearCache(req.user.id);
};
