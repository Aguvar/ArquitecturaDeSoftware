const Joi = require('@hapi/joi')
const joiErrorFormatter = require('joi-error-formatter')
const uniqid = require('uniqid')

const subscriberSchema = require('../subscribers.domain/subscriber.schema')
const InvalidPayloadError = require('../../errors/invalidPayload.error')

class SubscribersService {
  constructor({ subscribersRepositoryService }) {
    this.subscribersRepositoryService = subscribersRepositoryService
  }

  async add(subscriber) {
    const { error: validationError } = Joi.validate(subscriber, subscriberSchema)
    if (validationError) {
      throw new InvalidPayloadError(joiErrorFormatter(validationError))
    }
    
    subscriber.id = uniqid()
    return this.subscribersRepositoryService.add(subscriber)
  }
}

module.exports = SubscribersService
