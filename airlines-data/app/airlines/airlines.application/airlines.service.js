const AirlineNotFoundError = require('./errors/airlineNotFound.error')

class AirlinesService {
  constructor({ airlinesRepositoryService }) {
    this.airlinesRepositoryService = airlinesRepositoryService
  }

  async get(id) {
    const airline = await this.airlinesRepositoryService.get(id.toUpperCase())
    if (!airline) {
      throw new AirlineNotFoundError()
    }
    return airline
  }
}

module.exports = AirlinesService
