'use strict'

const UserCreateRequest = use("App/Infrastructure/QuickBlox/User/UserCreateRequest")

const QuickBloxUser = use('App/Infrastructure/QuickBlox/QuickBloxUser')
const UserRepository = use('App/Repositories/UserRepository')
const Database = use('Database')
const ServerErrorException = use('App/Exceptions/ServerErrorException')
const User = use('App/Models/User')

class UserUsecase {
  quickBloxInfra = null
  createUserQuickBloxRequest = null
  userRepo = null

  constructor() {
    this.quickBloxInfra = new QuickBloxUser()
    this.userRepo = new UserRepository()
    this.createUserQuickBloxRequest = new UserCreateRequest()
  }

  async registerUser(fullname, username, email, password, phone = null) {
    const trx = await Database.beginTransaction()

    try {
      const role = User.ROLE_CLIENT

      const isSaved = await this.userRepo.useTrans(trx).create({
        fullname,
        username,
        email,
        password,
        role
      });


      if (isSaved) {
        const login = username

        switch (role) {
          case User.ROLE_PARTNER:
            await this.createUserQuickBloxPartner({
              login, password, email, fullname, phone
            })
            break;
          case User.ROLE_CLIENT:
            await this.createUserQuickBloxClient({
              login, password, email, fullname, phone
            })
            break;
          case User.ROLE_INSIDER:
            await this.createUserQuickBloxInsider({
              login, password, email, fullname, phone
            })
            break;
          default:
            throw (new ServerErrorException('Role not correct'))
        }
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
    phone
  }) {
    this.createUserQuickBloxRequest.login = login
    this.createUserQuickBloxRequest.password = password
    this.createUserQuickBloxRequest.email = email
    this.createUserQuickBloxRequest.login = login
    this.createUserQuickBloxRequest.full_name = fullname
    this.createUserQuickBloxRequest.phone = phone

    await this.quickBloxInfra.create(this.createUserQuickBloxRequest)
  }

  async createUserQuickBloxPartner(
    login,
    password,
    email,
    fullname,
    phone
  ) {
    this.createUserQuickBloxRequest.tag_list = User.ROLE_PARTNER
    await this.createUserQuickBlox(
      login,
      password,
      email,
      fullname,
      phone
    )
  }

  async createUserQuickBloxClient(
    login,
    password,
    email,
    fullname,
    phone
  ) {
    this.createUserQuickBloxRequest.tag_list = User.ROLE_CLIENT
    await this.createUserQuickBlox(
      login,
      password,
      email,
      fullname,
      phone
    )
  }

  async createUserQuickBloxInsider(
    login,
    password,
    email,
    full_name,
    phone
  ) {
    this.createUserQuickBloxRequest.tag_list = User.ROLE_INSIDER
    await this.createUserQuickBlox(
      login,
      password,
      email,
      full_name,
      phone
    )
  }
}

module.exports = UserUsecase
