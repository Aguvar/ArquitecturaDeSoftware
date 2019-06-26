const moment = require('moment')

const TRANSFORMATION_TYPE = {
  DATE: 'date',
  TIME: 'time',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  CUSTOM_STRING_MAPPING: 'customStringMapping',
  ADD_MESSAGE_IF_KEY_NOT_NULL: 'addMessageIfKeyNotNull'
}

const STRING_FORMATS = {
  UPPERCASE: 'uppercase',
  LOWERCASE: 'lowercase',
  TITLECASE: 'titlecase'
}

const BOOLEAN_FORMATS = {
  TRUE_FALSE: 'true/false',
  ONE_ZERO: '1/0',
  YES_NO: 'yes/no'
}

const transformationFilter = (input, next) => {
  const { flight, subscriber, conditionsService } = input
  const transformedFlight = {}

  subscriber.transformations.forEach(transformation => {
    const { key, expectedFormat } = transformation
    switch (transformation.type) {
      case TRANSFORMATION_TYPE.DATE:
        transformedFlight[key] = moment(flight[key]).format(expectedFormat)
        break
      case TRANSFORMATION_TYPE.STRING:
        transformedFlight[key] = transformString(flight[key], expectedFormat)
        break
      case TRANSFORMATION_TYPE.NUMBER:
        transformedFlight[key] = flight[key]
        break
      case TRANSFORMATION_TYPE.BOOLEAN:
        transformedFlight[key] = transformBoolean(flight[key], expectedFormat)
        break
      case TRANSFORMATION_TYPE.CUSTOM_STRING_MAPPING:
        transformedFlight[key] = mapStringToAnotherString(flight[key], transformation.customStringMapping)
        break
      case TRANSFORMATION_TYPE.ADD_MESSAGE_IF_KEY_NOT_NULL:
        transformedFlight[key] = addMessageIfKeyIsNotNull(flight, transformation.keysToCheck)
        break
    }
  })

  next(null, { flight: transformedFlight, subscriber, conditionsService })
}

const transformBoolean = (boolean, expectedFormat) => {
  switch (expectedFormat) {
    case BOOLEAN_FORMATS.TRUE_FALSE:
      return boolean
    case BOOLEAN_FORMATS.ONE_ZERO:
      return boolean ? 1 : 0
    case BOOLEAN_FORMATS.YES_NO:
      return boolean ? 'yes' : 'no'
  }
}

const mapStringToAnotherString = (string, mapping) => {
  return mapping[string] || mapping.default
}

const addMessageIfKeyIsNotNull = (flight, keysToCheck) => {
  const message = ''

  keysToCheck.forEach(({ key, messageToAdd }) =>
    flight[key] && message.concat(messageToAdd + '\n')
  )

  return message || null
}

const transformString = (string, expectedFormat) => {
  switch (expectedFormat) {
    case STRING_FORMATS.UPPERCASE:
      return toUpperCase(string)
    case STRING_FORMATS.LOWERCASE:
      return toLowerCase(string)
    case STRING_FORMATS.TITLECASE:
      return toTitleCase(string)
    default:
      return string
  }
}

const toTitleCase = (string) => {
  return string.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ')
}

const toUpperCase = (string) => {
  return string.toUpperCase()
}

const toLowerCase = (string) => {
  return string.toUpperCase()
}

module.exports = transformationFilter
