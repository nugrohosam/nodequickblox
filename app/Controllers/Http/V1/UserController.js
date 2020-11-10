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

  async profile({
    auth,
    response
  }) {
    return response.status(200).json(restApi(auth.user))
  }
}

module.exports = AuthController
