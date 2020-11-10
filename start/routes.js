'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('/register', 'V1/AuthController.registerUser').as('chat.register.user')
  Route.post('/login', 'V1/AuthController.loginUser').as('chat.login.user')
}).prefix('api/v1')

Route.group(() => {
    Route.post('/profile', 'V1/UserController.profile').as('chat.login.user')
  })
  .middleware(['auth'])
  .prefix('api/v1')
