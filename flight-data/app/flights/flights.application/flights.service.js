// const AirlineNotFoundError = require('./errors/airlineNotFound.error')
const Pipeline = require('./pipeline/pipeline');
const request = require('request')

class FlightsService {
    constructor({ flightsRepositoryService, subscriptionsRepositoryService }) {
        this.flightsRepositoryService = flightsRepositoryService
        this.subscriptionsRepositoryService = subscriptionsRepositoryService
    }

    async getAirline(id) {
        const airline = await this.flightsRepositoryService.getAirline(id.toUpperCase())
        if (!airline) {
            throw new AirlineNotFoundError()
        }
        return airline
    }

    async getAirlines() {
        const airlines = await this.flightsRepositoryService.getAirlines()
        return airlines
    }

    async broadcast(quantity, size, offset) {
        //Obtener los vuelos
        let flights = await this.flightsRepositoryService.getFlights(quantity * size, offset)

        //Preparar los lotes
        let lots = []
        let lot_buffer = []

        flights.forEach((value, index, array) => {
            lot_buffer.push(value)
            if (lot_buffer.length == size) {
                lots.push(lot_buffer)
                lot_buffer = []
            }
        })
        if (lot_buffer.length != 0) {
            lots.push(lot_buffer)
        }

        // console.log(lots);


        //Juntarlos con los datos de aeropuertos y aerolineas
        var pipeline = new Pipeline();

        // var filterMultiply = (input, next) => {
        //     let result = input * input;
        //     next(null, result);
        // };
        // var filterPrint = (input, next) => {
        //     console.log(`Result from filter is ${input}`);
        //     next(null, input);
        // };
        //Mover estas cosas a sus propias carpetas
        var filterAirline = (input, next) => {
            let promises = []
            input.forEach((value, index, array) => {
                promises.push(new Promise((resolve, reject) => {
                    request.get(
                        `http://localhost:3003/airlines/${value.AIRLINE}`,
                        {},
                        (err, response, body) => {
                            console.log(JSON.parse(body).name);
                            value.AIRLINE_NAME = JSON.parse(body).name
                            array[index] = value
                            resolve()
                        });
                }))
            })
            Promise.all(promises).then(() => {
                next(null, input)
            })
        };
        var filterAirport = (input, next) => {
            let promises = []
            input.forEach((value, index, array) => {
                promises.push(new Promise((resolve, reject) => {
                    request.get(
                        `http://localhost:3004/airports/${value.DESTINATION_AIRPORT}`,
                        {},
                        (err, response, body) => {
                            console.log(JSON.parse(body).name);
                            value.DESTINATION_AIRPORT_NAME = JSON.parse(body).name
                            array[index] = value
                            resolve()
                        });

                }))
            })
            Promise.all(promises).then(() => {
                next(null, input)
            })
        };

        // pipeline.use(filterMultiply);
        // pipeline.use(filterPrint);
        pipeline.use(filterAirline)
        pipeline.use(filterAirport)

        pipeline.on('error', (err) => {
            console.log(`The error is ${err}`);
        });

        pipeline.on('end', (lot) => {
            // console.log(`The result of the pipeline is ${JSON.stringify(result[0])}`);
            // console.log(`The Airline Name is ${JSON.stringify(result[0].AIRLINE_NAME)}`);
            this.subscriptionsRepositoryService.readSubscriptionsFile().then((subscriptions) => {
                subscriptions.forEach((value, index, array) => {
                    console.log(`Publishing to ${value.uri}`);
                    request.post(value.uri,
                        {
                            body: JSON.stringify(lot)
                        },
                        (err, response) => {
                            if (err) {
                                console.log(`Error publishing to ${value.uri}, returned ${err}`);
                                
                            }else{
                                console.log(`Published to ${value.uri}, returned ${response}`);

                            }
                        }

                    )
                })
            })
            //Broadcast
        });


        lots.forEach((lot) => {
            pipeline.run(lot)
        })

        // Promise.all(flights.map( (flight) => pipeline.run(flight))).then((results) => {
        //     console.log(results);

        // })

        //Publicarlos

    }
}



module.exports = FlightsService
