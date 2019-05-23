// const AirlineNotFoundError = require('./errors/airlineNotFound.error')

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
        let flight = await this.flightsRepositoryService.getFlights(quantity)
        console.log(flights)
        //Juntarlos con los datos de aeropuertos y aerolineas
        //Publicarlos
    }
}



module.exports = FlightsService
