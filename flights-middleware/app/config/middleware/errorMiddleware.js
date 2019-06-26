const logger = require('pino')()
const InvalidPayloadError = require('../../errors/invalidPayload.error')

module.exports = function errorMiddleware (err, req, res, next) {
  if (err instanceof InvalidPayloadError) {
    logger.error(err.message)
    res.status(400).send({ message: err.message })
  }
  if (err) {
    logger.error(err.message)
  }
  next()
}
