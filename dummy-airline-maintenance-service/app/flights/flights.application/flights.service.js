const moment = require('moment')

class FlightsService {
  async validate (flight) {
    let receivedDate = Date.now()
    flight.receivedDate = receivedDate
    // Log time between flight sent and arrived
    let momentReceived = moment.unix(flight.receivedDate)
    let momentSent = moment.unix(flight.sentDate)

    let latency = momentReceived.diff(momentSent)

    console.log(`Latency: ${latency} ms`)
  }
}

module.exports = FlightsService
