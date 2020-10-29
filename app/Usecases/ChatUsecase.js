'use strict'

const QuickBlox = use('App/Infrastructure/QuickBlox')

class ChatUsecase {
  quickBloxInfra = null
  
  constructor(){
    this.quickBloxInfra = new QuickBlox()
  }
  
  createChatRoom() {
    this.quickBloxInfra.createRoom()
  }
}

module.exports = ChatUsecase
