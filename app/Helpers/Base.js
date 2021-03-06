'use strict'

const Config = use('Config')
const Redis = use('Redis')

const Base = {

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

  clearCache: async (name) => {
    await Redis.set(name, null)
  },

  getCache: async (name) => {
    const cached = await Redis.get(name)
    if (cached) {
      return Base.isJson(cached) ? JSON.parse(cached) : cached
    }
  },

  restErrorMessage: (data) => {
    return {
      'version': Config.get('app.version'),
      'message': data,
    }
  }
}

module.exports = Base;