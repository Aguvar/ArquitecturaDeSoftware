const moment = require('moment')

const DATATYPE = {
  DATE: 'date',
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  TIME: 'time'
}

const STRING_FORMATS = {
  UPPERCASE: 'UPPERCASE',
  LOWERCASE: 'LOWERCASE',
  TITLECASE: 'TITLECASE'
}

class TransformatorService {
  transformToExpectedFormat (flight, transformations) {
    const transformedFlight = {}
    transformations.forEach(transformation => {
      const { key, expectedFormat } = transformation
      switch (transformation.datatype) {
        case DATATYPE.DATE:
          transformedFlight[key] = moment(flight[key]).format(expectedFormat)
          break
        case DATATYPE.STRING:
          transformedFlight[key] = this.transformString(flight[key], expectedFormat)
          break
        case DATATYPE.NUMBER:
          transformedFlight[key] = flight[key]
      }
    })
  }

  transformString (string, expectedFormat) {
    switch (expectedFormat) {
      case STRING_FORMATS.UPPERCASE:
        return this.toUpperCase(string)
      case STRING_FORMATS.LOWERCASE:
        return this.toLowerCase(string)
      case STRING_FORMATS.TITLECASE:
        return this.toTitleCase(string)
      default:
        return string
    }
  }

  toTitleCase (string) {
    return string.toLowerCase()
      .split(' ')
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  toUpperCase (string) {
    return string.toUpperCase()
  }

  toLowerCase (string) {
    return string.toUpperCase()
  }
}

module.exports = TransformatorService
