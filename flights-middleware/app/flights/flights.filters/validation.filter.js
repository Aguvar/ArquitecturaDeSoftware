const validationFilter = (input, next) => {
  const { flight, subscriber, conditionsService } = input
  const isFlightValid = conditionsService.matchesCondition(flight, subscriber.validations)

  if (isFlightValid) {
    next(null, { flight, subscriber, conditionsService })
  } else {
    const errorMessage = getErrorMessage(flight, subscriber)
    next(Error(errorMessage))
  }
}

const getErrorMessage = (flight, subscriber) => {
  return `Flight ${flight.flightNumber} could not be sent 
    to ${subscriber.airline} - ${subscriber.airlineDepartment} since 
    it does not match the subscribers' expected format`
}

module.exports = validationFilter
