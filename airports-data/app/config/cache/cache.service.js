class CacheService {
  constructor({ cache }) {
    this.cache = cache
  }

  async setIfNotExists(key, value) {
    this.cache.setIfNotExists(key, value)
  }

  async getValue(key) {
    return new Promise((resolve, reject) => {
      this.cache.get(key, (error, value) => {
        if (error) reject(error)
        resolve(value)
      })
    })
  }

  async getKeys(pattern) {
    return new Promise((resolve, reject) => {
      this.cache.keys(pattern, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  }
}

module.exports = CacheService
