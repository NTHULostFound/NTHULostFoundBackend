import { db } from '../config/environment'

const pg = require('knex')({
  client: 'postgresql',
  connection: {
    connectionString: db.connectionUrl,
    ssl: {
      ca: db.ca
    }
  }
})

export default pg
