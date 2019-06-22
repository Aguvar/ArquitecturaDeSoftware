const uniqid = require('uniqid')

const subscriberSchema = require('./subscriber.schema')
const InvalidPayloadError = require('../../errors/invalidPayload.error')

class SubscribersService {
  constructor ({ subscribersRepositoryService, validatorService }) {
    this.subscribersRepositoryService = subscribersRepositoryService
    this.validatorService = validatorService
  }

  async getAll () {
    return this.subscribersRepositoryService.getAll()
  }

  async add (subscriber) {
    const validationError = this.validatorService.getValidationError(subscriber, subscriberSchema)
    if (validationError) {
      throw new InvalidPayloadError(validationError)
    }

    subscriber.id = uniqid()
    return this.subscribersRepositoryService.add(subscriber)
  }
}

module.exports = SubscribersService
