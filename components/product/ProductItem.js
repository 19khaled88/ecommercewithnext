import { Image } from "semantic-ui-react"

// import Image from 'next/image'
const ProductItem = ({ product }) => {
  
  return (
    <div className="card" style={{ width: '18rem' }}>
      <p className="mt-1 rounded-md text-2xl border  mx-auto py-0 px-2 h-8 flex items-center justify-center">{product.category}</p>
      <Image 
        className="card-img-top h-56 py-2 px-2"
        src={product.images} 
        alt="Card image cap" />
      <div className="card-body relative">
        <h5 className="card-title text-base">{product.title}</h5>
        <p className="card-text text-sm text-left text-gray-500">
         <span className="text-fuchsia-600">Description</span>: {product.description}
        </p>
        <p className="card-text text-sm text-left text-gray-500">
        <span className="text-fuchsia-600">Content</span>: {product.content}
        </p>
        <div className="text-base flex flex-row justify-between">
          <span className="text-fuchsia-600"><span className="pr-2">Price:</span>{product.price}</span>
          <span className="text-fuchsia-600"><span className="pr-2"> Stock:</span>{product.inStock}</span>
        </div>
        <span className="text-base float-left">{product.sold === 1 ? 'Stock available':"Stock empty"}</span>
        <a href="#" className="btn btn-primary float-right absolute right-3 bottom-1">
          Add to Cart
        </a>
      </div>
    </div>
  )
}

export default ProductItem
