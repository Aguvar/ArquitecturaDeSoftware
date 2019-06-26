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
}

module.exports = SubscribersRepositoryService
