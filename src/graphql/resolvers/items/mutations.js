import { AuthenticationError, UserInputError } from 'apollo-server-express';
import ItemsModel from '../../../models/itemsModel'

const itemMutations = {
  newItem: async (_, args, context) => {
    const userId = context.userId;
    if (!userId)
      throw AuthenticationError('You must be logged in to create an item.');

    const { newItem } = args;    

    newItem.images_txt = newItem.images.join(',');

    const item = await ItemsModel.newItem(newItem, userId);

    item.isMine = item.author == userId;
    item.images = item.images == ''? []: item.images.split(',');

    delete item.author;
    delete item.contact;
    delete item.createdAt;

    return item
  },
  endItem: async (_, args, context) => {
    const userId = context.userId;
    if (!userId)
      throw AuthenticationError('You must be logged in to end an item.');

    const { itemId } = args;
    const item = await ItemsModel.getItem(itemId);

    if (item.length == 0)
      throw UserInputError('Item not found.');

    if (item[0].author != userId)
      throw AuthenticationError('You are not the author of this item.');

    const endedItem = await ItemsModel.setResolved(itemId);

    endedItem.isMine = item.author == userId;
    item.images = item.images == ''? []: item.images.split(',');

    delete endedItem.author;
    delete endedItem.contact;
    delete endedItem.createdAt;

    return endedItem
  }
}

export default authorMutations
