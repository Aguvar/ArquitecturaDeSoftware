const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ airportsService, wrapAsync }) => ({
  getAll: wrapAsync.wrap(async (req, res) => {
    res.send(await airportsService.getAll())
  })
})

module.exports = createController(API)
  .get('/airports', 'getAll')
  .after([errorMiddleware])
