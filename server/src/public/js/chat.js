const sendMessageBtn = document.getElementById('send-message-button')
const messageInput = document.getElementById('message-input')
const messageForm = document.getElementById('message-form')
const messagesList = document.getElementById('messages-list')
let chatUser
const socket = io()

document.addEventListener('DOMContentLoaded', () => {
  const userInput = prompt('Enter your name').trim()

  if (!userInput) {
    alert('User registered as Anonymous')
    chatUser = 'Anonymous'
    return
  }

  chatUser = userInput
  alert(`Welcome ${chatUser}`)
})

sendMessageBtn.addEventListener('click', async () => {
  const message = messageInput.value.trim()
  if (!message) return

  await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatUser, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success == false) {
        alert('Error sending message')
        return
      }
      alert('Your message was sent')
    })
    .catch((err) => {
      alert('Error sending message')
      console.log(err)
    })
    .finally(() => {
      messageForm.reset()
    })
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
})

socket.on('newMessage', (messageData) => {
  const messageBox = document.createElement('div')
  messageBox.classList.add('message-box')

  messageBox.innerHTML = `

        <small class='message-user'>${messageData.user}</small>
        <div class='message-text'>${messageData.message}</div>
        <small class='message-time'>${messageData.createdAt}</small>

  `
  messagesList.appendChild(messageBox)
})
