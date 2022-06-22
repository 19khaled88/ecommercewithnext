import bcrypt from 'bcrypt'
import User from '../../../models/userModels'
import connectDB from '../../../utils/connectDB'
import {
  accessTokenCreate, refreshTokenCreate
} from '../../../utils/tokenGenerate'

connectDB()

export default async (req, res) => {
  const { method } = req
 
  switch (method) {
    case 'POST':
      try {
        const { email, password } = JSON.parse(req.body)
        const user = await User.findOne({ email })
   
        if (!user)
          return res
            .status(400)
            .json({ success: false, err: 'This user does not exist' })
        const passwordMatch = await bcrypt.compare(password, user.password)
        
        if (!passwordMatch)
          return res
            .status(400)
            .json({ success: false, err: 'Password is incorrect' })

        const accessToken = accessTokenCreate({ id: user._id })
        const refreshToken = refreshTokenCreate({ id: user._id })
        res.status(200).json({
          msg: 'Login Successful',
          success: true,
          accessToken,
          refreshToken,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            root: user.root,
          },
        })

        // const users = await User.find({})
        // const foundUser = users.find((e) => e.email === email)
        // if (foundUser) {
        //   res.status(200).json({ success: true, data: users })
        // } else {
        //   res.status(400).json({ success: false, msg: 'User not found!' })
        // }
      } catch (error) {
        res.status(400).json({ success: false,err:error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
