class CacheService {
  constructor ({ cache }) {
    this.cache = cache
  }

  async setIfNotExists (key, value) {
    return new Promise((resolve, reject) => {
      this.cache.setIfNotExists(key, value, (error, value) => {
        if (error) reject(error)
        resolve(error)
      })
    })
  }

  async setWithExpiration (key, value, expirationInSeconds) {
    return new Promise((resolve, reject) => {
      this.cache.setWithExpiration(key, value, expirationInSeconds, (error, value) => {
        if (error) reject(error)
        resolve(error)
      })
    })
  }

  async push (key, value) {
    return new Promise((resolve, reject) => {
      this.cache.push(key, value, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async getValue (key) {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async getListValues (key) {
    return new Promise((resolve, reject) => {
      this.cache.getList(key, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async getKeys (pattern) {
    return new Promise((resolve, reject) => {
      this.cache.keys(pattern, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async del (key) {
    return new Promise((resolve, reject) => {
      this.cache.del(key, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }
}

module.exports = CacheService
