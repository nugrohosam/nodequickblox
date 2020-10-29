'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

const Constant = {
  CONTEXT: ['VERIFY_PROPER_TEST', 'USER_WITH_USER'],
  TYPE: ['CHAT', 'VCALL']
}

class Room extends Model {

}

module.exports = {
  Room,
  Constant
}
