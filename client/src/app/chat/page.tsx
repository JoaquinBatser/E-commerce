'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserContext } from '@/context/UserProvider'
import { FormEvent, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
interface MessageData {
  chatUser: string
  message: string
}
const Page = () => {
  const { user } = useContext(UserContext)
  const [socket, setSocket] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<any[]>([])
  const chatUser = 'Anonymous'

  useEffect(() => {
    const newSocket = io('http://localhost:8000')
    setSocket(newSocket)
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chat')
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setMessages(data.messagesData.messages)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchMessages()
    return () => {
      newSocket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (messageData: MessageData) => {
        setMessages((prevMessages) => [...prevMessages, messageData])
      })
    }
  }, [socket])

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault()

    if (message.trim()) {
      const messageData = { chatUser, message }
      console.log(messageData)
      try {
        const response = await fetch('http://localhost:8000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(messageData),
        })
      } catch (error) {
        console.log(error)
      } finally {
        setMessage('')
      }
    }
  }

  return (
    <>
      <div className="mx-auto h-full max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Chat
        </h1>

        <ScrollArea className=" h-96 w-full mt-12 rounded-lg border-2 border-dashed border-zinc-200 p-12 ">
          <ul className=" space-y-4">
            {messages.map((messageData) => (
              <li key={messageData.id}>
                <div className="flex flex-col border border-green-500 rounded-3xl py-3 px-6 w-2/3">
                  <p className="text-2xl">{messageData.chatUser}</p>
                  <p>{messageData.message}</p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>

        <form onSubmit={sendMessage}>
          <div className="grid gap-2 py-2 grid-cols-4">
            <Input
              onChange={(e) => setMessage(e.target.value)}
              className="col-span-3"
            ></Input>
            <Button className=" col-span-1"> Send Message </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page
