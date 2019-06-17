const Joi = require('joi')
const joiErrorFormatter = require('joi-error-formatter')
const uniqid = require('uniqid')

const subscriberSchema = require('./subscriber.schema')
const InvalidPayloadError = require('../../errors/invalidPayload.error')

class SubscribersService {
  constructor({ subscribersRepositoryService }) {
    this.subscribersRepositoryService = subscribersRepositoryService
  }

  async getAll() {
    return this.subscribersRepositoryService.getAll()
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
