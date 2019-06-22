const Bull = require('bull')

class FlightsService {
  constructor ({ subscribersService, flightsRepositoryService }) {
    this.subscribersService = subscribersService
    this.flightsRepositoryService = flightsRepositoryService
  }

  async publish (quantity, offset) {
    const queue = new Bull('incomingFlightsQueue')
    const flights = await this.flightsRepositoryService.get(quantity, offset)

    flights.forEach(flight => queue.add(this.toExpectedFormat(flight)))

    return flights
  }

  toExpectedFormat (flight) {
    return ({
      year: Number(flight.YEAR),
      month: Number(flight.MONTH),
      day: Number(flight.DAY),
      dayOfWeek: Number(flight.DAY_OF_WEEK),
      airline: flight.AIRLINE,
      flightNumber: flight.FLIGHT_NUMBER,
      tailNumber: flight.TAIL_NUMBER,
      originAirport: flight.ORIGIN_AIRPORT,
      destinationAirport: flight.DESTINATION_AIRPORT,
      departureTime: flight.DEPARTURE_TIME,
      scheduledDepartureTime: flight.SCHEDULED_DEPARTURE,
      departureDelayInMinutes: Number(flight.DEPARTURE_DELAY),
      taxiOutDurationInMinutes: Number(flight.TAXI_OUT),
      wheelsOff: flight.WHEELS_OFF,
      durationInMinutes: Number(flight.ELAPSED_TIME),
      scheduledDurationInMinutes: Number(flight.SCHEDULED_TIME),
      airTimeInMinutes: Number(flight.AIR_TIME),
      distance: flight.DISTANCE,
      wheelsOn: flight.WHEELS_ON,
      taxiInDurationInMinutes: Number(flight.TAXI_IN),
      arrivalTime: flight.ARRIVAL_TIME,
      scheduledArrivalTime: flight.SCHEDULED_ARRIVAL,
      arrivalDelayInMinutes: Number(flight.ARRIVAL_DELAY),
      diverted: flight.DIVERTED,
      cancelled: flight.CANCELLED,
      cancellationReason: flight.CANCELLATION_REASON,
      airSystemDelayInMinutes: Number(flight.AIR_SYSTEM_DELAY),
      securityDelayInMinutes: Number(flight.SECURITY_DELAY),
      lateAircraftDelayInMinutes: Number(flight.LATE_AIRCRAFT_DELAY),
      weatherDelayInMinutes: Number(flight.WEATHER_DELAY),
      sentTimestamp: Date.now()
    })
  }
}

module.exports = FlightsService
