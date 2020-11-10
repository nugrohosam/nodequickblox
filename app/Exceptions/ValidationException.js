'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const code = 'VALIDATION_EXCEPTION'
const { restErrorValidation } = use('App/Helpers/Base')

class ValidationException extends LogicalException {

  constructor(validation) {
    if (!Array.isArray(validation) && typeof validation !== 'object') {
      super('Server Error', 400, code)
    } else {
      const mapValidation = Object.keys(validation).map((key) => {
        return {
          'key': key,
          'rules': validation[key]
        }
      })

      super(restErrorValidation(mapValidation), 400)
    }

  }

  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ValidationException
