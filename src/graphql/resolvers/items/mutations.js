import { AuthenticationError, UserInputError } from 'apollo-server-express'
import ItemsModel from '../../../models/itemsModel'
import MessagingModel from '../../../models/messagingModel'

const itemMutations = {
  newItem: async (_, args, context) => {
    const userId = context.userId
    if (!userId) { throw new AuthenticationError('You must be logged in to create an item.') }

    const newItem = args

    newItem.images_txt = newItem.images.join(',')

    const item = await ItemsModel.newItem(newItem, userId)

    item.isMine = item.author === userId
    item.images = item.images === '' ? [] : item.images.split(',')

    delete item.author
    delete item.contact
    delete item.createdAt

    if (newItem.who !== undefined) {
      MessagingModel.sendLost(newItem.who, item)
    }

    MessagingModel.sendInserted(userId, item.name, item.uuid, item.type)

    return item
  },
  endItem: async (_, args, context) => {
    const userId = context.userId
    if (!userId) { throw new AuthenticationError('You must be logged in to end an item.') }

    const { itemId } = args
    const item = await ItemsModel.getItem(itemId)

    if (item == null) { throw new UserInputError('Item not found.') }

    if (item.author !== userId) { throw new AuthenticationError('You are not the author of this item.') }

    const endedItem = await ItemsModel.setResolved(itemId)

    endedItem.isMine = endedItem.author === userId
    endedItem.images = endedItem.images === '' ? [] : endedItem.images.split(',')

    delete endedItem.author
    delete endedItem.contact
    delete endedItem.createdAt

    return endedItem
  }
}

export default itemMutations
