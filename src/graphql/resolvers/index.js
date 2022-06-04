import { itemMutations, itemQueries } from './items'
import { userMutations } from './user'
import { versionQueries } from './version'

const resolvers = {
  Query: {
    ...versionQueries,
    ...itemQueries
  },
  Mutation: {
    ...itemMutations,
    ...userMutations
  }
}

export default resolvers
