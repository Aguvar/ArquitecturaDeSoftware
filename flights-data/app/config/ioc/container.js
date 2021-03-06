const { asClass, createContainer, Lifetime } = require('awilix')
const { scopePerRequest } = require('awilix-express')
const cache = require('../cache/cache')
const wrapAsync = require('../middleware/wrapAsync')

const container = createContainer()

container.register({
  cache: asClass(cache).scoped(),
  wrapAsync: asClass(wrapAsync).scoped()
})

container.loadModules(
  [
    [`${__dirname}/../../**/*.service.js`, { register: asClass }]
  ],
  {
    formatName: 'camelCase',
    resolverOptions: {
      lifetime: Lifetime.SINGLETON
    }
  }
)

container.registerServices = (app) => {
  app.use(scopePerRequest(container))
}

module.exports = container
