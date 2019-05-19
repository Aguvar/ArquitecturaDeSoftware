const csv = require('fast-csv')
const path = require('path')

const csvFilePath = path.join(__dirname, '/airlines.csv')
const airlineIdKey = 'IATA_CODE'
const airlineNameKey = 'AIRLINE'

class AirlinesRepositoryService {
  async getAirline (id) {
    return new Promise((resolve, reject) => {
      csv.fromPath(csvFilePath, { headers: true })
        .on('data', (airline) => {
          if (airline[airlineIdKey] === id) {
            resolve({ id: airline[airlineIdKey], name: airline[airlineNameKey]})
          }
        })
        .on('end', () => resolve(null))
    })
  }

  async getAirlines () {
    return new Promise((resolve, reject) => {
      const airlines = []
      csv.fromPath(csvFilePath, { headers: true })
        .on('data', (airline) => {
          airlines.push({ id: airline[airlineIdKey], name: airline[airlineNameKey]})
        })
        .on('end', () => resolve(airlines))
    })
  }
}

module.exports = AirlinesRepositoryService
