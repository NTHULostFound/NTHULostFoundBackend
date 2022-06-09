import { UserInputError } from 'apollo-server-express'
import ItemsModel from '../../../models/itemsModel'
import MessagingModel from '../../../models/messagingModel'

const itemQueries = {
  items: async (_, args, context) => {
    const { first, last, after, before, type, search, mine } = args
    const userId = context.userId

    if (!first && !last) { throw new UserInputError("Paging arguments must have either 'first' or 'last'") }

    if (first && last) { throw new UserInputError("Paging arguments should not have both 'first' and 'last'") }

    if (after && before) { throw new UserInputError("Paging arguments should not have both 'after' and 'before'") }

    const filterAuthor = mine ? userId : null
    const searchList = search ? search.split(' ') : null

    const items = await ItemsModel.getItems({ first, last, after, before }, type, false, filterAuthor, searchList)

    const itemsConnection = {
      edges: items.edges.map(item => {
        item.isMine = item.author === userId
        item.images = item.images === '' ? [] : item.images.split(',')

        const createdAt = item.createdAt

        delete item.author
        delete item.contact
        delete item.createdAt

        return {
          cursor: ItemsModel.encodeCursor(createdAt),
          node: item
        }
      }),
      pageInfo: items.pageInfo
    }

    return itemsConnection
  },
  item: async (_, args, context) => {
    const { itemId } = args
    const userId = context.userId

    const item = await ItemsModel.getItem(itemId)

    if (item == null) { throw new UserInputError('Item not found.') }

    item.isMine = item.author === userId
    item.images = item.images === '' ? [] : item.images.split(',')

    delete item.author
    delete item.contact
    delete item.createdAt

    return item
  },
  itemContact: async (_, args, context) => {
    const { itemId } = args
    // const userId = context.userId

    const item = await ItemsModel.getItem(itemId)

    if (item == null) { throw new UserInputError('Item not found.') }

    // TODO: Send notification
    await MessagingModel.sendContactChecked(item.author, item.name, item.uuid)

    const itemContact = {
      contact: item.contact
    }

    return itemContact
  }
}

export default itemQueries
