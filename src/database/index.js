import { db } from '../config/environment'
const { Pool } = require('pg')

const pool = new Pool({
  host: db.host,
  user: db.user,
  password: db.password,
  database: db.name,
  port: db.port
})

export default pool

