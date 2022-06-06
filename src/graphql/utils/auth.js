import { UserInputError } from 'apollo-server-express'
import { JWTSecret } from '../../config/environment'
const jwt = require('jsonwebtoken')

const getUserFromToken = (token) => {
  try {
    if (token == null) { return null }

    if (!token.startsWith('Bearer '))
      throw new UserInputError('Bad token type')

    const tokenWithoutBearer = token.slice(7, token.length)

    const decoded = jwt.verify(tokenWithoutBearer, JWTSecret)
    return decoded.userId
  } catch (err) {
    throw new UserInputError('Bad authentication token')
  }
}

const createToken = (userId) => {
  const token = jwt.sign({ userId: userId }, JWTSecret)
  return token
}

export { getUserFromToken, createToken }
