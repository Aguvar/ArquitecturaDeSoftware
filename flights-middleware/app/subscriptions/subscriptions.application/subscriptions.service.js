const Joi = require('@hapi/joi');
const subscriptionSchema = require('./subscription.schema')
const InvalidPayloadError = require('../../errors/invalidPayload.error')

class SubscriptionsService {
  constructor({ subscriptionsRepositoryService }) {
    this.subscriptionsRepositoryService = subscriptionsRepositoryService
  }

  async add(subscription) {
    const validationResult = Joi.validate(subscription, subscriptionSchema)
    if (validationResult.error) {
      throw new InvalidPayloadError('Subscription does not meet the required format')
    }
    return this.subscriptionsRepositoryService.add(subscription)
  }

  async getAll() {
    return this.subscriptionsRepositoryService.getAll()
  }
}

module.exports = SubscriptionsService
