'use strict'

const axios = use('axios');
const qs = use('qs');

class HttpClientRequestService {

  static GET = 'GET'
  static POST = 'POST'
  static PUT = 'PUT'

  method = null
  body = null
  headers = null
  params = null
  url = null

  constructor(method, url = '', body = {}, headers = {
    "content-type": "application/json"
  }, params = {}) {
    this.method = method
    this.url = url
    this.body = body
    this.headers = headers
    this.params = params
  }

  async fetch() {
    try {
      let prepareRequest = {
        method: this.method,
        headers: this.headers,
        data: JSON.stringify(this.body),
        url: `${this.url}?${qs.stringify(this.params)}`,
      };

      const response = await axios(prepareRequest)

      return response.data;
    } catch (err) {
      if (err.response) {
        return response.data
      }
      
      return null
    }
  }
}

module.exports = HttpClientRequestService
