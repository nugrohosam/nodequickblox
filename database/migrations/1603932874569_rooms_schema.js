'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

const Room = use('App/Models/Room')

class RoomsSchema extends Schema {
  up() {
    this.create('rooms', (table) => {
      table.bigIncrements()
      table.string('session_id_quickblox').nullable()
      table.string('token_quickblox').nullable()
      table.enu('context', Room.CONTEXTS).notNullable().defaultTo(Room.CONTEXTS[0])
      table.enu('type', Room.TYPES).notNullable().defaultTo(Room.TYPES[0])
      table.datetime('expired_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('rooms')
  }
}

module.exports = RoomsSchema
