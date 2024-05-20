'use client'
import React from 'react'

interface UserContextType {
  user: { id: string; name: string } | null
  setUser: React.Dispatch<
    React.SetStateAction<{ id: string; name: string } | null>
  >
}

const UserContext = React.createContext<UserContextType | undefined>(undefined)

export default UserContext
