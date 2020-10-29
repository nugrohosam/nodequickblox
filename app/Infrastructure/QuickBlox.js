'use strict'

const uuid = use('uuid')
const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const CryptoJS = use('crypto-js')
const moment = use('moment')
const Antl = use('Antl')
const MessageException = use('App/Exceptions/MessageException')

class QuickBlox {

  appId = null
  authKey = null
  nonce = null
  secret = null
  timeStamp = null

  constructor() {
    this.nonce = uuid.v4()

    let now = new Date()
    this.timeStamp = Math.round(moment().format('x') / 1000)
    this.appId = Config.get('quickblox.appId')
    this.authKey = Config.get('quickblox.authKey')
    this.secret = Config.get('quickblox.secret')
  }

  createSignatureApp() {
    let keyword = `application_id=${this.appId}&auth_key=adafs${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}`
    return this.cryptSha1(keyword)
  }

  createSignatureSocialMedia(token, provider) {
    let keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}&keys[token]=${token}&provider=${provider}`
    return this.cryptSha1(keyword)
  }

  createSignatureUser(username, password) {
    let keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}&user[login]=${username}&user[password]=${password}`
    return this.cryptSha1(keyword)
  }

  cryptSha1(data) {
    return CryptoJS.HmacSHA1(data, this.secret).toString()
  }

  async createRoom() {
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
      return data
    } else if (data && !data.errors && data.session) {
      return data.session
    }

    throw new MessageException(Antl.formatMessage('errors.server.error'))
  }
}

module.exports = QuickBlox
