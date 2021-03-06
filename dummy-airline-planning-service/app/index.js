const app = {}
const container = require('./config/ioc/container')
const routes = require('./config/ioc/routes')
const express = require('express')
const bodyParser = require('body-parser')
require('body-parser-xml')(bodyParser)
const server = express()
const errorMiddleware = require('./config/middleware/errorMiddleware')

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(bodyParser.xml())

app.start = () => {
  container.registerServices(server)
  routes.configureRoutes(server)
  server.use(errorMiddleware)

  let port = process.env.PORT || 80
  startServerOnPort(port)
}

function startServerOnPort (port) {
  server.listen(port, () => {
    console.log(`Running ServicioDePlanificacion on port: ${port}`)
  })
};
module.exports = app
