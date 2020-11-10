'use strict'

const UserUsecase = use('App/Usecases/UserUsecase')
const {
  restApi
} = use('App/Helpers/Base')

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

  async loginUser({
    request,
    response,
    auth
  }) {
    const email = request.body.email
    const password = request.body.password
    const token = await auth.attempt(email, password)

    response.send(restApi(token))
  }
}

module.exports = AuthController
