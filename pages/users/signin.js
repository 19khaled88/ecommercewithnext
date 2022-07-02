import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../store/GlobalState'
import { login } from '../../utils/fetchData'
import { loginValidate } from '../../utils/validate'
const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [state, dispatch] = useContext(DataContext)
  const router = useRouter()
  const { auth } = state
  const loginHandler = async (e) => {
    e.preventDefault()
    const userData = { email, password }
    const errorMessage = loginValidate(email, password)
    if (errorMessage) {
      dispatch({ type: 'NOTIFY', payload: { error: errorMessage } })
    } else {
      dispatch({ type: 'NOTIFY', payload: { loading: true } })
      const res = await login('auth/loginUrl', userData)
      if (res.success === true) {
        router.push('/users')
        dispatch({ type: 'NOTIFY', payload: { msg: res.msg, loading: false } })
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
      } else if (res.success === false) {
        router.push('/users/signin')
        dispatch({ type: 'NOTIFY', payload: { loading: false } })
      }
    }
  }
  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/users')
  }, [auth,router])
  return (
    <div>
      <Head>
        <title>Sign In Page</title>
      </Head>
      <section className='pt-24'>
      <p className='text-center text-3xl font-bold'>Login Page</p>
      <form
        onSubmit={loginHandler}
        className="mx-auto my-4"
        style={{ maxWidth: '500px' }}
      >
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

        <button type="submit" className="btn btn-primary border-0 px-4 bg-red-400">
          Login
        </button>
      </form>
      </section>
    </div>
  )
}

export default Signin
