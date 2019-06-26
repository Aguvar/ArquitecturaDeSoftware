const Queue = require('bull')
const incomingFlightsQueue = new Queue('incomingFlightsQueue')
const { createController } = require('awilix-express')
const errorMiddleware = require('../../config/middleware/errorMiddleware')

const API = ({ wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const { flights } = req.body
    incomingFlightsQueue.add(flights)
    res.send('received by ' + process.pid)
  })
})

module.exports = createController(API)
  .post('/flights', 'add')
  .after([errorMiddleware])
