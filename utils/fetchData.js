const baseUrl = process.env.BASE_URL
export const getData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
  const data = await res.json()
  return data
}

export const getSingleData = async (url, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  })
  const data = await res.json()
  return data
}

export const login = async (url, post, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      Authorization: token,
    },
    body: JSON.stringify(post),
  })
  const data = await res.json()
  return data
}

export const postData = async (url, post, token) => {

  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(post),
  })

  const data = await res.json()
  return data
}

export const putData = async (url, post, token) => {
  const result =Object.assign({},post[1][0])
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify({info:Object.fromEntries(post[0]),id:result[1]}),
  })

  const data = await res.json()
  return data
}

export const editData = async (url, post, token) => {

  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
     body: JSON.stringify(post),
    // body: JSON.stringify({info:Object.fromEntries(post[0]),id:result[1]}),
  })

  const data = await res.json()
  return data
}

export const deleteData = async (url,id, token) => {
  const res = await fetch(`${baseUrl}/api/${url}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
   body:JSON.stringify({id:id})
  })

  const data = await res.json()
  return data
}

