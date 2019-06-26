const airports = require('./airports.json')

class AirportsRepositoryService {
  getAll () {
    return airports
  }
}

module.exports = AirportsRepositoryService
