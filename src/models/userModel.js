import pg from '../database'

/* eslint-disable no-unused-vars */
export default class UserModel {
  static async getUser (userId) {
    try {
      const res = await pg('users').where('uuid', userId).first()

      return res
    } catch (e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }

  static async findUser (who) {
    try {
      const res = await pg('users').whereILike('studentId', who).orWhereILike('name', who)

      return res
    } catch (e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }

  static async newUser (fcmToken) {
    try {
      const res = await pg('users').insert({
        fcmToken: fcmToken
      }).returning('*')

      return res[0]
    } catch (e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }

  static async updateUser (user) {
    try {
      const res = await pg('users').update({
        fcmToken: user.fcmToken,
        name: user.name,
        studentId: user.studentId,
        email: user.email
      }).where('uuid', user.uuid)
        .returning('*')

      return res[0]
    } catch (e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }
}
