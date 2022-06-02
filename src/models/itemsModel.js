import db from '../database'

/* eslint-disable no-unused-vars */
export default class ItemsModel {

  static async getItem (userId) {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
      const res = await client.query(queryText, ['brianc'])
      const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
      const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
      await client.query(insertPhotoText, insertPhotoValues)
      await client.query('COMMIT')
    } catch (e) {
      console.warn(e)
      await client.query('ROLLBACK')
      throw Error("Internal Server Error")
    } finally {
      client.release()
    }
  }

  static async newItem (userId) {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      const queryText = 'INSERT INTO users(name) VALUES($1) RETURNING id'
      const res = await client.query(queryText, ['brianc'])
      const insertPhotoText = 'INSERT INTO photos(user_id, photo_url) VALUES ($1, $2)'
      const insertPhotoValues = [res.rows[0].id, 's3.bucket.foo']
      await client.query(insertPhotoText, insertPhotoValues)
      await client.query('COMMIT')
    } catch (e) {
      console.warn(e)
      await client.query('ROLLBACK')
      throw Error("Internal Server Error")
    } finally {
      client.release()
    }
  }
}
