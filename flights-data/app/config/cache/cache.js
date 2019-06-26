const redis = require('redis')

class Cache {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }

  setIfNotExists (key, value) {
    this.client.set(key, value, 'NX')
  }

  setWithExpiration (key, value, expirationInSeconds, callback) {
    this.client.set(key, value, 'EX', expirationInSeconds, callback)
  }

  get (key, callback) {
    this.client.get(key, callback)
  }
}

module.exports = Cache
