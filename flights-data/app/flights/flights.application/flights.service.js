const axios = require('axios')
const logger = require('pino')()
let self

class FlightsService {
  constructor ({ subscribersService, flightsRepositoryService }) {
    this.subscribersService = subscribersService
    this.flightsRepositoryService = flightsRepositoryService
    self = this
  }

  async publish (quantity, offset, chunkSize) {
    this.flightsRepositoryService.read(quantity, chunkSize, offset, self.sendChunk)
  }

  async sendChunk (flights) {
    try {
      const subscribers = await self.subscribersService.getAll()
      const transformedFlights = self.toExpectedFormat(flights)
      await Promise.all(subscribers.map(
        subscriber => axios.post(subscriber.uri, { flights: transformedFlights })
      ))
    } catch (err) {
      logger.error(err.message, console.trace())
    }
  }

  toExpectedFormat (flights) {
    const currentTimestamp = Date.now()

    return flights.map(flight => ({
      year: flight.YEAR,
      month: flight.MONTH,
      day: flight.DAY,
      dayOfWeek: flight.DAY_OF_WEEK,
      airline: flight.AIRLINE,
      flightNumber: flight.FLIGHT_NUMBER,
      tailNumber: flight.TAIL_NUMBER,
      originAirport: flight.ORIGIN_AIRPORT,
      destinationAirport: flight.DESTINATION_AIRPORT,
      departureTime: flight.DEPARTURE_TIME,
      scheduledDepartureTime: flight.SCHEDULED_DEPARTURE,
      departureDelayInMinutes: flight.DEPARTURE_DELAY,
      taxiOutDurationInMinutes: flight.TAXI_OUT,
      wheelsOff: flight.WHEELS_OFF,
      durationInMinutes: flight.ELAPSED_TIME,
      scheduledDurationInMinutes: flight.SCHEDULED_TIME,
      airTimeInMinutes: flight.AIR_TIME,
      distance: flight.DISTANCE,
      wheelsOn: flight.WHEELS_ON,
      taxiInDurationInMinutes: flight.TAXI_IN,
      arrivalTime: flight.ARRIVAL_TIME,
      scheduledArrivalTime: flight.SCHEDULED_ARRIVAL,
      arrivalDelayInMinutes: flight.ARRIVAL_DELAY,
      diverted: flight.DIVERTED,
      cancelled: flight.CANCELLED,
      cancellationReason: flight.CANCELLATION_REASON || '',
      airSystemDelayInMinutes: flight.AIR_SYSTEM_DELAY || 0,
      securityDelayInMinutes: flight.SECURITY_DELAY || 0,
      lateAircraftDelayInMinutes: flight.LATE_AIRCRAFT_DELAY || 0,
      weatherDelayInMinutes: flight.WEATHER_DELAY || 0,
      sentTimestamp: currentTimestamp
    }))
  }
}

module.exports = FlightsService
