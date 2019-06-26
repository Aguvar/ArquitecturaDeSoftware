const axios = require('axios')
const logger = require('pino')()

const AIRLINE_SERVICE_URL = 'http://localhost:3003/airlines'

class AirlinesService {
  async getAll () {
    try {
      const airlines = await axios.get(AIRLINE_SERVICE_URL)
      return airlines.data
    } catch (err) {
      logger.error('Airline service unavailable')
      return []
    }
  }
}

module.exports = AirlinesService
