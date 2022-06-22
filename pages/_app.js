import 'semantic-ui-css/semantic.min.css'
import Layout from '../components/Layout'
import Navbar from '../components/Navbar'
import Notify from '../components/Notify'
import { DataProvider } from '../store/GlobalState'
import '../styles/globals.css'
function MyApp({ Component, pageProps }) {
  // <Layout>
  //       <Component
  //        {...pageProps}
  //         />
  //       </Layout>
  return (
    <DataProvider>
        <Navbar />
        <Notify />
        <section>
        
          <Layout Component={Component} pageProps={pageProps} />
        </section>
        {/* {typeof window === 'undefined' ? null : <Component {...pageProps} />} */}
          
       
    </DataProvider>
  )
}

export default MyApp
