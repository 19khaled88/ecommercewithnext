import { useEffect } from "react";
import { postData } from "../../utils/fetchData";

const Checkcout = ({total, address,mobile,state,dispatch}) => {
    const {auth} = state
    const cart =state.cart
    console.log(cart)

    useEffect(()=>{
       paypal.Buttons({
            // optional styling for buttons
            // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
            style: {
              color: "gold",
              shape: "rect",
              layout: "vertical"
            },
    
            // set up the transaction
            createOrder: (data, actions) => {
                // pass in any options from the v2 orders create call:
                // https://developer.paypal.com/api/orders/v2/#orders-create-request-body
                const createOrderPayload = {
                    purchase_units: [
                        {
                            amount: {
                                value: total
                            }
                        }
                    ]
                };
    
                return actions.order.create(createOrderPayload);
            },
    
            // finalize the transaction
            onApprove: (data, actions) => {
                const captureOrderHandler =async (details) => {
                    console.log(data,'Transaction completed');
                   
                    const payerName = details.payer.name.given_name;
                        dispatch({type:'NOTIFY',payload:{loading:true}})   
                        const result =   await postData('order',{address,total,mobile,cart},auth.token)
                      
                        if(!result) return dispatch({type: 'NOTIFY', payload:{error: res.err}})
                                const ls = localStorage.removeItem('cart_storage_next_js')
                                dispatch({type: 'ADD_CART', payload:[]}) 
                                dispatch({type:'NOTIFY',payload:{loading:false}})
                            // return dispatch({type:'NOTIFY',payload:{success:res.msg}})
                       
                     
                    //  .then(res=>{
                    //         console.log(res)
                    //         if(res.err) return dispatch({type: 'NOTIFY', payload:{error: res.err}})
                    //         const ls = localStorage.removeItem('cart_storage_next_js')
                    //         dispatch({type: 'ADD_CART', payload:[]}) 
                    //         return dispatch({type:'NOTIFY',payload:{success:res.msg}})
                    //     })
                           
                        return dispatch({type:'NOTIFY',payload:{success:'Transaction successful'}})
                                    
                };
    
                return actions.order.capture().then(captureOrderHandler);
            },
    
            // handle unrecoverable errors
            onError: (err) => {
                console.error('Transaction has gone to failure');
            }
        }).render("#paypal-button-container")
            .catch((err) => {
                console.error('Payment submit unsuccessful');
            });
    })
  return (
    <div className="flex flex-col justify-center">
      
      <div className="pt-16 mx-auto" id="paypal-button-container"></div>
    </div>
  );
}

export default Checkcout;
