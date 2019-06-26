const Pipeline = require('pipes-and-filters')

const triggerFilter = (input, next) => {
  const { flight, subscriber, conditionsService } = input

  const isSubscriberInterested = (flight.airline === subscriber.airline &&
    conditionsService.matchesCondition(flight, subscriber.triggers))

  if (isSubscriberInterested) {
    next(null, { flight, subscriber, conditionsService })
  } else {
    next(null, Pipeline.break)
  }
}

module.exports = triggerFilter
