export const val = (name, email, password, c_password) => {
  if (!name || !email || !password || !c_password) {
    return 'Please fill all fields'
  }
  if (!isValid(email)) return 'Invalid email'

  if (password.length < 6) return 'Password length must be 6 or more'

  if (password !== c_password) return 'Confirm password did not match'
}

export const loginValidate = (email, password) => {
  if (!email || !password) {
    return 'Please fill all fields'
  }
  if (!isValid) {
    return 'Invalid email'
  }
  if (password.length < 6) return 'Password length must be 6 or more'
}

function isValid(email) {
  const isFake = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return isFake.test(email)
}
