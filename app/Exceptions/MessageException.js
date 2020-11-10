'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const { restErrorMessage } = use('App/Helpers/Base')

class MessageException extends LogicalException {

  constructor(message) {
    
    super(restErrorMessage(message), 400)
  }
  
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = MessageException
