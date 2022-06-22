import jwt from 'jsonwebtoken'

export const accessTokenCreate = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: '10m' })
}

export const refreshTokenCreate = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN, { expiresIn: '7d' })
}
