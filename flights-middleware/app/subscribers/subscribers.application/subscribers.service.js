const subscriberSchema = require('./subscriber.schema')
const InvalidPayloadError = require('../../errors/invalidPayload.error')

const SUBSCRIBERS_KEY = 'subscribers_middleware'
const EXPIRATION_DELAY_IN_SECONDS = 10

class SubscribersService {
  constructor ({ subscribersRepositoryService, validatorService, cacheService }) {
    this.subscribersRepositoryService = subscribersRepositoryService
    this.validatorService = validatorService
    this.cacheService = cacheService
  }

  async getAll () {
    const cachedSubscribers = await this.cacheService.getValue(SUBSCRIBERS_KEY)
    if (cachedSubscribers) {
      return JSON.parse(cachedSubscribers)
    }

    const subscribers = await this.subscribersRepositoryService.getAll()

    await this.cacheService.setWithExpiration(
      SUBSCRIBERS_KEY,
      JSON.stringify(subscribers),
      EXPIRATION_DELAY_IN_SECONDS
    )
    return subscribers
  }

  async add (subscriber) {
    const validationError = this.validatorService.getValidationError(subscriber, subscriberSchema)
    if (validationError) {
      throw new InvalidPayloadError(validationError)
    }

    await this.subscribersRepositoryService.add(subscriber)
  }
}

module.exports = SubscribersService
