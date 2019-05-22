const AirportNotFoundError = require('./errors/airportNotFound.error')

class AirportsService {
  constructor ({ airportsRepositoryService }) {
    this.airportsRepositoryService = airportsRepositoryService
  }

  async getAirport (id) {
    const airport = await this.airportsRepositoryService.getAirport(id.toUpperCase())
    if (!airport) {
      throw new AirportNotFoundError()
    }
    return airport
  }
}

module.exports = AirportsService
