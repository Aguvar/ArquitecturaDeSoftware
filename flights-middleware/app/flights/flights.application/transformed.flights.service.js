const axios = require('axios')
const jsonxml = require('jsontoxml')

const MAX_QUEUE_SIZE = 30
const FILE_FORMAT = {
  JSON: 'JSON',
  XML: 'XML'
}

class TransformedFlightsService {
  constructor ({ cacheService, loggerService }) {
    this.cacheService = cacheService
    this.loggerService = loggerService
    this.maxQueueSize = MAX_QUEUE_SIZE
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

    switch (subscriber.fileFormat) {
      case FILE_FORMAT.JSON:
        await this.sendAsJson(jsonFlights, subscriber)
        break
      case FILE_FORMAT.XML:
        await this.sendAsXml(jsonFlights, subscriber)
        break
    }
  }

  async sendAsXml (flights, subscriber) {
    try {
      const config = { headers: { 'Content-Type': 'text/xml' } }
      const xml = jsonxml({
        flights: flights.map(flight => ({ name: 'flight', children: flight }))
      })
      await axios.post(subscriber.uri, xml, config)
    } catch (err) {
      this.loggerService.logError(
        `Unavailable subscriber ${subscriber.airline} - ${subscriber.airlineDepartment}`
      )
    }
  }

  async sendAsJson (flights, subscriber) {
    try {
      await axios.post(subscriber.uri, flights)
    } catch (err) {
      console.log(err.message)
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
