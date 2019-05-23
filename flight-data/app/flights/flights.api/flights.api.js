const { createController } = require('awilix-express')
const errorMiddleware = require('./middleware/errorMiddleware')

const API = ({ flightsService, wrapAsync }) => ({
    // subscribe: wrapAsync.wrap(async (req, res) => {
    //     res.send(flightsService.subscribe(req.body.endpoint, req.body.port))
    //     // res.send(await flightsService.subscribe(req.params.id))
    // }),
    // unsusbcribe: wrapAsync.wrap(async (req, res) => {
    //     res.send(await flightsService.unsusbcribe())
    // })
})

module.exports = createController(API)
    // .post('/subscribe', 'subscribe')
    // .delete('/unsubscribe/', 'unsubscribe')
    .after([errorMiddleware])
