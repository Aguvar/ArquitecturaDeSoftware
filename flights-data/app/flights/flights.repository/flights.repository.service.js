const papa = require('papaparse')
const path = require('path')
const fs = require('fs')

const csvFilePath = path.join(__dirname, '/flights.csv')

class FlightsRepositoryService {
  async get(quantity, offset) {
    return new Promise((resolve, reject) => {
      let flights = []
      let addedFlightsCounter = 0

      papa.parse(
        fs.createReadStream(csvFilePath),
        {
          step: (results, parser) => {
            if (addedFlightsCounter >= offset) {
              flights.push(results.data[0])
            }
            addedFlightsCounter++
            if (flights.length >= quantity) {
              parser.abort()
            }
          },
          complete: () => resolve(flights),
          header: true
        })
    })
  }
}

module.exports = FlightsRepositoryService
