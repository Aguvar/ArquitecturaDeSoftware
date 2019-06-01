const fs = require('fs')
const path = require('path')

class SubscriptionsRepositoryService {
  async getAll() {
    return this.readFile()
  }

  async add(subscription) {
    const subscriptions = await this.readFile()
    subscriptions.push(subscription)
    await this.writeFile(subscriptions)
    return subscription;
  }

  async readFile() {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscriptions.json');
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }

  async writeFile(subscriptions) {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscriptions.json');
      fs.writeFile(file, JSON.stringify(subscriptions), (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = SubscriptionsRepositoryService
