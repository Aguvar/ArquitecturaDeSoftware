const path = require('path')

const airportsDataFilePath = path.join(__dirname, '/airports.txt')
const keyPrefix = 'airport_'
const delimiterCharacter = '_'

class AirportsRepositoryService {
  constructor({ cacheService }) {
    this.cacheService = cacheService
  }

  async get(id) {
    return this.cacheService.getValue(`${keyPrefix}${id}`);
  }

  async seedData() {
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(airportsDataFilePath)
    });

    lineReader.on('line', (line) => {
      const [key, value] = line.split(delimiterCharacter)
      this.cacheService.setIfNotExists(`${keyPrefix}${key}`, value)
    });
  }
}

module.exports = AirportsRepositoryService
