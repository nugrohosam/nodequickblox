'use strict'

const Config = use('Config')
const Redis = use('Redis')

module.exports = {

  restApi: (data) => {
    return {
      version: Config.get('app.version'),
      data: data
    }
  },

  isJson: (text) => {
    return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
      replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
      replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
  },

  restErrorValidation: (data) => {
    return {
      'version': Config.get('app.version'),
      'errors': data,
    }
  },

   setCache: async (name, value) => {
    const data = JSON.stringify(value)
    await Redis.set(name, data)
  },

   getCache:  async (name) =>  {
    const cached = await Redis.get(name)
    if (cached) {
      return this.isJson(cached) ? JSON.parse(cached) : cached
    }
  },

  restErrorMessage: (data) => {
    return {
      'version': Config.get('app.version'),
      'message': data,
    }
  }
}
