const Queue = require('bull');
const incomingFlightsQueue = new Queue('incomingFlightsQueue')

class FlightsService {
  constructor({ subscribersService }) {
    this.subscribersService = subscribersService
  }
}

incomingFlightsQueue.process((job, done) => {
  const flight = job.data
  console.log(flight)
})

module.exports = FlightsService
