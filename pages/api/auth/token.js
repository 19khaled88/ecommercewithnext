import jwt from 'jsonwebtoken'
import User from '../../../models/userModels'
import connectDB from '../../../utils/connectDB'
import {
  accessTokenCreate
} from '../../../utils/tokenGenerate'
connectDB()
export default async (req, res) => {
  try {
    const re_token = req.cookies.refreshToken
    if (!re_token) res.status(400).json({ err: 'Please login' })
    // console.log(re_token)
    const result = jwt.verify(re_token, process.env.REFRESH_TOKEN)
    if (!result) res.status(400).json({ err: 'your token is incorrect' })
    // console.log(result)
    const user = await User.findById(result.id)
    if (!user) return res.status(400).json({ err: 'User not found' })
    const tokenGenerated = accessTokenCreate({ id: user._id })
    res.json({
      tokenGenerated,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root,
      },
    })
  } catch (error) {
    return res.status(500).json({ err: error.message })
  }
}
