const fs = require('fs')
const path = require('path')

const SUBSCRIBER_COLLECTION = 'susbcribers-flight-data'

class SubscribersRepositoryService {
  constructor ({ repo }) {
    this.repo = repo
  }

  async getAll () {
    const subscribers = await this.repo.collection(SUBSCRIBER_COLLECTION).find().toArray()
    subscribers.forEach(subscriber => {
      delete subscriber._id
      delete subscriber.id
    })
    return subscribers
  }

  async add (subscriber) {
    this.repo.collection(SUBSCRIBER_COLLECTION).insertOne(subscriber)
  }

  async readFile () {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscribers.repository.json')
      fs.readFile(file, (err, data) => {
        if (err) reject(err)
        resolve(JSON.parse(data))
      })
    })
  }

  async writeFile (subscribers) {
    return new Promise((resolve, reject) => {
      const file = path.join(__dirname, './subscribers.repository.json')
      fs.writeFile(file, JSON.stringify(subscribers, null, 2), (err) => {
        if (err) reject(err)
        resolve()
      })
    })
  }
}

module.exports = SubscribersRepositoryService
