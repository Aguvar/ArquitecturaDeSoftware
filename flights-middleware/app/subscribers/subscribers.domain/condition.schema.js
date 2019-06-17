const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  eq: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  ne: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  le: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  lt: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  ge: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  gt: Joi.array().length(2).items(Joi.string().allow(null), Joi.number(), Joi.boolean()),
  any: Joi.array().items(Joi.lazy(() => expression)),
  all: Joi.array().items(Joi.lazy(() => expression)),
}).xor('any', 'all', 'eq', 'ne', 'le', 'lt', 'ge', 'gt')

module.exports = schema
