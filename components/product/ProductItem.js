import Image from 'next/image'
const ProductItem = ({ product }) => {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <Image className="card-img-top" width={400} height={400} src="..." alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">Card title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card`&apos`s content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
  )
}

export default ProductItem
