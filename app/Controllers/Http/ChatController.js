'use strict'

const ChatUsecase = use('App/Usecases/ChatUsecase')

class ChatController {

  chatUsecase = null

  constructor() {
    this.chatUsecase = new ChatUsecase()
  }

  async storeRoom({
    request,
    response
  }) {
    await this.chatUsecase.createChatRoom()
    response.send('wokey')
  }
}

module.exports = ChatController
