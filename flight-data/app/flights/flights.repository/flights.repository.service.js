const csv = require('fast-csv')
const path = require('path')

const csvFilePath = path.join(__dirname, '/flights.csv')

class FlightsRepositoryService {
    //   async getAirline (id) {
    //     return new Promise((resolve, reject) => {
    //       csv.fromPath(csvFilePath, { headers: true })
    //         .on('data', (airline) => {
    //           if (airline[airlineIdKey] === id) {
    //             resolve({ id: airline[airlineIdKey], name: airline[airlineNameKey]})
    //           }
    //         })
    //         .on('end', () => resolve(null))
    //     })
    //   }



    async getFlights(quantity) {
        return new Promise((resolve, reject) => {
            const airlines = []
            var counter = 0
            csv.fromPath(csvFilePath, { headers: true })
                .on('data', (flight) => {
                    //   flights.push({ id: flight[flightIdKey], name: flight[flightNameKey]})
                    console.log(quantity)
                    console.log(counter)
                    counter = counter + 1
                    if (counter == quantity) {
                        csv.close()
                    }
                })
                .on('end', () => resolve(flights))
        })
    }
}

module.exports = FlightsRepositoryService
