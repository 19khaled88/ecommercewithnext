import bcrypt from 'bcrypt'
import Cors from 'cors'
import { useRouter } from 'next/router'
import User from '../../../models/userModels'
import connectDB from '../../../utils/connectDB'
connectDB()
const cors = Cors({
  methods:['GET','HEAD','POST','PUT']
})

const Authenticate = async (req, res) => {
  const { method } = req
  const router = useRouter()

  switch (method) {
    case 'GET':
      try {
        const { email } = req.body
        const users = await User.find({})
        const foundUser = users.find((e) => e.email === email)
        if (foundUser) {
          res.status(200).json({ success: true, data: users })
        } else {
          res.status(400).json({ success: false, msg: 'User not found!' })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
       
        const { name, email, password, c_password } = req.body
      
        const allUser = await User.find({})
        const foundUser = allUser.find((e) => e.email === email)
       console.log(foundUser)
        if (foundUser) {
          res.status(400).json({ success: false, msg: 'User already exist' })
        } else {
          const passwordHash = await bcrypt.hash(password, 12)
          const user = await User.create({
            name,
            email,
            password: passwordHash,
          })
          res
            .status(201)
            .json({ success: true, msg: 'Registration successful', data: user })
        }
      } catch (error) {
        res.status(400).json({ success: false, err: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export default Authenticate
