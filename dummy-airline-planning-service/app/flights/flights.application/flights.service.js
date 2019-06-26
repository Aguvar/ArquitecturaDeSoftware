class FlightsService {
  async add (flights) {
    const currentTimestamp = Date.now()
    flights.forEach(flight => {
      console.log(`Latency is ${currentTimestamp - flight.sentTimestamp}`)
    })
  }
}

module.exports = FlightsService
