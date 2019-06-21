const flightSchema = require('./flights.schema')

class FlightsService {
  constructor ({
    subscribersService,
    conditionsService,
    loggerService,
    validatorService,
    transformatorService
  }) {
    this.subscribersService = subscribersService
    this.conditionsService = conditionsService
    this.loggerService = loggerService
    this.validatorService = validatorService
    this.transformatorService = transformatorService
  }

  async broadcast (flight) {
    if (!this.validatorService.isValid(flight, flightSchema)) {
      this.loggerService.log(`Flight ${flight.flightNumber} does not match the expected format`)
      return false
    }

    console.log(flight)
    const subscribers = await this.subscribersService.getAll()
    subscribers.forEach(subscriber => this.send(flight, subscriber))
  }

  send (flight, subscriber) {
    const isFlightValid = this.conditionsService.matchesCondition(flight, subscriber.validations)
    if (!isFlightValid) {
      this.loggerService.log(`Flight ${flight.flightNumber} could not be sent
        to ${subscriber.airlineId} - ${subscriber.airlineDepartment} since it does
        not match the subscribers' expected format`)
      return false
    }

    const isSubscriberInterested = this.conditionsService.matchesCondition(flight, subscriber.triggers)
    if (!isSubscriberInterested) return false

    const transformedFlight = this.transformatorService.transformToExpectedFormat(flight, subscriber.transformations)
    const subsciberQueue = this.subscribersService.getQueue(subscriber)
    subsciberQueue.push(transformedFlight)
  }
}

module.exports = FlightsService
