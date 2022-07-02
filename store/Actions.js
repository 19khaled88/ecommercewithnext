
export const ACTIONS={
    NOTIFY:'NOTIFY',
    AUTH:'AUTH',
    ADD_CART:'ADD_CART',
    USER_LIST:'USER_LIST'
}


export const addToCart =(product, cart)=>{
    if(product.inStock === 0){
        return ({type: 'NOTIFY', payload:{error:'This product is out of stock'}})
    }

    const check = cart.every(item=>{
        return item._id !== product._id
    })

    if(!check) return ({type:'NOTIFY', payload:{error:'This product has already been added to cart'}})
    
    return ({type: 'ADD_CART', payload: [...cart, {...product, quantity:1}] })
}

export const decrease=(data,id)=>{
    const newData = [...data]
    newData.forEach(item =>{
        if(item._id === id){
            item.quantity -=1
            item.inStock +=1
        } 
    })
   return ({type:'ADD_CART', payload:newData})
}
export const increase=(data,id)=>{
    const newData = [...data]
    newData.forEach(item =>{
        if(item._id === id){
            item.quantity +=1
            item.inStock -=1
        } 
    })
   return ({type:'ADD_CART', payload:newData})
}

export const deleteHandler=(data,getId)=>{
    let deletedcart = data.filter(item=> {
            return item._id !== getId
          })
    if(deletedcart.length > 0){
        return ({type:'ADD_CART', payload:deletedcart})
    }else if(deletedcart.length === 0){
        localStorage.removeItem('cart_storage_next_js')
        return ({type:'ADD_CART', payload:deletedcart})
    }
}

// export const deleteUser=async(getId)=>{
//     const result = await deleteData('userList',getId)
//      if(result){
//         return ({type:'USER_LIST',payload:{users:result}})
//      }    
//      return ({type:'USER_LIST',payload:{deleteId:getId}})      
    
//                 // console.log(result)
//     // if(result) return ({type:'USER_LIST',payload:{deleteId:getId, users:result}})
//     // return ({type:'USER_LIST',payload:{deleteId:getId}})
     
//     // return ({type:'USER_LIST',payload:{deleteId:getId}})
// }
// export const editUser=(getId)=>{
//     console.log(getId)
//     return ({type:'USER_LIST',payload:{editId:getId}})
// }



// export default ACTIONS