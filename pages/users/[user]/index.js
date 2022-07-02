import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Image } from 'semantic-ui-react';
import nestLayout from '../../../utils/nestLayout';
import { UsersPageLayout } from '../../users/index';

const UserPage = () => {
    const [dayTime, setDayTime] = useState()

    const router = useRouter()
    const {user} = router.query

    const currentTime=()=>{
     
      let date = new Date(); 
      let hh = date.getHours();
      let mm = date.getMinutes();
      let ss = date.getSeconds();
      let session = "AM";

      if(hh == 0){
        hh = 12;
        }
        if(hh > 12){
            hh = hh - 12;
            session = "PM";
        }
      
        hh = (hh < 10) ? "0" + hh : hh;
        mm = (mm < 10) ? "0" + mm : mm;
        ss = (ss < 10) ? "0" + ss : ss;
          
        let time = hh + ":" + mm + ":" + ss + " " + session;
        
        let t = setTimeout(()=>{
          currentTime()
          setDayTime(time)
        },1000);
     
      }
    
  return (
    <section className='pt-3'>
        <h3 className='text-2xl mb-2 mx-auto rounded-full py-2 border w-44 text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
         User Profile 
        </h3>
        <div className='w-2/3 h-96 bg-gray-200 mx-auto flex flex-row justify-evenly items-center px-3 gap-x-3'>
          <div className='rounded-xl w-1/2 h-64 flex items-center py-0'> 
            <div className="rounded overflow-hidden shadow-lg bg-white w-full">
              <div className='flex justify-center items-center'>
              <Image className="w-40 h-40" src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="Sunset in the mountains"/>
              </div>
              <div className="px-2 py-2 flex flex-col">
                <div className='flex flex-row justify-between'>
                  <div className="font-bold text-xl mb-2">My Profile</div>
                  <div id="clock" onLoad={currentTime()} className="font-bold text-xl mb-2">{dayTime ? dayTime : ''}</div>
                </div>
                
                <div className='flex flex-col divide-y divide-yellow-500'>
                  <div className='flex flex-row justify-between'>
                    <p>Name</p> <p>Mobile</p>
                  </div>
                  <p>Email</p>
                  <p>Sms notification</p>
                </div>
              </div>
            </div>          
          </div>
          <div className='rounded-xl w-1/2 h-64 flex flex-col items-center gap-y-2'> 
            <div className="rounded  bg-white w-full">
              <p>User Role:</p>
            </div>          
            <div className="rounded  bg-white w-full">
            <p>User Responsibility</p>
            </div>          
          </div>
      
        </div>
    </section>
  );
}

const NestedLayout=({children})=>{
    const router = useRouter()
    const {user} = router.query

    
    return (
        <div>
          <header className='pt-2'>
            <nav className='pl-3'>
              <ul className="flex flex-row gap-x-2">
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  <Link href={`/users/${user}`}>Profile</Link>
                </button>
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  <Link href={`/users/${user}/add`}>Add Product</Link>
                </button>
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  <Link href={`/users/${user}/list`}>Product List</Link>
                </button>
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                  <Link href={`/users/${user}/list`}>Order List</Link>
                </button>
              </ul>
            </nav>
          </header>
          <section>{children}</section>
        </div>
      );
}

const getLayout = (page) => <NestedLayout>{page}</NestedLayout>;

export const UserPageLayout = nestLayout(UsersPageLayout, getLayout);

UserPage.getLayout = UserPageLayout;
export default UserPage;
