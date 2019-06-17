const Joi = require('@hapi/joi')
const conditionSchema = require('./condition.schema')

const schema = Joi.object().keys({
  airlineId: Joi.string().required(),
  airlineDepartment: Joi.string().required(),
  uri: Joi.string().required(),
  token: [Joi.string(), Joi.number()],
  fileFormat: Joi.string().valid('JSON', 'XML').required(),
  triggers: conditionSchema,
  validations: conditionSchema,
  transformations: Joi.array().items(Joi.object().keys({
    key: Joi.string(),
    datatype: Joi
      .string()
      .valid('string', 'date', 'time', 'number', 'boolean', 'custom_string_mapping')
      .required(),
    expectedFormat: Joi.string().required(),
    custom_string_mapping: Joi.object().pattern(/./, Joi.string().allow(null)),
    attribute_concatenation: Joi.object().pattern(/./, Joi.string().allow(null)),
  })),
})

module.exports = schema
