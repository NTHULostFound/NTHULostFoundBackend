import ItemsModel from '../../../models/itemsModel'

const itemMutations = {
  newItem: async (_, args) => {
    const userId = await AuthorModel.createUser(connectPool, args.author)
    const user = await AuthorModel.selectUser(connectPool, userId)

    return user
  },
  endItem: async (_, args) => {
    const userId = await AuthorModel.updateUser(connectPool, args, args.author)
    const user = await AuthorModel.selectUser(connectPool, userId)

    return user
  }
}

export default authorMutations
