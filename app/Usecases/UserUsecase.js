'use strict'

const UserCreateRequest = use("App/Infrastructure/QuickBlox/User/UserCreateRequest")
const QuickBloxUser = use('App/Infrastructure/QuickBlox/QuickBloxUser')
const UserRepository = use('App/Repositories/UserRepository')
const Database = use('Database')
const User = use('App/Models/User')
const UserCannotCreateException = use('App/Exceptions/UserCannotCreateException')

class UserUsecase {

  quickBloxInfra
  createUserQuickBloxRequest
  userRepo

  constructor() {
    this.quickBloxInfra = new QuickBloxUser()
    this.userRepo = new UserRepository()
    this.createUserQuickBloxRequest = new UserCreateRequest()
  }

  async registerUser(fullname, username, email, password, phone = null) {
    const trx = await Database.beginTransaction()

    try {
      const role = User.ROLE_CLIENT
      this.userRepo = this.userRepo.useTrans(trx)

      const isSaved = await this.userRepo.create({
        fullname,
        username,
        email,
        password,
        role
      });

      if (isSaved) {
        const login = username
        const userQuickBlox = await this.createUserQuickBlox({
          login,
          password,
          email,
          fullname,
          role,
          phone,
          externalUserId: this.userRepo.getId()
        })

        await this.userRepo.updateUserQuickbloxId(userQuickBlox.id)
      } else {
        throw new UserCannotCreateException()
      }

      trx.commit()
    } catch (e) {
      trx.rollback()
      throw e
    }
  }

  async createUserQuickBlox({
    login,
    password,
    email,
    fullname,
    role,
    phone,
    externalUserId
  }) {
    this.createUserQuickBloxRequest.login = login
    this.createUserQuickBloxRequest.password = password
    this.createUserQuickBloxRequest.email = email
    this.createUserQuickBloxRequest.login = login
    this.createUserQuickBloxRequest.full_name = fullname
    this.createUserQuickBloxRequest.phone = phone
    this.createUserQuickBloxRequest.role = role
    this.createUserQuickBloxRequest.external_user_id = externalUserId

    return await this.quickBloxInfra.create(this.createUserQuickBloxRequest)
  }
}

module.exports = UserUsecase
