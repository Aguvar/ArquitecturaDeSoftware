const { loadControllers } = require('awilix-express')
const Arena = require('bull-arena')

const arena = Arena({
  queues: [
    {
      'name': 'incomingFlightsQueue',
      'hostId': 'Incoming flights'
    }
  ]
})

module.exports = {
  configureRoutes: (server) => {
    server.use(loadControllers(`${__dirname}/../../**/*.api.js`, { cwd: __dirname }))
    server.use('/arena', arena)
  }
}
