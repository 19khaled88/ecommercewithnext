import { createContext, useEffect, useReducer } from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducer'
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {},cart:[] }
  const [state, dispatch] = useReducer(reducers, initialState)
  const {cart} = state 
  
  useEffect(()=>{
    
    if(cart.length > 0){
      
      localStorage.setItem('cart_storage_next_js',JSON.stringify(cart))
    }
    
   
  },[cart])

  useEffect(()=>{
    const cart_storage_next_js = JSON.parse(localStorage.getItem('cart_storage_next_js'))
    if(cart_storage_next_js) dispatch({type: 'ADD_CART', payload:cart_storage_next_js})
  },[])

  useEffect(() => {
    const firstLogin = localStorage.getItem('FirstLogin')
    if (firstLogin) {
      getData('auth/token').then((res) => {
        if (res.err) return localStorage.removeItem('FirstLogin')

        dispatch({
          type: 'AUTH',
          payload: {
            token: res.tokenGenerated,
            user: res.user,
          },
        })
      })
    } else {
    }
  }, [])
  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
