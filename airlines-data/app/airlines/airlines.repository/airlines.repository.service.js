const airlineDataFilePath = `${__dirname}/airlines.txt`
const keyPrefix = 'airline_'
const delimiterCharacter = '_'

class AirlinesRepositoryService {
  constructor({ cacheService }) {
    this.cacheService = cacheService
  }

  async getAirline(id) {
    return this.cacheService.getValue(`${keyPrefix}${id}`);
  }

  async seedData() {
    const lineReader = require('readline').createInterface({
      input: require('fs').createReadStream(airlineDataFilePath)
    });

    lineReader.on('line', (line) => {
      const [key, value] = line.split(delimiterCharacter)
      this.cacheService.setIfNotExists(`${keyPrefix}${key}`, value)
    });
  }
}

module.exports = AirlinesRepositoryService
