import { port, env, secret, JWTSecret, db, version, api } from '../config/environment'

describe('[Environment]', () => {
  test('Apollo Server', () => {
    expect(version).not.toEqual('')
    expect(env).not.toEqual('')
    expect(port).not.toEqual('')
    expect(secret).not.toEqual('')
    expect(JWTSecret).not.toEqual('')
  })

  test('Database', () => {
    expect(db.host).not.toEqual('')
    expect(db.port).not.toEqual('')
    expect(db.name).not.toEqual('')
    expect(db.user).not.toEqual('')
  })

  test('api', () => {
    expect(api.host).not.toEqual('')
    expect(api.key).not.toEqual('')
  })
})
