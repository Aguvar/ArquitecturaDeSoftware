class CacheService {
  constructor ({ cache }) {
    this.cache = cache
  }

  async setIfNotExists (key, value) {
    this.cache.setIfNotExists(key, value)
  }

  async setWithExpiration (key, value, expirationInSeconds) {
    return new Promise((resolve, reject) => {
      this.cache.setWithExpiration(key, value, expirationInSeconds, (error, value) => {
        if (error) reject(error)
        resolve(error)
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
}

module.exports = CacheService
