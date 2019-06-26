const moment = require('moment')

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
      ...params
    } = flight

    return ({
      ...params,
      date: new Date(year, month, day),
      departureTime: moment(departureTime, 'HHmm').format('HH:mm:ss'),
      scheduledDepartureTime: moment(scheduledDepartureTime, 'HHmm').format('HH:mm:ss'),
      wheelsOff: moment(wheelsOff, 'HHmm').format('HH:mm:ss'),
      arrivalTime: moment(arrivalTime, 'HHmm').format('HH:mm:ss'),
      scheduledArrivalTime: moment(scheduledArrivalTime, 'HHmm').format('HH:mm:ss')
    })
  }
}

module.exports = FlightsDomainService
