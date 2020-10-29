'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserRoomSchema extends Schema {
  up () {
    this.create('user_rooms', (table) => {
      table.increments()
      table.bigInteger('user_id').notNullable()
      table.bigInteger('room_id').notNullable()
      table.datetime('expired_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_rooms')
  }
}

module.exports = UserRoomSchema
