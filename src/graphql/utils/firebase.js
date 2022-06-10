import { googleCredential } from '../../config/environment'

const admin = require('firebase-admin')

function getMessaging () {
  const credential = require(googleCredential)
  admin.initializeApp({
    credential: admin.credential.cert(credential)
  })
  const messaging = admin.messaging()
  return messaging
}

const messaging = getMessaging()

export default messaging
