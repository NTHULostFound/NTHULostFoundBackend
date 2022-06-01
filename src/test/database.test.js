import connectionDB from '../database'

describe('[Connection.Database]', () => {
  it('Connection.', async () => {
    expect(connectionDB).not.toBeUndefined()
  })
})
