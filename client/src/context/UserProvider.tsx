'use client'
import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '@/payload-types'

type UserProviderProps = {
  children: ReactNode
}

const typeUserContextState = {
  user: null,
  setUser: () => {},
}
interface UserContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserContext = createContext<UserContextType>(typeUserContextState)

export const UserProvider = (props: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser !== null) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing user from localStorage:', storedUser)
        console.error(error)
      }
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  )
}
