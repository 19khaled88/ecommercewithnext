import Orders from '../../../models/orderModel'
import connectDB from '../../../utils/connectDB'

connectDB()

const OrderHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      //   await getProducts(req, res)
      try {
        const orders = await Orders.find()
        res.json({
          status: 'success',
          result: orders.length,
          orders,
        })
      } catch (error) {
        return res.status(500).json({ success: false, err: error.message })
      }
      break
    default:
      res.status(500).json({ success: false })
      break
  }

}
export default OrderHandler

