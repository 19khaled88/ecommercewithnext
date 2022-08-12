import Image from 'next/image'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Button, Checkbox, Table } from 'semantic-ui-react'
import noimage from '../../../public/noimage.png'
import packages from '../../../public/productLogo.png'
import { getData, putData } from '../../../utils/fetchData'
import { UserPageLayout } from './'
import next from 'next'
const ListPage = ({ products }) => {
  for (var im of products) {
    console.log(im)
  }
  const [showAddModal, setShowAddModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [singleData, setSingleData] = useState([])

  const [category, setCategory] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [inStock, setStock] = useState('')

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
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Content</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Stock</Table.HeaderCell>
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
            {products.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell collapsing>
                  <Checkbox slider />
                </Table.Cell>
                <Table.Cell>{item.category}</Table.Cell>
                <Table.Cell>
                  <div>
                    {
                      // item.images
                      // ?<Image src={item.images} width="30" height="30"   />
                      // :<Image src={noimage} width="30" height="30"  />
                      item?.images && (
                        <img
                          src={item.images[0]}
                          alt={item.images}
                          width="30"
                          height="50"
                        />
                      )
                    }
                  </div>
                </Table.Cell>
                <Table.Cell>{item.title}</Table.Cell>
                <Table.Cell>{item.description}</Table.Cell>
                <Table.Cell>{item.content}</Table.Cell>
                <Table.Cell>{item.price}</Table.Cell>
                <Table.Cell>{item.inStock}</Table.Cell>
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
                      width={30}
                      height={30}
                      src={packages}
                      alt={noimage}
                    />{' '}
                    Manage Product
                  </div>
                </Button>
                <Button size="small">Approve</Button>
                <Button disabled size="small">
                  Approve All
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </section>

      {/*Product add portion*/}
      {showAddModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Product Add Form</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowAddModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Demo add page Demo add page Demo add page Demo add page
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/*Product delete portion*/}
      {showDeleteModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Product delete Form
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Demo add page Demo add page Demo add page Demo add page
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/*Product edit portion*/}
      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Product delete Form
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowEditModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}

                <div className="relative p-6 flex-auto">
                  <div className="ui equal width form">
                    <div className="fields">
                      <div className="field">
                        <label>Category</label>
                        <input
                          type="text"
                          onChange={(e) => setCategory(e.target.value)}
                          defaultValue={singleData.category}
                        />
                      </div>
                      <div className="field">
                        <label>Name</label>
                        <input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          defaultValue={singleData.title}
                        />
                      </div>
                    </div>
                    <div className="fields">
                      <div className="field">
                        <label>Price</label>
                        <input
                          type="number"
                          onChange={(e) => setPrice(e.target.value)}
                          defaultValue={singleData.price}
                        />
                      </div>
                      <div className="field">
                        <label>Stock</label>
                        <input
                          type="number"
                          onChange={(e) => setStock(e.target.value)}
                          defaultValue={singleData.inStock}
                        />
                      </div>
                    </div>
                    <div className="fields">
                      <div className="field">
                        <label>Description</label>
                        <textarea
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          defaultValue={singleData.description}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowEditModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => editFormSubmit(singleData._id)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await getData('products')
  return {
    props: {
      products: res.products,
      result: res.result,
    },
  }
}
ListPage.getLayout = UserPageLayout

export default ListPage
