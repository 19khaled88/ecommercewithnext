import { useRouter } from "next/router";
import { useRef, useState } from 'react';
import { UserPageLayout } from "./";
const AddPage = () => {
  const router = useRouter()
  const {user} = router.query
  const [productName, setProductName] = useState('')
  const [ProductPrice, setProductPrice] = useState('')
  const [ProductDescription, setProductDescription] = useState('')
  const [ProductContent, setProductContent] = useState('')
  const [ProductCategory, setProductCategory] = useState('')
  const [ProductChecked, setProductChecked] = useState('')
  const [ProductInStock, setProductInStock] = useState('')
  const [ProductSold, setProductSold] = useState('')

  const [image, setImage]= useState(null)
  const [createObjectURL, setCreateObjectURL] = useState(null)

 const cloudinaryLink ='CLOUDINARY_URL=cloudinary://128215362951182:WbNw7UjHKSAm3axm7bJCCnAhSr8@be-fresh-ltd'
 const API_SECRETE = 'WbNw7UjHKSAm3axm7bJCCnAhSr8'
 const API_KEY='128215362951182'
 const CLOUD_NAME='be-fresh-ltd'


  const imageRef = useRef('')
  const imageHandle=(e)=>{
    if(e.target.files && e.target.files[0]){
      const i = e.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i))
    }
  }
  const formHandler=async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', image);
    formData.append('upload_preset',"daamw3ao")
    
    const data = await fetch('https://api.cloudinary.com/v1_1/be-fresh-ltd/image/upload',{
      method:'POST',
      body:formData
      }).then(res=> res.json() )
    const url = data.url 
    const serure_url = data.secure_url 
    const public_id = data.public_id
    const productData ={
      title:productName,
      price:ProductPrice,
      description:ProductDescription,
      content:ProductContent,
      images:url,
      category:ProductCategory,
      checked:ProductChecked,
      inStock:ProductInStock,
      sold:ProductSold
    }
    if(url && public_id){
      const res = await postData('auth/authenticate', productData)
    }
  }

  return (
    <div className="pb-24">
      <section className="px-5 pt-3 pb-4">
        <h3 className="border-2 rounded-md h-10 text-2xl text-center" style={{backgroundColor:'#f8ffff'}}>
         Add Page
        </h3>
      </section>

      <section className="lg:px-64 px-12 ">
      <form onSubmit={formHandler} className="ui form">
        <div className="unstackable two fields">
          <div className="field">
           <label>Product name</label>
            <div className="ui input">
              <input onChange={(e)=>productName(e.target.value)}  type="text" placeholder="Product name"/>
            </div>
          </div>
          <div className="field">
            <label>Product price</label>
            <div className="ui input">
             <input onChange={(e)=>setProductPrice(e.target.value)} type="number" placeholder="Product price"/>
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Description</label>
            <div className="ui input">
             <input onChange={(e)=>setProductDescription(e.target.value)} type="text" placeholder="Description"/>
            </div>
          </div>
          <div className="field">
            <label>Content</label>
            <div className="ui input">
              <input onChange={(e)=>setProductContent(e.target.value)} type="text" placeholder="Content"/>
            </div>
          </div>
        </div>
        <div className="two fields">
          <div className="field">
            <label>Category</label>
            <div className="ui input">
             <select onChange={(e)=>setProductCategory(e.target.value)}>
             <option value="laptop">Laptop</option>
             <option value="printer">Printer</option>
             <option defaultValue="desktop">Desktop</option>
             </select>
            </div>
          </div>
          <div className="field">
            <label>Checkced</label>
            <div className="ui input">
             <select onChange={(e) => setProductChecked(e.target.value)}>
              <option value="true">True</option>
              <option defaultValue={false}>False</option>
             </select>
            </div>
          </div>
        </div>
        <div className="field">
            <label>Image</label>
            <div className="ui input">
              <input onChange={imageHandle} type="file" placeholder="Checkced"/>
            </div>
            {
              createObjectURL ? <img className="w-64 h-24" src={createObjectURL} />:''
            }
            
        </div>
        <div className="two fields">
          <div className="field">
            <label>InStock</label>
            <div className="ui input">
             <input onChange={(e)=>setProductInStock(e.target.value)} type="number" placeholder="InStock"/>
            </div>
          </div>
          <div className="field">
            <label>Sold</label>
            <div className="ui input">
              <select onChange={(e)=>setProductSold(e.target.value)}>
              <option value="0">Sold out</option>
              <option defaultValue="1">Not sold out</option>
              </select>
            </div>
          </div>
        </div>
       
        <button style={{float:'right',backgroundColor:'#fff6f6'}} className="ui button px-5 border" type="submit">Submit</button>
      </form>
      </section>
    </div>
  );
}

AddPage.getLayout = UserPageLayout
export default AddPage;
