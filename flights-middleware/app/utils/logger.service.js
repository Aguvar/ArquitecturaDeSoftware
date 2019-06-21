const logger = require('pino')()

class LoggerService {
  log (message) {
    logger.info(message)
  }
}

module.exports = LoggerService
