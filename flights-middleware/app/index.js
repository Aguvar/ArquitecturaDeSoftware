const app = {}
const container = require('./config/ioc/container')
const { asValue } = require('awilix')
const routes = require('./config/ioc/routes')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const errorMiddleware = require('./config/middleware/errorMiddleware')
const Queue = require('bull')

const incomingFlightsQueue = new Queue('incomingFlightsQueue')

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

const MongoClient = require('mongodb').MongoClient
const dbUrl = process.env.DATABASE_URL
const dbClient = new MongoClient(dbUrl, { useNewUrlParser: true })

app.start = () => {
  dbClient.connect((err, client) => {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
      setTimeout(app.start, 5000)
    } else {
      const repo = client.db('flights-middleware')
      container.register({ repo: asValue(repo) })
      container.registerServices(server)
      routes.configureRoutes(server)
      server.use(errorMiddleware)

      initPipeline(container)
      listenForIncomingFlights(container)

      let port = process.env.PORT || 80
      startServerOnPort(port)
    }
  })
}

function startServerOnPort (port) {
  server.listen(port, () => {
    console.log(`Running on port: ${port}`)
  })
}

function initPipeline () {
  process.setMaxListeners(0)
  container.resolve('flightsService').initPipeline()
}

function listenForIncomingFlights (container) {
  incomingFlightsQueue.process((job, done) => {
    const flights = job.data
    container.resolve('flightsService').broadcast(flights)
    done()
  })
}

module.exports = app
