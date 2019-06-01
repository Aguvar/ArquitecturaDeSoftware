const app = {}
const container = require('./config/ioc/container')
const routes = require('./config/ioc/routes')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const errorMiddleware = require('./config/middleware/errorMiddleware')
var CronJob = require('cron').CronJob
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

app.start = () => {
  container.registerServices(server)
  routes.configureRoutes(server)
  server.use(errorMiddleware)

  let port = process.env.PORT || 80
  startServerOnPort(port)

  startCronJobs()
}

function startServerOnPort (port) {
  server.listen(port, () => {
    console.log(`Running on port: ${port}`)
  })
};

function startCronJobs(){
  let frequency = process.env.FLIGHT_FREQUENCY
  let quantity = process.env.FLIGHT_LOT_QUANTITY
  let size = process.env.FLIGHT_LOT_SIZE
  let offset = process.env.FLIGHT_OFFSET

  var flightsService = container.resolve("flightsService")

  let job = new CronJob(`*/${frequency} * * * * *`, function() {
    console.log('You will see this message every second');
    flightsService.broadcast(quantity, size, offset)
  }, null, true);
}

module.exports = app
