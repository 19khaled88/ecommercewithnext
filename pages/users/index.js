import { useRouter } from 'next/router';
import { useState } from 'react';
import UserList from '../../components/users/userList';
import { deleteData, getData } from '../../utils/fetchData';

const UsersPage = (props)=>{
  const [deleted, setDeleted] = useState('')
  const deleteUser=async(getId)=>{
   const result = await deleteData('userList',getId)
   setDeleted(result)
  }

 
  const {users} = props
  return <div className='container'>
          <p className='text-2xl pt-2 pb-2'>All Users</p>
          <UserList   deleted={deleted}  deleteUser={deleteUser} allUsers={users}/>
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


export async function getServerSideProps() {
  const res = await getData('userList')
  return {
    props: {
      users: res.users,
      result: res.result,
    },
  }
}

export default UsersPage
