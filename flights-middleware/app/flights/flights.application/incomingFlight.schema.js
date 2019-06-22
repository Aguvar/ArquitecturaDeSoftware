const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  year: Joi.number().required(),
  month: Joi.number().required(),
  day: Joi.number().required(),
  dayOfWeek: Joi.number().required(),
  airline: Joi.string().required(),
  flightNumber: Joi.string().required(),
  tailNumber: Joi.string().required(),
  originAirport: Joi.string().required(),
  destinationAirport: Joi.string().required(),
  departureTime: Joi.string().required(),
  scheduledDepartureTime: Joi.string().required(),
  departureDelayInMinutes: Joi.number().required(),
  taxiOutDurationInMinutes: Joi.number().required(),
  wheelsOff: Joi.string().required(),
  durationInMinutes: Joi.number().required(),
  scheduledDurationInMinutes: Joi.number().required(),
  airTimeInMinutes: Joi.number().required(),
  distance: Joi.number().required(),
  wheelsOn: Joi.string().required(),
  taxiInDurationInMinutes: Joi.number().required(),
  arrivalTime: Joi.string().required(),
  scheduledArrivalTime: Joi.string().required(),
  arrivalDelayInMinutes: Joi.number().required(),
  diverted: Joi.string().required(),
  cancelled: Joi.string().required(),
  cancellationReason: Joi.string().allow('').required(),
  airSystemDelayInMinutes: Joi.number().required(),
  securityDelayInMinutes: Joi.number().required(),
  lateAircraftDelayInMinutes: Joi.number().required(),
  weatherDelayInMinutes: Joi.number().required(),
  sentTimestamp: Joi.number().required()
})

module.exports = schema
