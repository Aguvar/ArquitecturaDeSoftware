const csv = require('fast-csv')
const path = require('path')

const csvFilePath = path.join(__dirname, '/airports.csv')
const airportIdKey = 'IATA_CODE'
const airportNameKey = 'AIRPORT'

class AirportsRepositoryService {
  async getAirport (id) {
    return new Promise((resolve, reject) => {
      csv.fromPath(csvFilePath, { headers: true })
        .on('data', (airport) => {
          if (airport[airportIdKey] === id) {
            resolve({ id: airport[airportIdKey], name: airport[airportNameKey]})
          }
        })
        .on('end', () => resolve(null))
    })
  }

  async getAirports () {
    return new Promise((resolve, reject) => {
      const airports = []
      csv.fromPath(csvFilePath, { headers: true })
        .on('data', (airport) => {
          airports.push({ id: airport[airportIdKey], name: airport[airportNameKey]})
        })
        .on('end', () => resolve(airports))
    })
  }
}

module.exports = AirportsRepositoryService
