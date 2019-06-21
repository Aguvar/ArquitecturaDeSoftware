const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  airline: Joi.string().required(),
  flightNumber: Joi.string().required(),
  tailNumber: Joi.string().required(),
  originAirport: Joi.string().required(),
  destinationAirport: Joi.string().required(),
  departureDate: Joi.string().required(),
  scheduledDepartureDate: Joi.string().required(),
  departureDelayInMinutes: Joi.string().required(),
  taxiOutDurationInMinutes: Joi.string().required(),
  wheelsOff: Joi.string().required(),
  scheduledFlightDurationInMinutes: Joi.string().required(),
  flightDurationInMinutes: Joi.string().required(),
  airTimeInMinutes: Joi.string().required(),
  distance: Joi.string().required(),
  wheelsOn: Joi.string().required(),
  taxiInDurationInMinutes: Joi.string().required(),
  scheduledArrivalTime: Joi.string().required(),
  arrivalTime: Joi.string().required(),
  arrivalDelayInMinutes: Joi.string().required(),
  diverted: Joi.string().required(),
  cancelled: Joi.string().required(),
  cancellationReason: Joi.string().required(),
  airSystemDelayInMinutes: Joi.string().required(),
  securityDelayInMinutes: Joi.string().required(),
  lateAircraftDelayInMinutes: Joi.string().required(),
  weatherDelayInMinutes: Joi.string().required()
})

module.exports = schema
