const incomingFlightSchema = require('./incomingFlight.schema')

class FlightsService {
  constructor ({
    subscribersService,
    subscribersQueuesService,
    conditionsService,
    loggerService,
    validatorService,
    flightsDomainService
  }) {
    this.subscribersService = subscribersService
    this.subscribersQueuesService = subscribersQueuesService
    this.conditionsService = conditionsService
    this.loggerService = loggerService
    this.validatorService = validatorService
    this.flightsDomainService = flightsDomainService
  }

  async broadcast (incomingFlight) {
    if (!this.validatorService.isValid(incomingFlight, incomingFlightSchema)) {
      // this.loggerService.log(`Flight ${incomingFlight.flightNumber} does not match the expected format`)
      return false
    }

    const subscribers = await this.subscribersService.getAll()
    const flight = this.flightsDomainService.toBaseFormat(incomingFlight)
    subscribers.forEach(subscriber => this.send(flight, subscriber))
  }

  send (flight, subscriber) {
    const isFlightValid = this.conditionsService.matchesCondition(flight, subscriber.validations)
    if (!isFlightValid) {
      // this.logInvalidFlight(flight, subscriber)
      return false
    }

    const isSubscriberInterested = this.conditionsService.matchesCondition(flight, subscriber.triggers)
    if (!isSubscriberInterested) return false

    const transformedFlight = this.flightsDomainService.toExpectedFormat(flight, subscriber.transformations)
    this.subscribersQueuesService.push(subscriber, JSON.stringify(transformedFlight))

    this.subscribersQueuesService.pepe++
    console.log('pepe is ', this.subscribersQueuesService.pepe)
  }

  // TODO clarify name. There's two validations: first, validate that the publisher sends data in a specific format.
  // then, each subscriber has specific validation rules
  logInvalidFlight (flight, subscriber) {
    this.loggerService.log(`Flight ${flight.flightNumber} could not be sent 
      to ${subscriber.airlineId} - ${subscriber.airlineDepartment} since 
      it does not match the subscribers' expected format`)
  }
}

module.exports = FlightsService
