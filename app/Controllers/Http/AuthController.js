'use strict'

const UserUsecase = use('App/Usecases/UserUsecase')

class AuthController {

  chatUsecase = null
  userUsecase = null

  constructor() {
    this.userUsecase = new UserUsecase()
  }

  async registerUser({
    request,
    response
  }) {
    await this.userUsecase.registerUser(
      request.body.fullname,
      request.body.username,
      request.body.email,
      request.body.password
    )
    response.send('User Created')
  }
}

module.exports = AuthController
