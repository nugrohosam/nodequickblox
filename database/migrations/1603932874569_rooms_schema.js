'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

const {
  Constant
} = use('App/Models/Room')

class RoomsSchema extends Schema {
  up() {
    this.create('rooms', (table) => {
      table.bigIncrements()
      table.string('session_id_quickblox').nullable()
      table.string('token_quickblox').nullable()
      table.enu('context', Constant.CONTEXT).notNullable().defaultTo(Constant.CONTEXT[0])
      table.enu('type', Constant.TYPE).notNullable().defaultTo(Constant.TYPE[0])
      table.datetime('expired_at').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('rooms')
  }
}

module.exports = RoomsSchema
