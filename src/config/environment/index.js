import dotenv from 'dotenv'

dotenv.config()

// Server
const port = process.env.PORT
const secret = process.env.SECRET
const JWTSecret = process.env.JWT_SECRET
const version = process.env.VERSION
const googleCredential = process.env.GOOGLE_APPLICATION_CREDENTIALS

// Firebase Dynamic Links
const dynamicLink = {
  baseUri: process.env.DYNAMIC_LINK_BASE_URI,
  domainPrefix: process.env.DYNAMIC_LINK_DOMAIN_PREFIX,
  androidPackageName: process.env.DYNAMIC_LINK_ANDROID_PACKAGE_NAME,
  fallbackUrl: process.env.DYNAMIC_LINK_FALLBACK_URL,
  firebaseApiKey: process.env.FIREBASE_API_KEY
}

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

export { port, env, secret, JWTSecret, db, version, googleCredential, dynamicLink }
