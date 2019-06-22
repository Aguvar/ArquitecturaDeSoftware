const app = {}
const container = require('./config/ioc/container')
const routes = require('./config/ioc/routes')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const errorMiddleware = require('./config/middleware/errorMiddleware')
const Queue = require('bull')

const incomingFlightsQueue = new Queue('incomingFlightsQueue')

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

app.start = () => {
  container.registerServices(server)
  routes.configureRoutes(server)
  server.use(errorMiddleware)
  listenForIncomingFlights(container)

  let port = process.env.PORT || 80
  startServerOnPort(port)
}

function startServerOnPort (port) {
  server.listen(port, () => {
    console.log(`Running on port: ${port}`)
  })
}

function listenForIncomingFlights (container) {
  incomingFlightsQueue.process((job, done) => {
    const flight = job.data
    container.resolve('flightsService').broadcast(flight)
    done()
  })
}

module.exports = app
