const redis = require('redis')

class Cache {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }

  setWithExpiration (key, value, expirationInSeconds, callback) {
    this.client.set(key, value, 'EX', expirationInSeconds, callback)
  }

  get (key, callback) {
    this.client.get(key, callback)
  }
}

module.exports = Cache
