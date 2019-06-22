const axios = require('axios')

const MAX_QUEUE_SIZE = 3
const TIMEOUT_IN_MS = 100

class SubscribersQueuesService {
  constructor ({ cacheService, loggerService }) {
    this.cacheService = cacheService
    this.loggerService = loggerService
    this.maxQueueSize = MAX_QUEUE_SIZE
    this.timeout = TIMEOUT_IN_MS
    this.timeoutHandles = {}
    this.pepe = 2
  }

  async push (subscriber, message) {
    const key = this.getKeyName(subscriber.id)
    const queueSize = await this.cacheService.push(key, message)

    if (queueSize >= this.maxQueueSize) {
      console.log(queueSize, this.maxQueueSize)
      this.send(subscriber)
    }
  }

  async send (subscriber) {
    const key = this.getKeyName(subscriber.id)
    const flights = await this.cacheService.getListValues(key)
    await this.cacheService.del(key)

    try {
      const sendResponse = await axios.post(subscriber.uri, flights)
      console.log(sendResponse)
    } catch (err) {
      this.loggerService.logError(`Unavailable subscriber ${subscriber.airlineId} - ${subscriber.airlineDepartment}`)
    }
  }

  getKeyName (subscriberId) {
    return `subscriber_${subscriberId}`
  }
}

module.exports = SubscribersQueuesService
