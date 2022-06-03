import pool from '../database'

/* eslint-disable no-unused-vars */
export default class UserModel {

  static async getUser(userId) {
    try {
      const queryText = 'SELECT * FROM users WHERE uuid = $1'
      const userRes = await pool.query(queryText, [userId])
      
      return userRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async findUser(who) {
    try {
      const queryText = 'SELECT * FROM users WHERE studentId ILIKE $1 OR name ILIKE $1'
      const userRes = await pool.query(queryText, [who])
      
      return userRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async newUser(fcmToken) {
    try {

      const queryText =
        'INSERT INTO users(fcmToken) VALUES($1)'
      const userRes = await pool.query(queryText, [fcmToken])

      return userRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async updateUser(user) {
    try {

      const queryText = 'UPDATE items SET \
        fcmToken = $2, name = $3, studentId = $4, email = $5 \
        WHERE uuid = $1'
      const values = [ user.uuid, user.fcmToken, user.name, user.studentId, user.email ]
      const itemRes = await pool.query(queryText, values)

      return itemRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }
}
