'use strict'

const User = use('App/Models/User')

class UserRepository {

  model = null
  trx = null

  constructor() {
    this.model = new User()
  }

  useTrans(trx) {
    this.trx = trx
    return this
  }

  async create({
    fullname,
    username,
    email,
    password,
    role
  }) {
    this.model.fullname = fullname
    this.model.username = username
    this.model.email = email
    this.model.password = password
    this.model.role = role

    if (this.trx) {
      return await this.model.save(this.trx)
    } else {
      return await this.model.save()
    }
  }
}

module.exports = UserRepository