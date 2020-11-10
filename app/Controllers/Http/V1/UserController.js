'use strict'

const UserDetail = use("App/Resources/V1/UserDetail")
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
    request,
    response,
    auth
  }) {
    const userDetail = new UserDetail(auth.user, {
      request,
      response
    })

    return response.status(200).json(restApi(userDetail.toObject()))
  }
}

module.exports = AuthController
