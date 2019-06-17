const Joi = require('@hapi/joi')

class FlightsDomainService {
  isValid(flight) {
    const { error: validationError } = Joi.validate(flight, flightSchema)
    return validationError !== null
  }
}

module.exports = FlightsDomainService
