'use strict'

const ChatUsecase = use('App/Usecases/ChatUsecase')

class ChatController {
  
  chatUsecase = null

  constructor() {
    this.chatUsecase = new ChatUsecase()
  }
  
  storeRoom({
    request,
    response
  }) {
    this.chatUsecase.createChatRoom()
    response.send('wokey')
  }
}

module.exports = ChatController
