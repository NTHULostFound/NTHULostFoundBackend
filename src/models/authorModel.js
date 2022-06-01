/* eslint-disable no-unused-vars */
export default class AuthorModel {
  static async selectAll (conn) {
    try {
      // TODO: select all users SQL
      // Return All Users
      const query = ''
      const [rows, fields] = await conn.execute(query)

      return rows
    } catch (err) {
      console.error(`[ERROR] AuthorModel.selectAll :\n ${err}`)
    }
  }

  static async selectUser (conn, userId) {
    const _userId = userId

    try {
      // TODO: select user id SQL
      // Return User
      const query = ''
      const [rows, fields] = await conn.execute(query)

      return rows[0]
    } catch (err) {
      console.error(`[ERROR] AuthorModel.selectUser :\n ${err}`)
    }
  }

  static async createUser (conn, args) {
    const _userName = args.userName
    const _userOrder = args.userOrder

    try {
      // TODO: create user SQL
      // Return insert userId
      const query = ''
      const [rows, fields] = await conn.execute(query)

      return rows.insertId
    } catch (err) {
      console.error(`[ERROR] AuthorModel.createUser :\n ${err}`)
    }
  }

  static async updateUser (conn, args, author) {
    let _userId
    let _userName
    let _userOrder

    if ('userName' in author && 'userOrder' in author) {
      _userId = args.userId
      _userName = author.userName
      _userOrder = author.userOrder
    } else {
      throw new Error('User Name is null')
    }
    try {
      // TODO: update user SQL
      const query = ''
      const [rows, fields] = await conn.execute(query)

      return _userId
    } catch (err) {
      console.error(`[ERROR] AuthorModel.updateUser :\n ${err}`)
    }
  }

  static async deleteUser (conn, userId) {
    const _userId = userId

    try {
      // TODO: delete user SQL
      const query = ''
      const [rows, fields] = await conn.query(query)

      return `Delete user ${_userId} successful!`
    } catch (err) {
      console.error(`[ERROR] AuthorModel.deleteUser :\n ${err}`)
    }
  }
}
