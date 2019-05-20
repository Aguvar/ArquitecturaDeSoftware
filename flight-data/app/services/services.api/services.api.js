const { createController } = require('awilix-express')

const API = ({ wrapAsync, servicesService }) => ({
  getServices: wrapAsync.wrap(async (req, res) => {
    res.send(await servicesService.getServices())
  })
})

module.exports = createController(API)
  .get('/services', 'getServices')
