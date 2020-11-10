'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const { restErrorMessage } = use('App/Helpers/Base')

class ServerErrorException extends LogicalException {

  constructor(message) {
    super(message, 500, null)
  }
  
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ServerErrorException
