const InvalidPayloadError = require('../errors/invalidPayload.error')

module.exports = async function errorMiddleware(error, req, res, next) {
  if (error instanceof InvalidPayloadError) {
    console.log(error.message)
    res.status(400).send({ message: error.message })
  }
  next()
}
