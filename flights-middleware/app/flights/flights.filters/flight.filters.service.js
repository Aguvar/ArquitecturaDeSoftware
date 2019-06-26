const triggerFilter = require('./trigger.filter')
const validationFilter = require('./validation.filter')
const transformationFilter = require('./transformation.filter')

class FlightFiltersService {
  constructor ({ conditionsService }) {
    this.conditionsService = conditionsService
  }

  registerFilters (pipeline) {
    pipeline.use(triggerFilter)
    pipeline.use(validationFilter)
    pipeline.use(transformationFilter)
  }
}

module.exports = FlightFiltersService
