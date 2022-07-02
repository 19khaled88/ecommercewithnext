import jwt from "jsonwebtoken";

import Users from '../models/userModels';


const auth = async (req,res)=>{
    const token = req.headers.authorization;
    if(!token) return res.status(400).json({err: 'Invalid authorization'})

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN)
    if(!decoded) return res.status(400).json({err:'Invalid authorization'})

    const user = await Users.findOne({_id: decoded.id})

    return {id:user._id};
}

export default auth;
