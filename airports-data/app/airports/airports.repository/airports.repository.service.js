const airports = require('./airports.json')

class AirportsRepositoryService {
  async getAll () {
    return airports
  }
}

module.exports = AirportsRepositoryService
