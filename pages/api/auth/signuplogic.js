import bcrypt from 'bcrypt';
// import { useRouter } from 'next/router'
import Cors from 'cors';
import User from '../../../models/userModels';
import connectDB from '../../../utils/connectDB';
import { accessTokenCreate, refreshTokenCreate } from '../../../utils/tokenGenerate';
connectDB()

const cors = Cors({
  methods:['GET','HEAD','POST','PUT']
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const SignupLogic =async (req,res) => {
  await runMiddleware(req, res,cors)
    if(req.method === 'POST'){
        const { name, email, password, c_password } = req.body
      
        const allUser = await User.find({})
        const foundUser = allUser.find((e) => e.email === email)
      
        if (foundUser) {
          res.status(400).json({ success: false, msg: 'User already exist' })
        } else {
          const passwordHash = await bcrypt.hash(password, 12)
          const user = await User.create({
            name,
            email,
            password: passwordHash,
          })
            const accessToken = accessTokenCreate({ id: user._id })
            const refreshToken = refreshTokenCreate({ id: user._id })
         
          // console.log(user)
          res
            .status(200)
            .json({
               success: true, 
               msg: 'Registration successful', 
              
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
        }
    }
    res.status(400).json({err:'Registration has gone to failure'})
}

export default SignupLogic;
