import { db } from '../config/environment'

const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING
});

export default pg