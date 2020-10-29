'use strict'

const QuickBlox = use('App/Infrastructure/QuickBlox')
const Room = use('App/Models/Room')
const RoomRepo = use('App/Repositories/RoomRepository')
const UserRoomRepo = use('App/Repositories/UserRoomRepository')
const MessageException = use('App/Exceptions/MessageException')

class ChatUsecase {
  quickBloxInfra = null
  roomRepo = null

  constructor() {
    this.quickBloxInfra = new QuickBlox()
    this.roomRepo = new RoomRepo()
    this.userRoomRepo = new UserRoomRepo()
  }

  async createChatRoom(context = Room.CONTEXT_USER_WITH_USER) {
    const data = await this.quickBloxInfra.createRoom()
    if (data.errors) {
      throw new MessageException(data.errors.base[0]);
    }

    this.roomRepo.create({
      session_id: data._id,
      token: data.token
    }, context)
  }

  async joinChatRoom(userId, roomId) {
    this.userRoomRepo.create({
      userId,
      roomId
    })
  }

  async leaveChatRoom(userRoomId) {}
}

module.exports = ChatUsecase
