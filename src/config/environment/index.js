import dotenv from 'dotenv'

dotenv.config()

// Server
const port = process.env.PORT
const secret = process.env.SECRET
const JWTSecret = process.env.JWT_SECRET
const version = process.env.VERSION
const google_credential = process.env.GOOGLE_APPLICATION_CREDENTIALS

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
  ca: process.env.PG_CA
}

export { port, env, secret, JWTSecret, db, version, google_credential }
