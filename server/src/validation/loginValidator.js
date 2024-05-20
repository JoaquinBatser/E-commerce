export function loginValidator({ email, password }) {
  const data = {
    success: true,
    properties: {
      email: true,
      password: true,
    },
  }

  if (!email || email === undefined || email === '') {
    data.success = false
    data.properties.email = false
  }
  if (!password || password === undefined || password === '') {
    data.success = false
    data.properties.password = false
  }

  return data
}
