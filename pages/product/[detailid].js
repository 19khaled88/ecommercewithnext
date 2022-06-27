import Head from 'next/head';
import { useContext, useState } from 'react';
import { Image } from 'semantic-ui-react';
import { addToCart } from '../../store/Actions';
import { DataContext } from '../../store/GlobalState';
import { getSingleData } from '../../utils/fetchData';
const DetailProduct = (props) => {
  const [detailProduct, setDetailProduct] = useState(props.product)
  const [state, dispatch] = useContext(DataContext)
  const {cart} = state

  // console.log(cart)
  return (
    <div className='row detail_page'>
      <Head>
        <title>Details Product</title>
      </Head>
      <div className='col-md-6'>
        <Image src={detailProduct.images} alt="" className="d-block img-thumbnail rounded mt-4 w-100" style={{height:'350px'}} />
      </div>
      <div className='col-md-6 mt-3'>
        <h2 className='text-uppercase'>{detailProduct.title}</h2>
        <h2 className='text-danger'>{detailProduct.price}</h2>
        <div className='row mx-0 d-flex justify-content-between'>
          {
            detailProduct.inStock>0 
            ? <h6 className='text-danger'>In Stock: {detailProduct.inStock}</h6>
            : <h6 className='text-danger'>Out Stock</h6>

          }

          <h6 className='text-danger'>Sold: {detailProduct.sold}</h6>
        </div>  
        <div className='my-2'>{detailProduct.description}</div>
        <div className='my-2'>{detailProduct.content}</div>

        <button 
        type='button' 
        className='btn btn-dark bg-rose-400 d-block my-3 px-5'
        disabled = {detailProduct.inStock === 0 ? true:false}
        onClick={()=>dispatch(addToCart(detailProduct, cart))}
        >
        Buy
        </button>

      </div>
    </div>
  );
}

export async function getServerSideProps({params:{detailid}}){
    const res = await getSingleData(`products/${detailid}`) 
       return{
        props:{
            product : res.product,
            // result: res.result
        }
    }
}

export default DetailProduct;
