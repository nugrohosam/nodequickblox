'use strict'

const uuid = use('uuid')
const Config = use('Config')
const HttpClientRequestService = use('App/Services/HttpClientRequestService')
const CryptoJS = use('crypto-js')
const moment = use('moment')
const Antl = use('Antl')

const dataSession = {
  application_id: null,
  created_at: null,
  id: null,
  nonce: null,
  token: null,
  ts: null,
  updated_at: null,
  user_id: null,
  _id: null
}

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
    let keyword = `application_id=${this.appId}&auth_key=${this.authKey}&nonce=${this.nonce}&timestamp=${this.timeStamp}`
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
    let createSessionBody = {
      application_id: this.appId,
      auth_key: this.authKey,
      timestamp: this.timeStamp,
      nonce: this.nonce,
      signature: this.createSignatureApp()
    }

    let endpoint = `${Config.get('quickblox.apiUrl')}/session.json`
    let httpClientService = new HttpClientRequestService(
      HttpClientRequestService.POST,
      endpoint,
      createSessionBody
    )

    let data = await httpClientService.fetch()
    if (!data.errors) {
      return dataSession = data.session
    }

    throw Antl.formatMessage('messages.greeting')
  }
}

module.exports = QuickBlox
