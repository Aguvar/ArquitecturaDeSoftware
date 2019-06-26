const redis = require('redis')

const FIRST_ELEM_POSITION = 0
const LAST_ELEM_POSITION = -1

class Cache {
  constructor () {
    this.client = redis.createClient(process.env.REDIS_URL)
  }

  set (key, value) {
    this.client.set(key, value)
  }

  setWithExpiration (key, value, expirationInSeconds, callback) {
    this.client.set(key, value, 'EX', expirationInSeconds, callback)
  }

  setIfNotExists (key, value, callback) {
    this.client.set(key, value, 'NX', callback)
  }

  push (key, value, callback) {
    this.client.rpush(key, value, callback)
  }

  get (key, callback) {
    this.client.get(key, callback)
  }

  getList (key, callback) {
    this.client.lrange(key, FIRST_ELEM_POSITION, LAST_ELEM_POSITION, callback)
  }

  del (key, callback) {
    this.client.del(key, callback)
  }
}

module.exports = Cache
