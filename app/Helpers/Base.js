'use strict'

const Config = use('Config')

module.exports = {

  restApi(data) {
    return {
      version: Config.get('app.version'),
      data: data
    }
  },

  restErrorValidation(data) {
    return {
      'version': Config.get('app.version'),
      'errors': data,
    }
  },

  restErrorMessage(data) {
    return {
      'version': Config.get('app.version'),
      'message': data,
    }
  }
}
