import { useRouter } from 'next/router';
// import Navbar from "./Navbar";
// import Notify from "./Notify";
const Layout = ({Component,pageProps}) => {

  const router = useRouter();
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  } else {
    return <Component {...pageProps} />;
  }
 
  // return (
  //   <div className="container">
        
  //       {children}
  //   </div>
  // );
}

export default Layout;
