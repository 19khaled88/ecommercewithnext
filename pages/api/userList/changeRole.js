
import Users from '../../../models/userModels';
import connectDB from '../../../utils/connectDB';
connectDB()

const ChangeUserrole=async(req,res)=>{
    switch(req.method){
        case 'PUT':
            try {
                const role = {role:req.body.role}
                const user = await Users.findOneAndUpdate({_id:req.body.id},role,{new:true}).exec();
            } catch (error) {
                res.status(400).json({err:error.message})
            }
            break;
        default:
            res.status(400).json({err:'no change'})
            break;
    }
}

export default ChangeUserrole;