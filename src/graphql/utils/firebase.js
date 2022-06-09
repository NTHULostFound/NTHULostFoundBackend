import { google_credential } from '../../config/environment'

const admin = require("firebase-admin")

function getMessaging() {
  let credential = require(google_credential);
  admin.initializeApp({
    credential: admin.credential.cert(credential)
  })
  let messaging = admin.messaging()
  return messaging
}

const messaging = getMessaging()

export default messaging
