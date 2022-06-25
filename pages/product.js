import Head from 'next/head'
import { useState } from 'react'
import ProductItem from '../components/product/ProductItem'
import { getData } from '../utils/fetchData'
const Product = (props) => {
  const [products, setProducts] = useState(props.product)
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      <div className='grid grid-cols-5 gap-6 pt-4'>
        {products.length === 0 ? (
          <h2>No Products</h2>
        ) : (
          products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default Product

export async function getServerSideProps() {
  const res = await getData('products')
  console.log(res)
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}
