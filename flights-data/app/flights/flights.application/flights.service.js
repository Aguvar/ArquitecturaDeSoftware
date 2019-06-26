const axios = require('axios')
const logger = require('pino')()
let self

class FlightsService {
  constructor ({ subscribersService, airlinesService, airportsService, flightsRepositoryService }) {
    this.subscribersService = subscribersService
    this.airlinesService = airlinesService
    this.airportsService = airportsService
    this.flightsRepositoryService = flightsRepositoryService
    self = this
  }

  async publish (quantity, offset, chunkSize) {
    await this.fetchAirlineAndAirportNames()
    this.flightsRepositoryService.read(quantity, chunkSize, offset, self.sendChunk)
  }

  async sendChunk (flights) {
    try {
      const subscribers = await self.subscribersService.getAll()
      const transformedFlights = self.toExpectedFormat(flights)

      await Promise.all(subscribers.map(
        subscriber => {
          axios.post(subscriber.uri, { flights: transformedFlights })
        }
      ))
    } catch (err) {
      logger.error(err.message)
    }
  }

  async fetchAirlineAndAirportNames () {
    self.airports = await this.airportsService.getAll()
    self.airlines = await this.airlinesService.getAll()
  }

  toExpectedFormat (flights) {
    const sentTimestamp = Date.now()

    return flights.map(flight => ({ ...self.formatFlight(flight), sentTimestamp }))
  }

  formatFlight (flight) {
    const airline = self.airlines.find(airline => airline.IATA_CODE === flight.AIRLINE)
    const originAirport = self.airports.find(airport => airport.IATA_CODE === flight.ORIGIN_AIRPORT)
    const destinationAirport = self.airports.find(airport => airport.IATA_CODE === flight.DESTINATION_AIRPORT)

    return ({
      year: flight.YEAR,
      month: flight.MONTH,
      day: flight.DAY,
      dayOfWeek: flight.DAY_OF_WEEK,
      airlineId: flight.AIRLINE,
      airlineName: airline.AIRLINE,
      flightNumber: flight.FLIGHT_NUMBER,
      tailNumber: flight.TAIL_NUMBER,
      originAirport: flight.ORIGIN_AIRPORT,
      originAirportName: originAirport.AIRPORT,
      originAirportCity: originAirport.CITY,
      originAirportState: originAirport.STATE,
      originAirportCountry: originAirport.COUNTRY,
      originAirportLatitude: originAirport.LATITUDE,
      originAirportLongitude: originAirport.LONGITUDE,
      destinationAirport: flight.DESTINATION_AIRPORT,
      destinationAirportName: destinationAirport.AIRPORT,
      destinationAirportCity: destinationAirport.CITY,
      destinationAirportState: destinationAirport.STATE,
      destinationAirportCountry: destinationAirport.COUNTRY,
      destinationAirportLatitude: destinationAirport.LATITUDE,
      destinationAirportLongitude: destinationAirport.LONGITUDE,
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
      weatherDelayInMinutes: flight.WEATHER_DELAY || 0
    })
  }
}

module.exports = FlightsService
