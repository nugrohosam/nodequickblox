'use strict'

const { min } = require("moment")

const uuid = use('uuid')
const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const CryptoJS = use('crypto-js')
const moment = use('moment')
const Antl = use('Antl')
const MessageException = use('App/Exceptions/MessageException')
const ServerErrorException = use('App/Exceptions/ServerErrorException')
const { getCache, setCache, clearCache } = use('App/Helpers/Base')
const NAME_CACHED_SESSION = 'session'

class QuickBlox {
  appId = null
  authKey = null
  nonce = null
  secret = null
  timeStamp = null
  login = null
  password = null

  constructor() {
    this.nonce = uuid.v4()
    this.timeStamp = Math.round(moment().format('x') / 1000)
    this.appId = Config.get('quickblox.appId')
    this.authKey = Config.get('quickblox.authKey')
    this.secret = Config.get('quickblox.secret')
    this.login = Config.get('quickblox.login')
    this.password = Config.get('quickblox.password')
  }

  async clearSession() {
    return await clearCache(NAME_CACHED_SESSION)
  }

  createSignatureApp() {
    const keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}`
    return this.cryptSha1(keyword)
  }

  createSignatureUser() {
    const keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}&user[login]=${this.login}&user[password]=${this.password}`
    return this.cryptSha1(keyword)
  }

  cryptSha1(data) {
    return CryptoJS.HmacSHA1(data, this.secret).toString()
  }

  async sessionUser() {
    const endpoint = `${Config.get('quickblox.apiUrl')}/session.json`
    const httpClientService = new HttpClientRequestService(
      HttpClientRequestService.POST,
      endpoint,
      {
        application_id: this.appId,
        auth_key: this.authKey,
        timestamp: this.timeStamp,
        nonce: this.nonce,
        signature: this.createSignatureUser(),
        user: {
          login: this.login,
          password: this.password,
        }
      }
    )

    const data = await httpClientService.fetch()
    if (data.errors) {
      throw new ServerErrorException(data.errors)
    } else if (data && !data.errors && data.session) {
      await setCache(NAME_CACHED_SESSION, data.session)
      return data.session
    } else {
      throw new MessageException(Antl.formatMessage('errors.server_error'))
    }
  }

  async sessionApp() {
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
      throw new ServerErrorException(data.errors)
    } else if (data && !data.errors && data.session) {
      await setCache(NAME_CACHED_SESSION, data.session)
      return data.session
    } else {
      throw new MessageException(Antl.formatMessage('errors.server_error'))
    }
  }

  async getCachedSession() {
    let session = await getCache(NAME_CACHED_SESSION)
    if (!session) {
      session = await this.sessionUser()
    }

    return session
  }
}

module.exports = QuickBlox
