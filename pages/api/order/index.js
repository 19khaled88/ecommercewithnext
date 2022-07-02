import auth from '../../../middleware/auth'
import Orders from '../../../models/orderModel'
import connectDB from '../../../utils/connectDB'
connectDB()

const Order = async (req,res)=>{
    switch(req.method){
        case "POST":
            try {
                const authenticated = await auth(req, res)
                const {address,mobile,cart,total} = req.body

                const createdOrder = new Orders({
                    user:authenticated.id,address,mobile,cart,total
                })
                const result = await createdOrder.save()
                if(result){
                //   await editData('cart')
                }
                // console.log(result)
                // if(res){
                //     sold(cart)
                // }
                res.json({
                    msg:'Payment is successful! We will reach you soon',
                    createdOrder
                })
            } catch (error) {
                return res.status(500).json({err:error.message})
            }
            break 
        default:
            return res.status(400).json({err:'Nothing happened'})
            break
    }
}








export default Order 

