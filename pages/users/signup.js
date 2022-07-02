import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import { postData } from '../../utils/fetchData'
import { val } from '../../utils/validate'
const Signup = () => {
  const router = useRouter()
  const [state, dispatch] = useContext(DataContext)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [c_password, setC_password] = useState('')
 
  const { auth } = state
 
  const handleChangeInput = async (e) => {
    e.preventDefault()
    const userData = {
      name: name,
      email: email,
      password: password,
      c_password: c_password,
    }
    const errorMessage = val(name, email, password, c_password)
    if (errorMessage) {
      return dispatch({ type: 'NOTIFY', payload: { error: errorMessage } })
    } else {
      dispatch({ type: 'NOTIFY', payload: { loading: true } })
      const res = await postData('auth/signuplogic', userData)
      if (res.success === true) {
        
        router.push('/users')
       
        dispatch({ type: 'NOTIFY', payload: { loading: false } })
        dispatch({
          type: 'AUTH',
          payload: {
            token: res.accessToken,
            user: res.user,
          },
        })
        Cookies.set('refreshToken', res.refreshToken, {
          //path: 'api/auth/accessToken',
          expires: 7,
          path: 'api/auth/token',
        })
        localStorage.setItem('FirstLogin', true)
      } else {
        dispatch({ type: 'NOTIFY', payload: { loading: false } })
      }
    }
  }
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/')
  }, [auth,router])
  return (
    <div>
      <Head>
        <title>Sign Up Page</title>
      </Head>
      <section className='pt-24'>
      <p className='text-center text-3xl font-bold'>Register Page</p>
      <form
        onSubmit={handleChangeInput}
        className="mx-auto my-4"
        style={{ maxWidth: '500px' }}
      >
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            onChange={(e) => setC_password(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary border-0 px-4 bg-red-400">
          Register
        </button>
      </form>
      </section>
    </div>
  )
}

export default Signup
