const Joi = require('@hapi/joi')
const joiErrorFormatter = require('joi-error-formatter')

class ValidatorService {
  isValid (entity, schema) {
    const { error: validationError } = Joi.validate(entity, schema)
    return validationError === null
  }

  getValidationError (entity, schema) {
    const { error: validationError } = Joi.validate(entity, schema)
    return validationError
      ? joiErrorFormatter(validationError)
      : null
  }
}

module.exports = ValidatorService
