const AirportNotFoundError = require('./errors/airportNotFound.error')

class AirportsService {
  constructor({ airportsRepositoryService }) {
    this.airportsRepositoryService = airportsRepositoryService
  }

  async get(id) {
    const airport = await this.airportsRepositoryService.get(id.toUpperCase())
    if (!airport) {
      throw new AirportNotFoundError()
    }
    return airport
  }
}

module.exports = AirportsService
