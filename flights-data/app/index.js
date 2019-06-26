const app = {}
const container = require('./config/ioc/container')
const { asValue } = require('awilix')
const routes = require('./config/ioc/routes')
const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const errorMiddleware = require('./config/middleware/errorMiddleware')

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
      container.registerServices(server)
      container.register({ repo: asValue(repo) })
      routes.configureRoutes(server)
      server.use(errorMiddleware)

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

module.exports = app
