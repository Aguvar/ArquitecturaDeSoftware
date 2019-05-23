const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ subscriptionsService, wrapAsync }) => ({
  subscribe: wrapAsync.wrap(async (req, res) => {
    res.send(await subscriptionsService.addSubscription(req.body.uri))
    // res.send(await subscriptionsService.subscribe(req.params.id))
  }),
  unsusbcribe: wrapAsync.wrap(async (req, res) => {
      res.send(await subscriptionsService.deleteSubscription())
  })
})

module.exports = createController(API)
  .post('/subscribe', 'subscribe')
  .delete('/unsubscribe/', 'unsubscribe')
  .after([errorMiddleware])
