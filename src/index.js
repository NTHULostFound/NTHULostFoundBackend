import { httpServer, app } from './app'
import { port } from './config/environment'
import graphqlServer from './graphql'
import connectionDB from './database'

const main = async () => {
  try {
    await connectionDB

    await graphqlServer.start()
    graphqlServer.applyMiddleware({ app, path: '/graphql' })

    httpServer.listen(port, () => {
      console.log(`Server is now running on http://localhost:${port}/graphql`)
    })
  } catch (err) {
    console.log('Not able to run GraphQL server !')
    console.log(err)
  }
}

main()
