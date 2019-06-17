const bull = require('bull')
const queue = new bull('mainQueue')

class FlightsService {
  constructor({ subscribersService, flightsRepositoryService }) {
    this.subscribersService = subscribersService
    this.flightsRepositoryService = flightsRepositoryService
  }

  async broadcast(quantity, offset) {
    const flights = await this.flightsRepositoryService.get(quantity, offset)

    flights.forEach(flight => queue.add(this.transformToExpectedFormat(flight)))

    return flights
  }

  transformToExpectedFormat(flight) {
    const departureTime = `${flight.DEPARTURE_TIME.slice(0, 2)}:${flight.DEPARTURE_TIME.slice(2, 4)}`
    const scheduledDepartureTime = `${flight.SCHEDULED_DEPARTURE.slice(0, 2)}:${flight.SCHEDULED_DEPARTURE.slice(2, 4)}`
    const arrivalTime = `${flight.ARRIVAL_TIME.slice(0, 2)}:${flight.ARRIVAL_TIME.slice(2, 4)}`
    const scheduledArrivalTime = `${flight.SCHEDULED_ARRIVAL.slice(0, 2)}:${flight.SCHEDULED_ARRIVAL.slice(2, 4)}`
    const departureDate = `${flight.YEAR}-${flight.MONTH}-${flight.DAY}T${departureTime}`
    const scheduledDepartureDate = `${flight.YEAR}-${flight.MONTH}-${flight.DAY}T${scheduledDepartureTime}`

    return ({
      airline: flight.AIRLINE,
      flightNumber: flight.FLIGHT_NUMBER,
      tailNumber: flight.TAIL_NUMBER,
      originAirport: flight.ORIGIN_AIRPORT,
      destinationAirport: flight.DESTINATION_AIRPORT,
      departureDate,
      scheduledDepartureDate,
      departureDelayInMinutes: flight.DEPARTURE_DELAY,
      taxiOutDurationInMinutes: flight.TAXI_OUT,
      wheelsOff: flight.WHEELS_OFF,
      scheduledFlightDurationInMinutes: flight.SCHEDULED_TIME,
      flightDurationInMinutes: flight.ELAPSED_TIME,
      airTimeInMinutes: flight.AIR_TIME,
      distance: flight.DISTANCE,
      wheelsOn: flight.WHEELS_ON,
      taxiInDurationInMinutes: flight.TAXI_IN,
      scheduledArrivalTime,
      arrivalTime,
      arrivalDelayInMinutes: flight.ARRIVAL_DELAY,
      diverted: Boolean(flight.DIVERTED),
      cancelled: Boolean(flight.CANCELLED),
      cancellationReason: flight.CANCELLATION_REASON,
      airSystemDelayInMinutes: flight.AIR_SYSTEM_DELAY,
      securityDelayInMinutes: flight.SECURITY_DELAY,
      lateAircraftDelayInMinutes: flight.LATE_AIRCRAFT_DELAY,
      weatherDelayInMinutes: flight.WEATHER_DELAY,
    })
  }
}

module.exports = FlightsService
