'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const code = 'VALIDATION_EXCEPTIOn'
const { restErrorValidation } = use('App/Helpers/Base')

class ValidationException extends LogicalException {

  constructor(validation) {
    if (!Array.isArray(validation)) {
      super('Server Error', 400, code)
    } else {
      const mapValidation = Object.keys(validation).map((key) => {
        [
          ['key', key],
          ['rules', validation[key]]
        ]
      })

      super(restErrorValidation(new Map(mapValidation)), 400, code)
    }

  }

  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ValidationException
