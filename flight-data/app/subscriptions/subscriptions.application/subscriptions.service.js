const AirlineNotFoundError = require('./errors/airlineNotFound.error')

class SubscriptionsService {
  constructor ({ subscriptionsRepositoryService }) {
    this.subscriptionsRepositoryService = subscriptionsRepositoryService
  }

  // async getAirline (id) {
  //   const airline = await this.subscriptionsRepositoryService.getAirline(id.toUpperCase())
  //   if (!airline) {
  //     throw new AirlineNotFoundError()
  //   }
  //   return airline
  // }

  // async getAirlines () {
  //   const airlines = await this.subscriptionsRepositoryService.getAirlines()
  //   return airlines
  // }

  async addSubscription(uri) {
    let subscription =  this.subscriptionsRepositoryService.addSubscription(uri)
    return subscription
  }

  async deleteSubscription (id, password) {

  }
}

module.exports = SubscriptionsService
