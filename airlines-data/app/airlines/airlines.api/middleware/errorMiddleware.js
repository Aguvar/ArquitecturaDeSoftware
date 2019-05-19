const AirlineNotFoundError = require('../../airlines.application/errors/airlineNotFound.error')

module.exports = async function errorMiddleware (error, req, res, next) {
  if (error instanceof AirlineNotFoundError) {
    res.status(404).send()
  }
  next()
}
