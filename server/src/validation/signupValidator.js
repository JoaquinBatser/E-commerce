export function signupValidator(user) {
  const data = {
    success: true,
    properties: {
      first_name: true,
      last_name: true,
      age: true,
      email: true,
      password: true,
    },
  }

  if (
    !user.first_name ||
    user.first_name === undefined ||
    user.first_name === ''
  ) {
    data.success = false
    data.properties.first_name = false
  }
  if (
    !user.last_name ||
    user.last_name === undefined ||
    user.last_name === ''
  ) {
    data.success = false
    data.properties.last_name = false
  }
  if (!user.age || user.age === undefined || user.age === '') {
    data.success = false
    data.properties.age = false
  }
  if (!user.email || user.email === undefined || user.email === '') {
    data.success = false
    data.properties.email = false
  }
  if (!user.password || user.password === undefined || user.password === '') {
    data.success = false
    data.properties.password = false
  }
  console.log('user', user)
  console.log('data', data)
  return data
}
