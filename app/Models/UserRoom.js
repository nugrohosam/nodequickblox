'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Room = use('App/Models/Room')
const User = use('App/Models/User')

class UserRoom extends Model {

  static get table () {
    return 'user_room'
  }

  users() {
    return this.hasMany(User)
  }

  rooms() {
    return this.hasMany(Room)
  }
}

module.exports = UserRoom
