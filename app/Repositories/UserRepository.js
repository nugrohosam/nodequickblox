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

  getId() {
    return this.model.id
  }

  async updateById({
    data, id
  }) {
    return await User.query().where('id', id).update(data, this.trx)
  }

  async updateUserQuickbloxId(userQuickBloxId) {
    this.model.user_quickblox_id = userQuickBloxId
    return await this.save()
  }

  async save(){
    if (this.trx) {
      return await this.model.save(this.trx)
    } else {
      return await this.model.save()
    }
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

    return await this.save()
  }
}

module.exports = UserRepository