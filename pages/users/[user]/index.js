import Link from 'next/link';
import { useRouter } from 'next/router';
import nestLayout from '../../../utils/nestLayout';
import { UsersPageLayout } from '../../users/index';

const UserPage = () => {
    const router = useRouter()
    const {user} = router.query
  return (
    <section>
        <h3>
          Dashboard
        </h3>
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
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl">
                  <Link href={`/users/${user}`}>Dashboard</Link>
                </button>
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl">
                  <Link href={`/users/${user}/add`}>Add Product</Link>
                </button>
                <button style={{backgroundColor:'#cacbcd'}} className="border px-3 py-1 rounded-md text-2xl">
                  <Link href={`/users/${user}/list`}>Product List</Link>
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
