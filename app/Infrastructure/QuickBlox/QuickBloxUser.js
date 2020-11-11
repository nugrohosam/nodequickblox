'use strict'

const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const UserDetailResponse = use('App/Infrastructure/QuickBlox/User/UserDetailResponse')
const UserCreateResponse = use('App/Infrastructure/QuickBlox/User/UserCreateResponse')
const UserGetResponse = use('App/Infrastructure/QuickBlox/User/UserGetResponse')
const ValidationException = use('App/Exceptions/ValidationException')
const ServerErrorException = use('App/Exceptions/ServerErrorException')
const QuickBlox = use('App/Infrastructure/QuickBlox/QuickBlox')

class QuickBloxUser extends QuickBlox {

  async listUserByTags(tags) {
    const session = await this.getCachedSessionApp()

    const endpoint = `${Config.get('quickblox.apiUrl')}/users/by_tags.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.GET,
      endpoint,
      null,
      {
        'QB-Token': session.token
      },
      {
        tags: tags
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw (new ValidationException(data.errors, 400))
    } else if (data.code || data.message) {
      throw (new ServerErrorException(data))
    } else if (data) {
      return (new UserGetResponse(data))
    }

    throw (new ServerErrorException('fetch create user'))
  }

  async findUserByExternalId(id) {
    const session = await this.getCachedSessionApp()

    const endpoint = `${Config.get('quickblox.apiUrl')}/users/external/${id}.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.GET,
      endpoint,
      null,
      {
        'QB-Token': session.token
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw (new ValidationException(data.errors, 400))
    } else if (data.code || data.message) {
      throw (new ServerErrorException(data))
    } else if (data) {
      return (new UserDetailResponse(data.user))
    }

    throw (new ServerErrorException('fetch create user'))
  }

  async create(userCreate) {
    const session = await this.getCachedSessionApp()

    const endpoint = `${Config.get('quickblox.apiUrl')}/users.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.POST,
      endpoint,
      userCreate.toObject(),
      {
        'Content-type': 'application/json',
        'QB-Token': session.token
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw (new ValidationException(data.errors))
    } else if (data.code || data.message) {
      throw (new ServerErrorException(data))
    } else if (data) {
      return (new UserCreateResponse(data.user))
    }

    throw (new ServerErrorException('fetch create user'))
  }
}

module.exports = QuickBloxUser
