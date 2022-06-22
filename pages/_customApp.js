import AdminLayout from "./adminLayout/adminLayout"
export default function MyApp({ Component, pageProps }) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }