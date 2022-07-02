import { useContext, useEffect, useState } from "react";
import { Image } from "semantic-ui-react";
// import { deleteUser, editUser } from "../../store/Actions";
import { DataContext } from "../../store/GlobalState";
import { editData } from "../../utils/fetchData";
const UserList = ({allUsers,deleteUser,deleted}) => {
    const [remainingUser, setRemainingUser] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [editUser, setEditUser] = useState('')
    const [afterEdit, setAfterEdit] = useState('')
    const [name, setChangeName] = useState('')
    const [email, setChangeEmail] = useState('')
    
    const [id, setId] =useState('')
    const [state, dispatch] = useContext(DataContext)
   
    useEffect(()=>{
        if(deleted){
            setRemainingUser(deleted)
        }else if(afterEdit){
            setRemainingUser(afterEdit)
        }
    },[deleted,afterEdit])
    // useEffect(()=>{
    //     if(deleted){
    //         setRemainingUser(deleted)
    //     }else if(afterEdit){
    //         setRemainingUser(afterEdit)
    //     }
    // },[deleted,afterEdit])
   
   const editHandler=(getId)=>{
    setId(getId)
    deleted 
    ?  setEditUser(deleted.find(user=>user._id === getId)) 
    : setEditUser(allUsers.find(user=>user._id === getId))

    setShowModal(true)
   }

   

   const editUserHandler=async(e)=>{
    e.preventDefault()
    const val={name,email}
    const array = []

    for(var alter of Object.entries(val)){
        if(alter[1] !== ''){
            array.push(alter)
        }
    }

    if(array !== ''){
        const newArray = Object.fromEntries(array)
        const newId={id:id}
        const data = {...newArray,...newId}
        const result =  await editData('userList',{newArray,newId})
        if(result){
            setAfterEdit(result)
        }
    }
    // console.log(Object.fromEntries(array))
   

   }
   const roleHandler=async(role,id)=>{
   
    await editData('userList/changeRole',{role:role,id:id})
   }
  return (
    <div>
        <table className="ui single line table">
            <thead>
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Change Role</th>
                <th>Remove</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
           {
            remainingUser ? 
            remainingUser.map(user=>
                <tr key={user._id}>
                    <td><Image className="w-8 h-8" src={user.avatar} alt="" /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                    {
                        user.role === 'user'
                        ?   <button  onClick={()=>roleHandler('admin',user._id)} className="btn btn-warning">
                                Make Admin
                            </button>
                        :   <button onClick={()=>roleHandler('user',user._id)} className="btn btn-info">
                                Make User
                            </button>
                    }
                    </td>
                    <td><button
                     onClick={()=>deleteUser(user._id)}
                     className="btn btn-primary"
                     >Delete</button></td>
                    <td><button
                    // onClick={()=>editHandler(user._id)}
                    onClick={() => editHandler(user._id)}
                     className="btn btn-danger"
                    >Edit</button></td>
                </tr>
                )

            : allUsers.map(user=>
                <tr key={user._id}>
                    <td><Image className="w-8 h-8" src={user.avatar} alt="" /></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                    {
                        user.role === 'user'
                        ?   <button  onClick={()=>roleHandler('admin',user._id)} className="btn btn-warning">
                                Make Admin
                            </button>
                        :   <button onClick={()=>roleHandler('user',user._id)} className="btn btn-info">
                                Make User
                            </button>
                    }  
                    </td>
                    <td><button
                     onClick={()=>deleteUser(user._id)}
                     className="btn btn-primary"
                     >Delete</button></td>
                    <td><button
                    // onClick={()=>editHandler(user._id)}
                    onClick={() => editHandler(user._id)}
                     className="btn btn-danger"
                    >Edit</button></td>
                </tr>
                )
           }
          
            </tbody>
        </table>

        {showModal ? (
            <>
              <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">

                    <form onSubmit={editUserHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-96 bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-center justify-center py-3  border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Edit Users details
                            </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                        
                                <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input 
                                onChange={(e)=>setChangeName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="username" 
                                defaultValue={editUser.name}
                                type="text" 
                                placeholder="New Name"/>
                                </div>
                                <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                    Email
                                </label>
                                <input 
                                onChange={(e)=>setChangeEmail(e.target.value)}
                                className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="email" 
                                defaultValue={editUser.email}
                                type="email" 
                                placeholder="New Email"/>  
                                </div> 
                        
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-rose-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                               
                                // onClick={() => setShowModal(false)}
                            >
                                Save
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}

    </div>
  );
}

export default UserList;
