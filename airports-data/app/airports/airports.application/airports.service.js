class AirportsService {
  constructor ({ airportsRepositoryService }) {
    this.airportsRepositoryService = airportsRepositoryService
  }

  async getAll () {
    return this.airportsRepositoryService.getAll()
  }
}

module.exports = AirportsService
