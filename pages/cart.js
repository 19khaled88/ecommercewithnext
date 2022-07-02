import Head from 'next/head';
import { useContext, useEffect, useRef, useState } from 'react';
import { Image } from 'semantic-ui-react';
import CartItem from '../components/cart/cartItem';
import { DataContext } from '../store/GlobalState';
import Checkcout from './product/checkout';

const Cart = () => { 
    
    const [total, setTotal] = useState(0)
    const [address,setAddress]=useState(false)
    const [state, dispatch] = useContext(DataContext)
    const {cart,auth} = state

    const addressRef    = useRef(null)
    const mobileRef     = useRef(null)
   
    useEffect(()=>{
        const getTotal =()=>{
            const res = cart.reduce((prev, item)=>{
                return prev + (item.price * item.quantity)
            },0)
            setTotal(res)
        }
        getTotal()
    },[cart])

    const submitForm=(e)=>{
        e.preventDefault()
        const addRef = addressRef.current.value 
        const mobRef = mobileRef.current.value 
       
        if(addRef.length !== 0 && mobRef.length !== 0){
            setAddress(true)
        }else if(addRef.length === 0 || mobRef === 0){
            return dispatch({type:'NOTIFY',payload:{error:'Please provide your address and name'}})
            // alert('Please provide your address and mobile')

        }
        // href={auth.user ? '/product/checkout' : '/users/signin'}
    }
   
    if(cart.length === 0) return <Image className='w-auto flex mx-auto' src="/empty_cart.png" alt="empty-cart"/>


    return (
        <div>
        <Head><title>Cart Page</title></Head>
        <div className='flex flex-row'>
            <div className='col-md-8 text-secondary table-responsive my-3'>
                <h2 className='text-uppercase'>Shopping Cart</h2>
                <table className='table my-3'>
                    <tbody>
                        {
                          cart.map(item=>(<CartItem key={item._id} item={item} dispatched={dispatch} cart={cart} />))
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-md-4 my-3 text-uppercase'>
                <form onSubmit={submitForm}>
                        <h2 className='text-center pb-3'>Shipping</h2>
                        <label htmlFor='address'>Address</label>
                        <input ref={addressRef} type='text' name='address' id='address' className='form-control mb-2' placeholder='address'/>
                        <label htmlFor='mobile'>Mobile</label>
                        <input ref={mobileRef} type='text' name='mobile' id='mobile' className='form-control md-2'/>
                
                        <h3 className='pt-4 text-right'>Total: <span className='text-danger'>{total}</span></h3>
                        {
                            address 
                            ? <Checkcout state={state} dispatch={dispatch} total={total} address={addressRef.current.value} mobile={mobileRef.current.value} /> 
                            : <button className='text-green-600 font-bold btn btn-dark my-2'>Procceed with payment</button>
                            
                        }
                       
                </form>
            </div>
        </div>
        </div>

    );
}

export default Cart;
