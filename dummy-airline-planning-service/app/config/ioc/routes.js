const { loadControllers } = require('awilix-express/lib')

module.exports = {
  configureRoutes: (server) => {
    server.use(loadControllers(`${__dirname}/../../**/*.api.js`, { cwd: __dirname }))
  }
}
