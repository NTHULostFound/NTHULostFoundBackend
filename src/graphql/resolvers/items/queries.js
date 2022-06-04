import AuthorModel from '../../../models/authorModel'
import connectPool from '../../../database'
import { UserInputError } from 'apollo-server-express';
import ItemsModel from '../../../models/itemsModel';

const itemQueries = {
  items: async (_, args, context) => {
    const { first, last, after, before, type, search, mine } = args;
    const userId = context.userId;

    if (!first && !last)
      throw UserInputError("Paging arguments must have either 'first' or 'last'")

    if (first && last)
      throw UserInputError("Paging arguments should not have both 'first' and 'last'")

    if (after && before)
      throw UserInputError("Paging arguments should not have both 'after' and 'before'")

    const filterAuthor = mine ? userId : null;
    const searchList = search ? search.split(' ') : null;

    const items = await ItemsModel.getItems({first, last, after, before}, type, false, filterAuthor, searchList);

    const itemsConnection = {
      edges: items.map(item => {
        item.isMine = item.author == userId;
        item.images = item.images == ''? []: item.images.split(',');

        const createdAt = item.createdAt;

        delete item.author;
        delete item.contact;
        delete item.createdAt;

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
    const { itemId } = args;
    const userId = context.userId;

    const item = await ItemsModel.getItem(itemId);

    if (item.length == 0)
      throw UserInputError('Item not found.');

    item[0].isMine = item[0].author == userId;
    item[0].images = item[0].images == ''? []: item[0].images.split(',');

    delete item[0].author;
    delete item[0].contact;
    delete item[0].createdAt;

    return item[0]
  },
  itemContact: async (_, args, context) => {
    const { itemId } = args;
    const userId = context.userId;

    const item = await ItemsModel.getItem(itemId);

    if (item.length == 0)
      throw UserInputError('Item not found.');

    // TODO: Send notification

    const itemContact = {
      contact: item[0].contact
    }

    return itemContact
  }
}

export default authorQueries
