import { ApolloServer } from 'apollo-server-express'
import { env, secret } from '../config/environment'
import schema from './utils/schema'

const apolloServer = new ApolloServer({
  schema,
  secret: secret,
  playground: env.development
})

export default apolloServer
