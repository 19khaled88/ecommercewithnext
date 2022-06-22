import Products from '../../../models/useProduct'
import connectDB from '../../../utils/connectDB'

connectDB()

const ProductHandle = async (req, res) => {
  switch (req.method) {
    case 'GET':
      //   await getProducts(req, res)
      try {
        const products = await Products.find()
        console.log(products)
        res.json({
          status: 'success',
          result: products.length,
          products,
        })
      } catch (error) {
        console.log('no data')
        return res.status(500).json({ success: false, err: error.message })
      }
      break
    default:
      res.status(500).json({ success: false })
      break
  }
}
export default ProductHandle

// const getProducts = async (req, res) => {
//   try {
//     const products = await Products.find()
//     res.json({
//       status: 'success',
//       result: products.length,
//       products,
//     })
//   } catch (error) {
//     return res.status(500).json({ err: error.message })
//   }
// }
