const papa = require('papaparse')
const path = require('path')
const fs = require('fs')

const csvFilePath = path.join(__dirname, '/flights.csv')

class FlightsRepositoryService {
  async read (quantity, chunkSize, offset, callback) {
    let flights = []
    let readFlights = 0

    papa.parse(
      fs.createReadStream(csvFilePath),
      {
        step: (results, parser) => {
          if (readFlights >= offset) {
            flights.push(results.data[0])
          }
          readFlights++
          if (flights.length >= chunkSize) {
            callback(flights)
            flights = []
          }
          if (readFlights - offset >= quantity) {
            parser.abort()
          }
        },
        complete: () => {},
        header: true,
        dynamicTyping: true
      })
  }
}

module.exports = FlightsRepositoryService
