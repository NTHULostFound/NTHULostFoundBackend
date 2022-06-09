import messaging from "../graphql/utils/firebase";
import UserModel from "./userModel";

export default class MessagingModel {
  static async sendInserted(userId, itemName, itemId, itemType) {
    let user = await UserModel.getUser(userId)
    let message = {
      token: user.fcmToken,
      data: {
        content: itemName,
        type: `${itemType}_INSERTED`,
        item_uuid: itemId
      }
    }

    try {
      let result = await messaging.send(message)
      return result
    } catch(e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }

  static async sendLostNotification(who, itemName, itemId) {
    let possibleOwners = await UserModel.findUser(who)
      let fcmTokens = possibleOwners.map(result => result.fcmToken)
      // console.log(fcmTokens)

      let message = {
        tokens: fcmTokens,
        data : {
          content: itemName,
          type: "LOST_NOTIFICATION",
          item_uuid: itemId
        }
      }

      try {
        let result = await messaging.sendMulticast(message)
        return result
      } catch(e) {
        console.warn(e)
        throw new Error('Internal Server Error')
      }
  }

  static async sendContactChecked(author, itemName, itemId) {
    let user = await UserModel.getUser(author)
    let message = {
      token: user.fcmToken,
      data : {
        content: itemName,
        type: "CONTACT_CHECKED",
        item_uuid: itemId
      }
    }
    
    try {
      let result = await messaging.send(message)
      return result
    } catch(e) {
      console.warn(e)
      throw new Error('Internal Server Error')
    }
  }
}