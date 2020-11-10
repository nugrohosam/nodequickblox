'use strict'

const uuid = use('uuid')
const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const CryptoJS = use('crypto-js')
const moment = use('moment')
const Antl = use('Antl')
const MessageException = use('App/Exceptions/MessageException')
const ValidationException = use('App/Exceptions/ValidationException')
const ServerErrorException = use('App/Exceptions/ServerErrorException')
const { getCache, setCache } = use('App/Helpers/Base')
const NAME_CACHED_SESSION = 'session'

class QuickBlox {
  appId = null
  authKey = null
  nonce = null
  secret = null
  timeStamp = null

  constructor() {
    this.nonce = uuid.v4()
    this.timeStamp = Math.round(moment().format('x') / 1000)
    this.appId = Config.get('quickblox.appId')
    this.authKey = Config.get('quickblox.authKey')
    this.secret = Config.get('quickblox.secret')
  }

  createSignatureApp() {
    const keyword = `application_id=${this.appId}&auth_key=adafs${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}`
    return this.cryptSha1(keyword)
  }

  createSignatureSocialMedia(token, provider) {
    const keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}&keys[token]=${token}&provider=${provider}`
    return this.cryptSha1(keyword)
  }

  createSignatureUser(username, password) {
    const keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}&user[login]=${username}&user[password]=${password}`
    return this.cryptSha1(keyword)
  }

  cryptSha1(data) {
    return CryptoJS.HmacSHA1(data, this.secret).toString()
  }

  async init() {
    const endpoint = `${Config.get('quickblox.apiUrl')}/session.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.POST,
      endpoint,
      {
        application_id: this.appId,
        auth_key: this.authKey,
        timestamp: this.timeStamp,
        nonce: this.nonce,
        signature: this.createSignatureApp()
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw new ValidationException(data.errors)
    } else if (data && !data.errors && data.session) {
      setCache(NAME_CACHED_SESSION, data.session)
      return data.session
    } else {
      throw new MessageException(Antl.formatMessage('errors.server.error'))
    }
  }

  async getCachedSession() {
    return await getCache(NAME_CACHED_SESSION)
  }
}

module.exports = QuickBlox
