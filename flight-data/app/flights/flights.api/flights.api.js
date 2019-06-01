const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({

})

module.exports = createController(API)

    .after([errorMiddleware])
