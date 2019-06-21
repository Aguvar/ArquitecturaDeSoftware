const { loadControllers } = require('../../../node_modules/awilix-express/lib')

module.exports = {
  configureRoutes: (server) => {
    server.use(loadControllers(`${__dirname}/../../**/*.api.js`, { cwd: __dirname }))
  }
}
