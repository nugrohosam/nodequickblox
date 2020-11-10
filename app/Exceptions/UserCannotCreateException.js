'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const code = 'VALIDATION_EXCEPTION'
const {
  restErrorValidation
} = use('App/Helpers/Base')

class UserCannotCreateException extends LogicalException {

  constructor() {
    super(restErrorValidation('errors.cannot_create_user'), 400)
  }


  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = UserCannotCreateException
