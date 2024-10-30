const mongoose = require("mongoose");
const client = require("./redisClient");

const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.useCache = true;
  this.hashKey = JSON.stringify(options.key || "");
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(
    Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name })
  );

  // Retrieve cached value
  const cacheValue = await client.hGet(this.hashKey, key);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);
    return Array.isArray(doc) ? doc.map((d) => this.model(d)) : new this.model(doc);
  }

  // Execute query and store in cache
  const result = await exec.apply(this, arguments);
  client.hSet(this.hashKey, key, JSON.stringify(result), "EX", 600);
  return result;
};

module.exports.clearCache = (hashKey) => {
  client.del(JSON.stringify(hashKey));
};
