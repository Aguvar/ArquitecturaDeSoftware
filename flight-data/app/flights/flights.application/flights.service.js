// const AirlineNotFoundError = require('./errors/airlineNotFound.error')
const Pipeline = require('./pipeline/pipeline');
const request = require('request')

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

    async broadcast(quantity) {
        //Obtener los vuelos
        let flights = await this.flightsRepositoryService.getFlights(quantity)

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
            request.get(
                `http://localhost:3001/airlines/${input.AIRLINE}`,
                {},
                (err, response, body) => {
                    console.log(JSON.parse(body).name);

                    input.AIRLINE_NAME = JSON.parse(body).name
                    next(null, input)
                });
        };
        var filterAirport = (input, next) => {
            request.get(
                `http://localhost:3001/airlines/${input.AIRLINE}`,
                {},
                (err, response, body) => {
                    console.log(JSON.parse(body).name);

                    input.AIRLINE_NAME = JSON.parse(body).name
                    next(null, input)
                });
        };

        var pipedAirlines = []

        // pipeline.use(filterMultiply);
        // pipeline.use(filterPrint);
        pipeline.use(filterAirline)

        pipeline.on('error', (err) => {
            console.log(`The error is ${err}`);
        });

        pipeline.on('end', (result) => {
            console.log(`The result is ${result.AIRLINE_NAME}`);
            pipedAirlines.push(result)
        });

        await flights.forEach(async (flight) => {
            pipeline.run(flight)
        })
        
        Promise.all(flights.map( (flight) => pipeline.run(flight))).then((results) => {
            console.log(results);
            
        })

        //Publicarlos
        console.log(pipedAirlines);

    }
}



module.exports = FlightsService
