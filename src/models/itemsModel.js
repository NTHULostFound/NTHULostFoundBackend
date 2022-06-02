import pool from '../database'

/* eslint-disable no-unused-vars */
export default class ItemsModel {

  static async getItems(showResolved = false) {
    try {
      const queryText = showResolved? 
            'SELECT * FROM items ORDER BY createdAt DESC' :
            'SELECT * FROM items WHERE resolved = false ORDER BY createdAt DESC'
      const itemRes = await pool.query(queryText)
      
      return itemRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async getItem(itemId) {
    try {
      const queryText = 'SELECT * FROM items WHERE uuid = $1'
      const itemRes = await pool.query(queryText, [itemId])
      
      return itemRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async newItem(item) {
    try {

      const queryText =
        'INSERT INTO items(type, name, description, date, place, how, contact, images) \
          VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id'
      const values = [
        item.type, item.name, item.description, item.date, item.place, item.how, item.contact, item.images_txt
      ]
      const itemRes = await pool.query(queryText, values)

      return itemRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }

  static async setResolved(itemId) {
    try {

      const queryText = 'UPDATE items SET resolved = true WHERE uuid = $1'
      const itemRes = await pool.query(queryText, [itemId])

      return itemRes

    } catch (e) {
      console.warn(e)
      throw Error("Internal Server Error")
    }
  }
}
