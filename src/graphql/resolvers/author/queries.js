import AuthorModel from '../../../models/authorModel'
import connectPool from '../../../database'

const authorQueries = {
  authors: async (_, args) => {
    const users = await AuthorModel.selectAll(connectPool)

    return users
  },
  author: async (_, args) => {
    const user = await AuthorModel.selectUser(connectPool, args.userId)

    return user
  }
}

export default authorQueries
