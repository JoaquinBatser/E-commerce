async function postLogin(email, password) {
  const credentials = { email, password }
  const response = await fetch('/api/sessions/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()

  console.log('dat', data)
  if (data.success) {
    Swal.fire(data.message)
    window.location.href = '/products'
  } else {
    Swal.fire(data.message)
  }
  return data
}

const loginForm = document.getElementById('login-form')

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value
  console.log('email', email)
  const password = document.getElementById('password').value
  console.log('password', password)
  await postLogin(email, password)
})
