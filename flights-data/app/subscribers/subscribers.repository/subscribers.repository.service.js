const fs = require('fs')
const path = require('path')

class SubscribersRepositoryService {
  async getAll() {
    return this.readFile()
  }

  async add(subscriber) {
    const subscribers = await this.readFile()
    subscribers.push(subscriber)
    await this.writeFile(subscribers)
    return subscriber;
  }

  async readFile() {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscribers.repository.json');
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }

  async writeFile(subscribers) {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscribers.repository.json');
      fs.writeFile(file, JSON.stringify(subscribers, null, 2), (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = SubscribersRepositoryService
