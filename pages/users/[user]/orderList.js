import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Table } from 'semantic-ui-react'
import { UserPageLayout } from '.'
import packages from '../../../public/productLogo.png'
import { getData, putData } from '../../../utils/fetchData'
const OrderListPage = ({ orders }) => {
  const [order, setOrder] = useState([])
  const array = []

  order.map((element) => {
    var elm = {}
    var res = {}
    elm._id = element._id
    elm.address = element.address
    elm.total = element.total
    elm.delivered = element.delivered
    elm.mobile = element.mobile
    for (let i in element) {
      if (i === 'cart') {
        // const l = element[i]
        // console.log(l[0])
        const l = element[i][0]
        delete l._id

        res = { ...elm, ...l }
        // l.filter((obj) => array.push(obj))
      }
    }
    array.push(res)
  })

  useEffect(() => {
    setOrder(orders)
  }, [orders])
  const Delete = (data) => {
    setShowDeleteModal(true)
    setId(data)
  }
  const Edit = (data) => {
    setSingleData(products.find((pro) => pro._id == data))
    setShowEditModal(true)
  }
  const editFormSubmit = async (pId) => {
    const id = [['id', pId]]
    const value = { category, title, description, price, inStock }

    const changedValue = []
    var result = Object.entries(value)

    for (const re of result) {
      if (re[1] !== '') {
        changedValue.push(re)
      }
    }

    if (changedValue.length > 0) {
      const res = await putData('products', [changedValue, id])
      // const res = await putData('products', Object.fromEntries(changedValue.concat(id)))
      // res.success === true ? e.target.reset():''
      // console.log(res)
    }
    // setShowEditModal(false)
  }

  const router = useRouter()
  const { user } = router.query

  return (
    <div className="relative">
      <section className="px-5 pt-3 pb-4">
        <h3
          className="border-2 rounded-md h-10 text-2xl text-center"
          style={{ backgroundColor: '#f8ffff' }}
        >
          List Page
        </h3>
      </section>
      <section className="">
        <Table celled compact definition>
          <Table.Header fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>

              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Delivered</Table.HeaderCell>
              <Table.HeaderCell>Amount</Table.HeaderCell>
              <Table.HeaderCell>Mobile</Table.HeaderCell>
              <Table.HeaderCell>
                <div className="mx-8">
                  <i className="trash alternate icon"></i>
                </div>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <div className="mx-8">
                  <i className="edit icon"></i>
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {array.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell collapsing>{/* <Checkbox slider />*/}</Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>
                  <div className="mx-1 my-1">
                    <img
                      src={item?.images}
                      className="w-10 h-7"
                      alt={item?.images}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.address}</Table.Cell>
                <Table.Cell>
                  {item.delivered === true ? 'Delivered' : 'Pending'}
                </Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.mobile}</Table.Cell>
                <Table.Cell>
                  <button
                    className="ui red button"
                    onClick={() => Delete(item._id)}
                  >
                    Delete
                  </button>
                </Table.Cell>
                <Table.Cell>
                  <button
                    className="ui teal button"
                    onClick={() => Edit(item._id)}
                  >
                    Edit
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell colSpan="9">
                <Button
                  floated="right"
                  icon
                  primary
                  size="small"
                  onClick={() => setShowAddModal(true)}
                >
                  <div className="flex flex-row items-center justify-center">
                    <Image
                      width={20}
                      height={20}
                      src={packages}
                      alt={packages}
                    />
                    Delete All Orders
                  </div>
                </Button>
                <Button disabled size="small">
                  Approve
                </Button>
                <Button disabled size="small">
                  Approve All
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </section>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData('products/orders')
  return {
    props: {
      orders: res.orders,
      result: res.result,
    },
  }
}
OrderListPage.getLayout = UserPageLayout

export default OrderListPage
