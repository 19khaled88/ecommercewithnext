// import auth from '../../../middleware/auth'

import Users from '../../../models/userModels'
import connectDB from '../../../utils/connectDB'
connectDB()



 
const AllUseres = async (req, res)=>{
    switch(req.method){
        case 'GET':
            try {
                const users = await Users.find()
                  res.json({
                        status: 'success',
                        result: users.length,
                        users,
                  })
            } catch (error) {
                res.status(400).json({err:error.message})
            }
            break;
        case 'DELETE':
                try {
                    const {id} =req.body
                    const users = await Users.findByIdAndDelete({_id:id})
                    if(users){
                        const result = await Users.find()
                        res.status(200).json(result)
                    }
                    
                } catch (error) {
                    res.status(400).json({err:error.message})
                }
            break;
        case 'PUT':
            try { 
                const users = await Users.findOneAndUpdate({_id:req.body.newId.id},req.body.newArray,{new:true}).exec();
                if(users){
                   const users = await Users.find()
                   res.status(200).json(users)
                }
            } catch (error) {
                res.status(400).json({err:'Update unsuccessful'})
            }
            break
        default:
            res.status(400).json({err:'No user found'})
            break;
        
    }

}

export default AllUseres