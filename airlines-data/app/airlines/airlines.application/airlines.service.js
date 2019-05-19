const AirlineNotFoundError = require('./errors/airlineNotFound.error')

class AirlinesService {
  constructor ({ airlinesRepositoryService }) {
    this.airlinesRepositoryService = airlinesRepositoryService
  }

  async getAirline (id) {
    const airline = await this.airlinesRepositoryService.getAirline(id.toUpperCase())
    if (!airline) {
      throw new AirlineNotFoundError()
    }
    return airline
  }

  async getAirlines () {
    const airlines = await this.airlinesRepositoryService.getAirlines()
    return airlines
  }
}

module.exports = AirlinesService
