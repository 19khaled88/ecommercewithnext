import Link from 'next/link';

const UsersPage = ()=>{
  return <div>This is the Teams landing page</div>;
}
export const NestedLayout = ({children}) => {
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
  return (
    <div className="min-h-screen flex flex-col">
      <header
        className="bg-purple-200 sticky top-0 h-14 flex justify-center items-center font-semibold uppercase"
      >
        Next.js sidebar menu
      </header>
      <div className="flex flex-col lg:flex-row flex-1">
        <aside className="bg-fuchsia-100 w-full lg:w-52">
          <nav>
            <ul>
              <ol className='flex flex-col gap-y-3 justify-center items-center pt-4 px-2'>
                <button className=' bg-rose-400 h-10 lg:h-9 flex justify-center items-center rounded-md cursor w-full'>
                  <Link href="/users/home">Dashboard</Link>
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
