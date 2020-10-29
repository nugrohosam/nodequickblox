'use strict'

const {
  LogicalException
} = require('@adonisjs/generic-exceptions')

const code = 'MESSAGE'
const Helper = use('App/Helpers/Base')

class MessageException extends LogicalException {

  constructor(message) {
    super(Helper.restErrorMessage(message), 400, null)
  }
  
  /**
   * Handle this exception by itself
   */
  // handle () {}
}

module.exports = MessageException
