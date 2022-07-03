import Products from '../../../models/useProduct'
import connectDB from '../../../utils/connectDB'

connectDB()

const ProductHandle = async (req, res) => {
  switch (req.method) {
    case 'GET':
      //   await getProducts(req, res)
      try {
        const products = await Products.find()
        res.json({
          status: 'success',
          result: products.length,
          products,
        })
      } catch (error) {
       
        return res.status(500).json({ success: false, err: error.message })
      }
      break
    case 'POST':
      try {
        const {title, price,description,content,images,category,checked,inStock,sold} = req.body
        // console.log(title)
        // console.log(price)
        // console.log(description)
        // console.log(content)
        // console.log(images)
        // console.log(category)
        // console.log(checked)
        // console.log(inStock)
        // console.log(sold)
        const product = await Products.create({
          title, price,description,content,images,category,checked,inStock,sold
        })
        res.status(201).json({ success: true, msg: 'Inserted successful', data: product })
      } catch (error) {
       
        return res.status(500).json({success:false,err:error.message})
      }
      break 
    case 'PUT':
      try {
       
        const updated = await Products.findOneAndUpdate({_id:req.body.id},req.body.info,{new:true}).exec();
        if(updated){
          res.status(200).json({message:'Update successful'})
        }
        res.status(401).json({message:'Not successful'})
      } catch (error) {
        res.json({message:'Error:'+error})
      }
      break
    default:
      res.status(500).json({ success: false })
      break
  }

}
export default ProductHandle

