const Joi = require('@hapi/joi')

const schema = Joi.object().keys({
  password: Joi.string().required(),
  uri: Joi.string().required(),
})

module.exports = schema
