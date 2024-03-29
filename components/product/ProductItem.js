// import { useRouter } from 'next/router';
// import Router from 'next/router';
import { Image } from 'semantic-ui-react'
// import Link from "next/link";
// import Image from 'next/image'
const ProductItem = ({ product }) => {
  // const router = useRouter()
  // const detailsHandler=(id)=>{

  //   Router.push({ pathname: 'product/[id]', state: { id: id } });
  // }

  return (
    <div className="card" style={{ width: '18rem' }}>
      <p className="mt-1 rounded-md text-2xl border  mx-auto py-0 px-2 h-8 flex items-center justify-center">
        {product.category}
      </p>
      <Image
        style={{ width: '190px', height: '150px', margin: 'auto' }}
        className="card-img-top h-56 py-2 px-2"
        src={product.images}
        alt="Card image cap"
      />
      <div
        className="card-body relative flex flex-col"
        style={{ marginTop: '0', paddingTop: '0', width: '100%' }}
      >
        <div>
          <h5 className="card-title text-base">{product.title}</h5>
          <p className="card-text text-sm text-left text-gray-500">
            <span className="text-fuchsia-600">Description</span>:{' '}
            {product.description}
          </p>
          <p className="card-text text-sm text-left text-gray-500">
            <span className="text-fuchsia-600">Content</span>: {product.content}
          </p>
          <div className="text-base flex flex-row justify-between">
            <span className="text-fuchsia-600">
              <span className="pr-2">Price:</span>
              {product.price}
            </span>
            <span className="text-fuchsia-600">
              <span className="pr-2"> Stock:</span>
              {product.inStock}
            </span>
          </div>
          <span className="text-base float-left">
            {product.sold === 1 ? 'Stock available' : 'Stock empty'}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            width: '90%',
            margin: 'auto',
          }}
          className="absolute bottom-0"
        >
          <div className="" style={{ float: 'left' }}>
            <a
              href={`/product/${product._id}`}
              className="btn btn-primary float-left "
            >
              Details
            </a>
          </div>

          <div className="" style={{ float: 'right' }}>
            <a href="#" className="btn btn-primary float-right ">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductItem
