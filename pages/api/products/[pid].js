// import React from 'react';
import Products from '../../../models/useProduct'
import connectDB from '../../../utils/connectDB'
connectDB()
const SingleDataHandler =async (req,res) => {
   const {pid} = req.query
   try {
    if(req.method === 'GET'){
        const product = await Products.findById(pid)
        if(!product) return res.status(400).json({err:'This product does not exist'})
        res.status(200).json({product})
        
      }
      return false
   } catch (error) {
     res.status(400).json({success:false})
   }
 
  
}

export default SingleDataHandler;
