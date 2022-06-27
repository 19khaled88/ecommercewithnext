import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import CartItem from '../components/cart/cartItem';
import { DataContext } from '../store/GlobalState';
const cart = () => { 
    const [total, setTotal] = useState(0)
    const [state, dispatch] = useContext(DataContext)
    const {cart,auth} = state
    
   

    useEffect(()=>{
        const getTotal =()=>{
           
            const res = cart.reduce((prev, item)=>{
                return prev + (item.price * item.quantity)
            },0)
            setTotal(res)
        }
        getTotal()
    },[cart])
   
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
                            cart.map(item=>(<CartItem key={item._id} item={item} dispatch={dispatch} cart={cart} />))
                        }
                    </tbody>
                </table>
            </div>
            <div className='col-md-4 my-3 text-uppercase'>
                <form>
                        <h2 className='text-center pb-3'>Shipping</h2>
                        <label htmlFor='address'>Address</label>
                        <input type='text' name='address' id='address' className='form-control mb-2' placeholder='address'/>
                        <label htmlFor='mobile'>Mobile</label>
                        <input type='text' name='mobile' id='mobile' className='form-control md-2'/>
               
                        </form>
                        <h3 className='pt-4 text-right'>Total: <span className='text-danger'>{total}</span></h3>
            
                        <Link href={auth.user ? '#' : '/users/signin'}>
                            <a className='text-green-600 font-bold btn btn-dark my-2'>Procceed with payment</a>
                        </Link>
                        </div>
        </div>
        </div>

    );
}

export default cart;
