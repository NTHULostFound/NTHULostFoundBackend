import { email } from '../config/environment'
import messaging from '../graphql/utils/firebase'
import UserModel from './userModel'
const heml = require('heml')
const nodemailer = require('nodemailer')

export default class MessagingModel {
  static async sendInserted (userId, itemName, itemId, itemType) {
    const user = await UserModel.getUser(userId)
    const message = {
      token: user.fcmToken,
      data: {
        content: itemName,
        type: `${itemType}_INSERTED`,
        item_uuid: itemId
      }
    }

    try {
      const result = await messaging.send(message)
      return result
    } catch (e) {
      console.warn(e)
    }
  }

  static async sendLost (who, item) {
    const possibleOwners = await UserModel.findUser(who)
    const fcmTokens = possibleOwners.map(result => result.fcmToken)
    const emails = possibleOwners.map(result => result.email).filter(x => x !== null)
    try {
      this.sendLostNotification(fcmTokens, item.name, item.uuid)
      this.sendLostEmail(emails, item.name, item.description, item.images[0], item.dynamicLink)
    } catch (e) {
      console.warn(e)
    }
  }

  static async sendLostNotification (fcmTokens, itemName, itemId) {
    if (fcmTokens.length === 0) { return }

    const message = {
      tokens: fcmTokens,
      data: {
        content: itemName,
        type: 'LOST_NOTIFICATION',
        item_uuid: itemId
      }
    }

    try {
      const result = await messaging.sendMulticast(message)
      return result
    } catch (e) {
      console.warn(e)
    }
  }

  static async sendContactChecked (author, itemName, itemId) {
    const user = await UserModel.getUser(author)
    const message = {
      token: user.fcmToken,
      data: {
        content: itemName,
        type: 'CONTACT_CHECKED',
        item_uuid: itemId
      }
    }

    try {
      const result = await messaging.send(message)
      return result
    } catch (e) {
      console.warn(e)
    }
  }

  static async sendLostEmail (emails, itemName, itemDescription, image, dynamicLink) {
    emails = emails.filter(x => x !== null)
    emails = [...new Set(emails)]

    if (emails.length === 0) { return }

    try {
      const hemlText = `<heml>
        <head>
          <subject>???????????????${itemName}?????????</subject>
          <style>
            h1 { color: #7e1083; }
            container { text-align: center; }
          </style>
        </head>
        <body>
          <h1>?????????????????????${itemName}?????????</h1>
          <h3>????????????Lost & Found in NTHU?????????????????????????????????????????????</h3>
          <container>
            <h2>${itemName}</h2>
            ${image !== null ? `<img src="${image}" alt="${itemName}" infer />` : ''}
            ${itemDescription !== null ? `<p>${itemDescription}</p>` : ''}
          </container>
          <br />
          <h3>???????????? App, ??????????????????????????????</h3>
          <br />
          <button href="${dynamicLink}">?????????????????????</button>
        </body>
      </heml>`

      const { html } = await heml(hemlText, { validate: 'none' })

      const transporter = nodemailer.createTransport({
        host: email.host,
        port: email.port,
        auth: {
          user: email.user,
          pass: email.pass
        }
      })

      emails.forEach(address => {
        transporter.sendMail({
          from: `Lost & Found in NTHU ${email.from}`,
          to: address,
          subject: `???????????????${itemName}?????????`,
          html: html
        }).catch(e => {
          console.warn(e)
        }).then(info => {
          if (info == null) {
            console.warn(`Email not sent to ${address}`)
            return
          }
          console.log(`Email sent to ${address}, ${info.response}`)
        })
      })
    } catch (e) {
      console.warn(e)
    }
  }
}
