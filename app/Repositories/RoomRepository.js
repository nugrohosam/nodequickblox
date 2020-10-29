'use strict'

const Room = use('App/Models/Room')

class RoomRepository {

  model = null

  constructor() {
    this.model = new Room()
  }

  create(data, context) {
    this.model.session_id_quickblox = data._id
    this.model.token_quickblox = data.token
    this.model.context = context
    this.model.type = Room.TYPE_CHAT
    this.model.expired_at = null

    return this.model.save()
  }
}

module.exports = RoomRepository