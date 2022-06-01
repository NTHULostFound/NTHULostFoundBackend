import { join } from 'path'
import { readdirSync, readFileSync } from 'fs'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { gql } from 'apollo-server-core'
import resolvers from '../resolvers'

const gqlFiles = readdirSync(join(__dirname, '../typedefs'))

let typeDefsString = ''

gqlFiles.forEach((file) => {
  typeDefsString += readFileSync(join(__dirname, '../typedefs', file), {
    encoding: 'utf8'
  })
})

const typeDefs = gql(typeDefsString)

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default schema
