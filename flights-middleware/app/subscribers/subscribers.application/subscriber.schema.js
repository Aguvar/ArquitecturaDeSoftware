const Joi = require('@hapi/joi')
const conditionSchema = require('../../conditions/conditions.application/condition.schema')

const schema = Joi.object().keys({
  airline: Joi.string().required(),
  airlineDepartment: Joi.string().required(),
  uri: Joi.string().required(),
  token: [Joi.string(), Joi.number()],
  fileFormat: Joi.string().valid('JSON', 'XML').required(),
  triggers: conditionSchema,
  validations: conditionSchema,
  transformations: Joi.array().items(Joi.object().keys({
    key: Joi.string(),
    type: Joi
      .string()
      .valid('string', 'date', 'time', 'number', 'boolean', 'customStringMapping', 'addMessageIfKeyNotNull')
      .required(),
    expectedFormat: Joi.string().required(),
    customStringMapping: Joi.object({
      default: Joi.string().allow(null).required()
    }).pattern(/./, Joi.string().allow(null)),
    keysToCheck: Joi.array().items(Joi.object({
      key: Joi.string().required(),
      message: Joi.string().required()
    }))
  }))
})

module.exports = schema
