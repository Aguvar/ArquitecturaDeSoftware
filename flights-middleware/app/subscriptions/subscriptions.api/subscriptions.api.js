const { createController } = require('awilix-express')
const errorMiddleware = require('../../middleware/errorMiddleware')

const API = ({ subscriptionsService, wrapAsync }) => ({
  add: wrapAsync.wrap(async (req, res) => {
    const subscription = req.body
    res.send(await subscriptionsService.add(subscription))
  }),
})

module.exports = createController(API)
  .post('/subscriptions', 'add')
  .after([errorMiddleware])
