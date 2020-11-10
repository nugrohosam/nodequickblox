'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

class ServerErrorException extends LogicalException {

  constructor(message) {
      super(message, 500)
  }
  
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = ServerErrorException
