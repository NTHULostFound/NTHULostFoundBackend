import { versionQueries } from './version'
import { authorQueries, authorMutations } from './author'

const resolvers = {
  Query: {
    ...versionQueries,
    ...authorQueries
  },
  Mutation: {
    ...authorMutations
  }
}

export default resolvers
