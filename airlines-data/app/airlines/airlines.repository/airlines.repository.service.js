const airlines = require('./airlines.json')

class AirlinesRepositoryService {
  getAll () {
    return airlines
  }
}

module.exports = AirlinesRepositoryService
