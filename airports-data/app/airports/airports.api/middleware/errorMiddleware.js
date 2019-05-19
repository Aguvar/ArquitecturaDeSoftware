const AirportNotFoundError = require('../../airports.application/errors/airportNotFound.error')

module.exports = async function errorMiddleware (error, req, res, next) {
  if (error instanceof AirportNotFoundError) {
    res.status(404).send()
  }
  next()
}
