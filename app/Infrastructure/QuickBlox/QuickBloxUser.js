'use strict'

const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const Antl = use('Antl')
const MessageException = use('App/Exceptions/MessageException')
const UserCreateResponse = use('App/Infrastructure/QuickBlox/User/UserCreateResponse')
const QuickBlox = use('App/Infrastructure/QuickBlox/QuickBlox')

class QuickBloxUser extends QuickBlox {

  async create(userCreate) {
    let session = await this.getCachedSession()
    if (!session) {
      session = await this.init()
    }

    const endpoint = `${Config.get('quickblox.apiUrl')}/users.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.POST,
      endpoint,
      userCreate.objects,
      {
        'Content-type': 'application/json',
        'QB-Token': session.token
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw new ServerErrorException(data.errors)
    } else if (data.code && data.message) {
      throw new ServerErrorException(data)
    } else if (data) {
      return (new UserCreateResponse(data.user))
    }

    throw (new MessageException(Antl.formatMessage('errors.server.error')))
  }
}

module.exports = QuickBloxUser
