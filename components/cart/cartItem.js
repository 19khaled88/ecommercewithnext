import Link from "next/link";
import { useContext } from "react";
import { Image } from "semantic-ui-react";
import { decrease, deleteHandler, increase } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
const CartItem = ({item,dispatched,cart}) => {
   
   const ls = JSON.parse(localStorage.getItem('cart_storage_next_js'))
   const [state, dispatch] = useContext(DataContext)
  //  const {cart} = state
   
   const decreaseValue=(getId,quantity)=>{
      for( let cartQt of ls){
      if(cartQt._id == getId && cartQt.quantity > 1){
        cartQt.quantity = cartQt.quantity - quantity
      }
     const setStorage = localStorage.setItem('cart_storage_next_js',JSON.stringify(ls))
    //  dispatch({type: 'ADD_CART', payload:cart_storage_next_js})
    }
   }
   const increaseValue=(getId, quantity)=>{
    for( let cartQt of ls){
      if(cartQt._id == getId){
        cartQt.quantity = cartQt.quantity + quantity
      }
      const cart_storage_next_js = localStorage.setItem('cart_storage_next_js',JSON.stringify(ls))
      // dispatch({type: 'ADD_CART', payload:[cart_storage_next_js]})
    }
   }

   
  return (
    <tr>
        <td>
            <Image 
            src={item.images} alt=""
            className="img-thumbnail w-100"
            style={{maxWidth:'80px', height:'80px'}}
             /> 
        </td>
        <td style={{minWidth:'200px'}} className="w-50 align-middle">
          <h5 className="text-capitalize text-secondary">
             <Link href={`/product/${item._id}`}>
                <a>{item.title}</a>
             </Link>
          </h5>
          <h6 className="text-danger">${item.price * item.quantity }</h6>
            {
                item.inStock > 0 
                ? <p className="mb-1 text-green">In Stock: {item.inStock}</p>
                : <p className="text-danger">Out stock</p>
            }
          
        </td>
        <td className="align-middle" style={{minWidth:'150px'}}>
            <button onClick={()=>dispatch(decrease(cart,item._id))}
             disabled = {item.quantity === 1 ? true : false}
             className={`btn btn-outline-secondary bg-green-400 ${item.quantity === 1 ? 'bg-dark' : ''}`}> - </button>
            <span className="pl-2 pr-2">{item.quantity}</span>
            <button onClick={()=>dispatch(increase(cart,item._id))} className="btn btn-outline-secondary"> + </button>
        </td>

        <td className="align-middle" style={{minWidth:'50px' ,cursor:'pointer',color:'red'}}>
            <svg onClick={()=>dispatch(deleteHandler(cart,item._id))} className="w-8 text-danger" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>
        </td>
    </tr>
  );
}

export default CartItem;
