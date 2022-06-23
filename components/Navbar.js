import Cookie from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { Image } from 'semantic-ui-react'
import { DataContext } from '../store/GlobalState'
const Navbar = () => {
  const router = useRouter()
  const [state, dispatch] = useContext(DataContext)
  const { auth } = state
  

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    // const storage = localStorage.getItem('FirstLogin')
    // if (auth) {
    //   dispatch({ type: 'AUTH', payload: {} })
    //   dispatch({ type: 'NOTIFY', payload: { success: 'Logged out' } })
    // }
  }
  // const storage = localStorage.getItem('FirstLogin')
  // if (auth) {
  //   if (storage) {
  //     localStorage.removeItem('FirstLogin')
  //   }
  //   dispatch({ type: 'AUTH', payload: {} })
  //   dispatch({ type: 'NOTIFY', payload: { success: 'Logged out' } })
  // }
  const isActive = (r) => {
    if (r === router.pathname) {
      return ' active'
      // console.log('active')
    } else {
      return ''
    }
  }
  const handleLogout = () => {
    if (typeof window !== undefined) {
      Cookie.remove('refreshToken', {
        path: 'api/auth/token',
      })
      const storage = localStorage.getItem('FirstLogin')
      if (storage) {
        localStorage.removeItem('FirstLogin')
      }

      dispatch({ type: 'AUTH', payload: {} })
      dispatch({ type: 'NOTIFY', payload: { success: 'Logged out' } })
      router.push('/')
    }
  }
  let image;
  if(auth){
   const change =  Object.entries(auth)
   image = change.map(item=> console.log(item[1].avatar))
  }
  console.log(image)
  return (
    <div className="">
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex">
        <div>
          <Link href="/">
            <a className="navbar-brand">E-commerce Site</a>
          </Link>
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-flex lg:justify-end"
          id="navbarSupportedContent"
        >
          <div className=" d-flex ">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link href="/">
                  <a
                    className={
                      'nav-link d-flex flex-row align-items-center' +
                      isActive('/home')
                    }
                    style={{ width: 80 }}
                  >
                    <svg
                      className='mr-1'
                      style={{ width: 15, height: 15 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z" />
                    </svg>
                    Home
                  </a>
                </Link>
              </li>
              <li className="nav-item flex flex-row relative">
                <Link href="/cart">
                  <a
                    className={
                      'nav-link d-flex flex-row align-items-center' +
                      isActive('/cart')
                    }
                    style={{ width: 80 }}
                  >
                    <svg
                      className='mr-1'
                      style={{ width: 15, height: 15 }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                    </svg>
                    Cart
                  </a>
                </Link>
                <span className="absolute right-6 top-1 inline-flex items-center w-4 h-4 justify-center px-2 py-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">9</span>
              </li>

              <li className="nav-item dropdown">
                <button
                  style={{ width: 80 }}
                  className="nav-link d-flex flex-row align-items-center dropdown-toggle"
                  href=""
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <svg 
                    className='mr-1'
                    style={{ width: 15, height: 15 }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M319.9 320c57.41 0 103.1-46.56 103.1-104c0-57.44-46.54-104-103.1-104c-57.41 0-103.1 46.56-103.1 104C215.9 273.4 262.5 320 319.9 320zM369.9 352H270.1C191.6 352 128 411.7 128 485.3C128 500.1 140.7 512 156.4 512h327.2C499.3 512 512 500.1 512 485.3C512 411.7 448.4 352 369.9 352zM512 160c44.18 0 80-35.82 80-80S556.2 0 512 0c-44.18 0-80 35.82-80 80S467.8 160 512 160zM183.9 216c0-5.449 .9824-10.63 1.609-15.91C174.6 194.1 162.6 192 149.9 192H88.08C39.44 192 0 233.8 0 285.3C0 295.6 7.887 304 17.62 304h199.5C196.7 280.2 183.9 249.7 183.9 216zM128 160c44.18 0 80-35.82 80-80S172.2 0 128 0C83.82 0 48 35.82 48 80S83.82 160 128 160zM551.9 192h-61.84c-12.8 0-24.88 3.037-35.86 8.24C454.8 205.5 455.8 210.6 455.8 216c0 33.71-12.78 64.21-33.16 88h199.7C632.1 304 640 295.6 640 285.3C640 233.8 600.6 192 551.9 192z" />
                  </svg>
                  User
                </button>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {Object.keys(auth).length > 0 && (
                    <Link href="/users">
                      <a
                        
                        className={'dropdown-item' + isActive('/user')}
                        style={{ width: 160 }}
                      >
                        <Image
                        className='w-5 h-5'
                        style={{
                          borderRadius: '50%',
                          transform: 'translateY(-3px)',
                          marginRight: '3px',
                          display:'inline'
                        }}
                        src={auth.user.avatar}
                        // width={500}
                        // height={500}
                        alt={auth.user.name}
                        />
                        User/Admin
                      </a>
                    </Link>
                  )}

                  {Object.keys(auth).length === 0 && (
                    <>
                      <Link href="/users/signin">
                        <a
                          className={'dropdown-item items-center flex' + isActive('/signin')}
                          style={{ width: 160 }}
                        >
                          <svg
                            className='di mr-2'
                            style={{ width: 12, height: 12,display:'inline' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
                          </svg>
                          Login
                        </a>
                      </Link>
                      <Link href="/users/signup">
                        <a
                          className={'dropdown-item items-center flex' + isActive('/signup')}
                          style={{ width: 160 }}
                        >
                          <svg
                          className='mr-2'
                            style={{ width: 12, height: 12,display:'inline' }}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 640 512"
                          >
                            <path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" />
                          </svg>
                          Register
                        </a>
                      </Link>
                    </>
                  )}

                  {Object.keys(auth).length > 0 && (
                    <>
                      <div className="dropdown-divider"></div>
                      <button
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleLogout()}
                      >
                        <a
                          className={'dropdown-item flex flex-row items-center' + isActive('/logout')}
                          style={{ width: 160 }}
                        >
                          <svg
                            
                            style={{ width: 12, height: 12,display:'inline',float:'left',marginRight:8}}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
                          </svg>
                          Logout
                        </a>
                      </button>
                    </>
                  )}
                </div>
              </li>
              <form className="form-inline my-2 my-lg-0 lg:ml-auto">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
