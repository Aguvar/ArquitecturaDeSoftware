const Joi = require('@hapi/joi')
const joiErrorFormatter = require('joi-error-formatter')

const subscriberSchema = require('./subscriber.schema')

class SubscribersDomainService {
  isValid(subscriber) {
    const { error: validationError } = Joi.validate(subscriber, subscriberSchema)
    return validationError !== null
  }
}

module.exports = SubscribersDomainService
