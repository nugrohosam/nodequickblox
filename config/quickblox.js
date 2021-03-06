'use strict'

const Env = use('Env')

module.exports = {

  /*
   |--------------------------------------------------------------------------
   | API key
   |--------------------------------------------------------------------------
   */
  appId: Env.get('QUICKBLOX_APP_ID', null),

  authKey: Env.get('QUICKBLOX_AUTH_KEY', null),

  apiUrl: Env.get('QUICKBLOX_API_URL', null),

  secret: Env.get('QUICKBLOX_AUTH_SECRET', null),

  login: Env.get('QUICKBLOX_LOGIN', null),

  password: Env.get('QUICKBLOX_PASSWORD', null),
}
