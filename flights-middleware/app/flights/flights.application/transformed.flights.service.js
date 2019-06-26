const axios = require('axios')

const MAX_QUEUE_SIZE = 30
const TIMEOUT_IN_MS = 100

class TransformedFlightsService {
  constructor ({ cacheService, loggerService }) {
    this.cacheService = cacheService
    this.loggerService = loggerService
    this.maxQueueSize = MAX_QUEUE_SIZE
    this.timeout = TIMEOUT_IN_MS
    this.timeoutHandles = {}
  }

  async push (flight, subscriber) {
    const key = this.getKeyName(subscriber.id)
    const queueSize = await this.cacheService.push(key, JSON.stringify(flight))

    if (queueSize >= this.maxQueueSize) {
      this.send(subscriber)
    }
  }

  async send (subscriber) {
    const key = this.getKeyName(subscriber.id)
    const flights = await this.cacheService.getListValues(key)
    const jsonFlights = flights.map(flight => JSON.parse(flight))
    await this.cacheService.del(key)

    try {
      await axios.post(subscriber.uri, jsonFlights)
    } catch (err) {
      this.loggerService.logError(
        `Unavailable subscriber ${subscriber.airline} - ${subscriber.airlineDepartment}`
      )
    }
  }

  getKeyName (subscriberId) {
    return `subscriber_${subscriberId}`
  }
}

module.exports = TransformedFlightsService
