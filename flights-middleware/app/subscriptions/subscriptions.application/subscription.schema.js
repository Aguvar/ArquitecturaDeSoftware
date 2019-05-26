const Joi = require('@hapi/joi');

const schema = Joi.object().keys({
  id: Joi.number().required(),
  airlineId: Joi.string().required(),
  airlineDepartment: Joi.string().required(),
  uri: Joi.string().required(),
  token: [Joi.string(), Joi.number()],
  bodyFormat: Joi.array().items(Joi.object().keys({
    key: Joi.string(),
    datatype: Joi.string().valid('string', 'date', 'time', 'number', 'boolean').required(),
    format: Joi.string().required(),
  })),
});

module.exports = schema;
