import knex from 'knex'
import pg from '../database'

/* eslint-disable no-unused-vars */
export default class UserModel {

  static async getUser(userId) {
    try {
      const res = await knex("users").where("uuid", userId)
      
      return res
    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async findUser(who) {
    try {
      const res = await knex("users").whereILike("studentId", who).orWhereILike("name", who)

      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async newUser(fcmToken) {
    try {
      const res = await knex("users").insert({
        fcmToken: fcmToken,
      }).returning("*")

      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async updateUser(user) {
    try {
      const res = await knex("users").update({
        fcmToken: user.fcmToken,
        name: user.name,
        studentId: user.studentId,
        email: user.email,
      }).where("uuid", user.uuid)
        .returning("*")

      return res

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }
}
