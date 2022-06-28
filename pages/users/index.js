import { useRouter } from 'next/router';
const UsersPage = ()=>{

  
  return <div className='container'>
          <p className='text-2xl pt-2'>This is the Teams landing page</p>
          <table className="ui single line table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Registration Date</th>
                <th>E-mail address</th>
                <th>Premium Plan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Lilki</td>
                <td>September 14, 2013</td>
                <td>jhlilk22@yahoo.com</td>
                <td>No</td>
              </tr>
              <tr>
                <td>Jamie Harington</td>
                <td>January 11, 2014</td>
                <td>jamieharingonton@yahoo.com</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>Jill Lewis</td>
                <td>May 11, 2014</td>
                <td>jilsewris22@yahoo.com</td>
                <td>Yes</td>
              </tr>
            </tbody>
          </table>
        </div>;
}
export const NestedLayout = ({children}) => {
  const router = useRouter()
  // const items=()=>{
  //   return (
  //     <>
  //       <button className=' bg-rose-400 lg:h-9 flex justify-center items-center rounded-md cursor w-full'>
  //         <Link href="/users/about">about</Link>
  //       </button>
  //       <button className='border--0 bg-rose-400 lg:h-9 flex justify-center items-center rounded-md cursor w-full'>
  //         <Link href="/users/contact">contact</Link>
  //       </button>
  //     </>
  //   )
  // }
  const navHandler=(data)=>{
    if(data === 'user'){
      router.push('/users')
    }else if(data === 'dashboard'){
      router.push('/users/home')
    }
  }
 
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="bg-purple-200  h-14 flex justify-center items-center font-semibold uppercase"
      >
        Product Management Panel
      </header>
      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="bg-fuchsia-100 w-full lg:w-52">
          <nav>
            <ul>
              <ol className='flex flex-col gap-y-3 justify-center items-center pt-2 px-2'>
                <button onClick={()=>navHandler('user') } className='text-2xl bg-rose-400 h-10 lg:h-9 flex pl-3 justify-start items-center rounded-md cursor w-full'>
                  Users
                </button>
                <button onClick={()=>navHandler('dashboard') } className='text-2xl bg-rose-400 h-10 lg:h-9 flex pl-3 justify-start items-center rounded-md cursor w-full'>
               Dashboard
              </button>
              </ol>
            </ul>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}
export const UsersPageLayout = (page)=><NestedLayout>{page}</NestedLayout>
UsersPage.getLayout = UsersPageLayout;


export default UsersPage
