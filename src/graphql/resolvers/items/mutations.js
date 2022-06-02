import AuthorModel from '../../../models/authorModel'
import connectPool from '../../../database'

const itemMutations = {
  createAuthor: async (_, args) => {
    const userId = await AuthorModel.createUser(connectPool, args.author)
    const user = await AuthorModel.selectUser(connectPool, userId)

    return user
  },
  updateAuthor: async (_, args) => {
    const userId = await AuthorModel.updateUser(connectPool, args, args.author)
    const user = await AuthorModel.selectUser(connectPool, userId)

    return user
  },
  deleteAuthor: async (_, args) => {
    const req = await AuthorModel.deleteUser(connectPool, args.userId)

    return req
  }
}

export default authorMutations
