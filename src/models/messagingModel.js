import messaging from '../graphql/utils/firebase'
import UserModel from './userModel'

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

  static async sendLostNotification (who, itemName, itemId) {
    const possibleOwners = await UserModel.findUser(who)
    const fcmTokens = possibleOwners.map(result => result.fcmToken)
    console.log(fcmTokens)
    if (fcmTokens.length === 0)
      return

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
}
