const conditionSchema = require('./condition.schema')

const BASE_OPERATORS = ['eq', 'ne', 'le', 'lt', 'ge', 'gt']

class ConditionsService {
  constructor ({ validatorService }) {
    this.validatorService = validatorService
  }

  matchesCondition (flight, condition) {
    const isValid = this.validatorService.isValid(condition, conditionSchema)
    if (!isValid) return false

    return this.evaluate(flight, condition)
  }

  evaluate (flight, condition) {
    const [comparator] = Object.keys(condition)

    if (this.isBaseCondition(comparator)) {
      const [attributeToCompare, valueToCompare] = condition[comparator]
      return this.evaluateBaseCondition(flight, attributeToCompare, comparator, valueToCompare)
    } else {
      const childConditions = condition[comparator]
      return this.evaluateCompoundCondition(flight, comparator, childConditions)
    }
  }

  evaluateBaseCondition (flight, attributeToCompare, comparator, valueToCompare) {
    switch (comparator) {
      case 'eq':
        return flight[attributeToCompare] == valueToCompare
      case 'ne':
        return flight[attributeToCompare] != valueToCompare
      case 'le':
        return flight[attributeToCompare] <= valueToCompare
      case 'lt':
        return flight[attributeToCompare] < valueToCompare
      case 'ge':
        return flight[attributeToCompare] >= valueToCompare
      case 'gt':
        return flight[attributeToCompare] > valueToCompare
      default:
        return false
    }
  }

  evaluateCompoundCondition (flight, comparator, childConditions) {
    let matchesAllConditions

    switch (comparator) {
      case 'all':
        matchesAllConditions = true
        childConditions.forEach(childCondition => {
          matchesAllConditions &= this.evaluate(flight, childCondition)
        })
        break
      case 'any':
        matchesAllConditions = false
        childConditions.forEach(condition => {
          matchesAllConditions |= this.evaluate(flight, condition)
        })
        break
    }

    return matchesAllConditions
  }

  isBaseCondition (comparator) {
    return BASE_OPERATORS.includes(comparator)
  }
}

module.exports = ConditionsService
