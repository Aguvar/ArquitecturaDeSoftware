// const AirlineNotFoundError = require('./errors/airlineNotFound.error')
const Pipeline = require('./pipeline/pipeline');
const request = require('request')
const rp = require('request-promise')

class FlightsService {
    constructor({ flightsRepositoryService }) {
        this.flightsRepositoryService = flightsRepositoryService
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
            new Promise((resolve, reject) => {
                input.forEach((value, index, array) => {
                    rp(`http://localhost:3001/airlines/${value.AIRLINE}`)
                    .then(function (body) {
                        console.log(body);
                    })  
                        // request.get(
                        //     `http://localhost:3001/airlines/${value.AIRLINE}`,
                        //     {},
                        //     (err, response, body) => {
                        //         console.log(JSON.parse(body).name);
                        //         value.AIRLINE_NAME = JSON.parse(body).name
                        //         input[index] = value
                        //         console.log(1);

                        //     });
                })
                console.log(2);

                resolve(input)
            }).then((lot) => {
                console.log("Estoy Aca ++++++++++++");
                console.log(3);
                next(null, lot)
            })
        };
        var filterAirport = (input, next) => {
            request.get(
                `http://localhost:3001/airlines/${input.AIRLINE}`,
                {},
                (err, response, body) => {

                    input.AIRLINE_NAME = JSON.parse(body).name
                    next(null, input)
                });
        };

        // pipeline.use(filterMultiply);
        // pipeline.use(filterPrint);
        pipeline.use(filterAirline)

        pipeline.on('error', (err) => {
            console.log(`The error is ${err}`);
        });

        pipeline.on('end', (result) => {
            console.log(`The result is ${JSON.stringify(result[0])}`);
            console.log(`The Airline Name is ${JSON.stringify(result[0].AIRLINE_NAME)}`);
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
