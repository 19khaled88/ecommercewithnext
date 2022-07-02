import { createContext, useEffect, useReducer } from 'react'
import { getData } from '../utils/fetchData'
import reducers from './Reducer'
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {},cart:[],userList:[] }
  const [state, dispatch] = useReducer(reducers, initialState)
  const {cart,deletedUserId,EditedUserId} = state 

  useEffect(()=>{
    getData('userList').then(res=>{
      if(res.err){

      }
      // console.log(res)
      dispatch({type:'USER_LIST',payload:{users:res.users},})
    })
  },[])
  
  useEffect(()=>{
    if(cart.length > 0){
      localStorage.setItem('cart_storage_next_js',JSON.stringify(cart))
    }
    else if( cart === 0 || cart < 0){
     
      localStorage.removeItem('cart_storage_next_js')
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
  },[])

 

  return (
    <DataContext.Provider value={[state, dispatch]}>
      {children}
    </DataContext.Provider>
  )
}
