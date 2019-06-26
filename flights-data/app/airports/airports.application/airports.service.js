const axios = require('axios')
const logger = require('pino')()

const AIRLINE_SERVICE_URL = 'http://localhost:3004/airports'

class AirportsService {
  async getAll () {
    try {
      const airports = await axios.get(AIRLINE_SERVICE_URL)
      return airports.data
    } catch (err) {
      console.log(err)
      logger.error('Airport service unavailable')
    }
  }
}

module.exports = AirportsService
