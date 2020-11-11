'use strict'

const { test } = use('Test/Suite')('Test Detail User QuickBlox')
const QuickBloxUser = use('App/Infrastructure/QuickBlox/QuickBloxUser')
const User = use('App/Models/User')

test('test list user', async ({ assert }) => {
  const quickBloxUser = new QuickBloxUser()
  await quickBloxUser.findUserByExternalId(null)
})
