import { ApolloServer } from 'apollo-server-express'
import { env, secret } from '../config/environment'
import schema from './utils/schema'
import { getUserFromToken } from './utils/auth'
import dateScalar from './scalars/dateScalar'

const apolloServer = new ApolloServer({
  schema,
  secret: secret,
  playground: env.development,
  context: ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || null;
 
    // Try to retrieve a user with the token
    const userId = getUserFromToken(token);
 
    // Add the user to the context
    return { userId };
  },
  resolvers: {
    Date: dateScalar
  }
})

export default apolloServer
