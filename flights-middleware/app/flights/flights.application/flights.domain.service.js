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

class FlightsDomainService {
  toBaseFormat (flight) {
    const {
      year,
      month,
      day,
      dayOfWeek,
      departureTime,
      scheduledDepartureTime,
      wheelsOff,
      arrivalTime,
      scheduledArrivalTime,
      diverted,
      cancelled,
      ...params
    } = flight

    return ({
      ...params,
      date: new Date(year, month, day),
      departureTime: moment(departureTime, 'HHmm').format('HH:mm:ss'),
      scheduledDepartureTime: moment(scheduledDepartureTime, 'HHmm').format('HH:mm:ss'),
      wheelsOff: moment(wheelsOff, 'HHmm').format('HH:mm:ss'),
      arrivalTime: moment(arrivalTime, 'HHmm').format('HH:mm:ss'),
      scheduledArrivalTime: moment(scheduledArrivalTime, 'HHmm').format('HH:mm:ss'),
      diverted: Number(diverted),
      cancelled: Number(cancelled)
    })
  }

  toExpectedFormat (flight, transformations) {
    const transformedFlight = {}

    transformations.forEach(transformation => {
      const { key, expectedFormat } = transformation
      switch (transformation.type) {
        case TRANSFORMATION_TYPE.DATE:
          transformedFlight[key] = moment(flight[key]).format(expectedFormat)
          break
        case TRANSFORMATION_TYPE.STRING:
          transformedFlight[key] = this.transformString(flight[key], expectedFormat)
          break
        case TRANSFORMATION_TYPE.NUMBER:
          transformedFlight[key] = flight[key]
          break
        case TRANSFORMATION_TYPE.BOOLEAN:
          transformedFlight[key] = this.transformBoolean(flight[key], expectedFormat)
          break
        case TRANSFORMATION_TYPE.CUSTOM_STRING_MAPPING:
          transformedFlight[key] = this.mapStringToAnotherString(flight[key], transformation.customStringMapping)
          break
        case TRANSFORMATION_TYPE.ADD_MESSAGE_IF_KEY_NOT_NULL:
          transformedFlight[key] = this.addMessageIfKeyIsNotNull(flight, transformation.keysToCheck)
          break
      }
    })

    return transformedFlight
  }

  transformBoolean (boolean, expectedFormat) {
    switch (expectedFormat) {
      case BOOLEAN_FORMATS.TRUE_FALSE:
        return boolean
      case BOOLEAN_FORMATS.ONE_ZERO:
        return boolean ? 1 : 0
      case BOOLEAN_FORMATS.YES_NO:
        return boolean ? 'yes' : 'no'
    }
  }

  mapStringToAnotherString (string, mapping) {
    return mapping[string] || mapping.default
  }

  addMessageIfKeyIsNotNull (flight, keysToCheck) {
    const message = ''

    keysToCheck.forEach(({ key, messageToAdd }) =>
      flight[key] && message.concat(messageToAdd + '\n')
    )

    return message || null
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

module.exports = FlightsDomainService
