'use strict'

const { test } = use('Test/Suite')('Create User QuickBlox')
const UserUsecase = use('App/Usecases/UserUsecase')

test('create user', async ({ assert }) => {
  const userUsecase = new UserUsecase()
  await userUsecase.registerUser('fullname', 'username', 'email@email.com', 'password')
})
