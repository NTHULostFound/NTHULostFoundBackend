import { db } from '../config/environment'

const pg = require('knex')({
  client: 'pg',
  connection: db.connectionUrl
});

export default pg