import { UserInputError } from 'apollo-server-express'
import { JWTSecret } from '../../config/environment'
const jwt = require('jsonwebtoken')

const getUserFromToken = (token) => {
  try {
    if (token == null) { return null }

    const decoded = jwt.verify(token, JWTSecret)
    return decoded.userId
  } catch (err) {
    throw UserInputError('Bad authentication token')
  }
}

const createToken = (userId) => {
  const token = jwt.sign({ userId: userId }, JWTSecret)
  return token
}

export { getUserFromToken, createToken }
