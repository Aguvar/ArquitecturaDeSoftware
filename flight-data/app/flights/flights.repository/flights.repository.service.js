const csv = require('fast-csv')
const path = require('path')
const papa = require('papaparse')
const fs = require('fs')

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



    // async getFlightss(quantity) {
    //     return new Promise((resolve, reject) => {
    //         const airlines = []
    //         var counter = 0
    //         csv.fromPath(csvFilePath, { headers: true })
    //             .on('data', (flight) => {
    //                 //   flights.push({ id: flight[flightIdKey], name: flight[flightNameKey]})
    //                 console.log(quantity)
    //                 console.log(counter)
    //                 counter = counter + 1
    //                 if (counter == quantity) {
    //                     csv.close()
    //                 }
    //             })
    //             .on('end', () => resolve(flights))
    //     })
    // }

    async getFlights(quantity) {
        return new Promise((resolve, reject) => {
            var counter = 0
            var flights = []
            papa.parse(fs.createReadStream(csvFilePath),
                {
                    step: (results, parser) => {
                        flights.push(results.data[0])
                        counter = counter + 1
                        if (counter == quantity) {
                            parser.abort()
                        }
                    }, complete: (results, file) => {
                        resolve(flights)
                    }, header: true
                })
        })
    }

}

module.exports = FlightsRepositoryService
