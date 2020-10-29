'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Room extends Model {

  static TYPE_CHAT = 'CHAT'
  static TYPE_VCALL = 'VCALL'
  static CONTEXT_VERIFY_PROPER_TEST = 'VERIFY_PROPER_TEST'
  static CONTEXT_USER_WITH_USER = 'USER_WITH_USER'

  static CONTEXTS = [this.constructor.CONTEXT_VERIFY_PROPER_TEST, this.constructor.CONTEXT_USER_WITH_USER]
  static TYPES = [this.constructor.TYPE_CHAT, this.constructor.TYPE_VCALL]

  userRooms() {
    return this.hasMany(UserRoom, 'id', 'room_id')
  }
}

module.exports = Room
