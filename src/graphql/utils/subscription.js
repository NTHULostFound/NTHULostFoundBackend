import { execute, subscribe } from 'graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { httpServer } from '../../app'
import schema from './schema'

/* eslint-disable new-cap */
const subscriptionServer = new SubscriptionServer.create({
  schema,
  execute,
  subscribe
}, {
  server: httpServer,
  path: '/graphql'
})

export default subscriptionServer
