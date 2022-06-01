import { createTestClient } from 'apollo-server-testing'
import { gql } from 'apollo-server'
import graphqlServer from '../graphql'

const GET_VERSION = gql`
query Query {
    version
}
`

describe('[Queries.Version]', () => {
  it('Get version', async () => {
    const { query } = createTestClient(graphqlServer)

    const res = await query({
      query: GET_VERSION
    })

    expect(res).toMatchSnapshot()
  })
})
