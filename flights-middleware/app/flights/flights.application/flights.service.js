const Pipeline = require('pipes-and-filters')
const incomingFlightSchema = require('./incomingFight.schema')
const Queue = require('bull')
const incomingFlightsQueue = new Queue('incomingFlightsQueue')

let self

class FlightsService {
  constructor ({
    transformedFlightsService,
    flightsDomainService,
    flightFiltersService,
    subscribersService,
    loggerService,
    validatorService,
    conditionsService
  }) {
    this.flightsDomainService = flightsDomainService
    this.flightFiltersService = flightFiltersService
    this.transformedFlightsService = transformedFlightsService
    this.subscribersService = subscribersService
    this.conditionsService = conditionsService
    this.loggerService = loggerService
    this.validatorService = validatorService
    this.pipeline = Pipeline.create('flightsPipeline')
    self = this
  }

  initPipeline () {
    const pipeline = self.pipeline
    self.flightFiltersService.registerFilters(pipeline)
    pipeline.on('error', self.handlePipeError)
    pipeline.on('end', self.handlePipeResult)
  }

  addToIncomingFlightsQueue (flights) {
    incomingFlightsQueue.add(flights)
  }

  async broadcast (incomingFlights) {
    const pipeline = self.pipeline
    const conditionsService = self.conditionsService

    try {
      await Promise.all(incomingFlights.map(async incomingFlight => {
        if (!self.validatorService.isValid(incomingFlight, incomingFlightSchema)) {
          // self.loggerService.logError(`Flight ${incomingFlight.flightNumber} does not match the expected format`)
          return false
        }

        const subscribers = await self.subscribersService.getAll()
        const flight = self.flightsDomainService.toBaseFormat(incomingFlight)
        subscribers.forEach(subscriber =>
          pipeline.execute({ flight, subscriber, conditionsService })
        )
      }))
    } catch (err) {
      self.loggerService.logError('Invalid flight chunk received')
    }
  }

  handlePipeError (err) {
    if (err && err.message) {
      self.loggerService.logError(err.message)
    }
  }

  handlePipeResult ({ flight, subscriber }) {
    self.transformedFlightsService.push(flight, subscriber)
  }
}

module.exports = FlightsService
