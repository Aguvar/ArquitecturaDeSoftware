const moment = require('moment')

class FlightsService {
  async validate (flight) {
    let receivedTimestamp = Date.now()
    flight.receivedTimestamp = receivedTimestamp
    let momentReceived = moment.unix(flight.receivedTimestamp)
    let momentSent = moment.unix(flight.sentTimestamp)

    let latency = momentReceived.diff(momentSent)

    console.log(`Latency: ${latency} ms`)
  }
}

module.exports = FlightsService
