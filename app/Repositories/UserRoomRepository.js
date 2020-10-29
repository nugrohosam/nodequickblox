'use strict'

const UserRoom = use('App/Models/UserRoom')

class RoomRepository {

  model = null

  constructor() {
    this.model = new UserRoom()
  }

  createChat(data) {
    this.model.user_id = data.userId
    this.model.room_id = data.roomId

    return this.model.save()
  }
}

module.exports = RoomRepository