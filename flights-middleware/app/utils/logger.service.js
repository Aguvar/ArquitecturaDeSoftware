const logger = require('pino')()

class LoggerService {
  log (message) {
    logger.info(message)
  }

  logError (message) {
    logger.error(message)
  }
}

module.exports = LoggerService
