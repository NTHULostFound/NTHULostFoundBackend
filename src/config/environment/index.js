import dotenv from 'dotenv'

dotenv.config()

// Server
const port = process.env.PORT
const secret = process.env.SECRET
const JWTSecret = process.env.JWT_SECRET
const version = process.env.VERSION

// Different situations
const env = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  staging: process.env.NODE_ENV === 'staging',
  production: process.env.NODE_ENV === 'production'
}

// Postgres connection string
const db = {
  connectionUrl: process.env.PG_CONNECTION_STRING,
}

export { port, env, secret, JWTSecret, db, version }
