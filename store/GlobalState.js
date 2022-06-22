import { createContext, useEffect, useReducer } from 'react'
import reducers from './Reducer'
import { getData } from '../utils/fetchData'
export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const initialState = { notify: {}, auth: {} }
  const [state, dispatch] = useReducer(reducers, initialState)

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
