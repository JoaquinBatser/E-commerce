'use client'

import { User } from '@/payload-types'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/context/UserProvider'
import { useContext } from 'react'

const UserAccountNav = ({ user }: { user: User }) => {
  const { setUser } = useContext(UserContext)
  const router = useRouter()

  const signOut = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/api/sessions/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      console.log(response)
      if (response.ok) {
        localStorage.removeItem('user')
        setUser(null)
        toast.success('Logged out successfully')
        router.refresh()
        router.push('/sign-in')
      } else {
        toast.error('An error occurred')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <p className="font-medium text-sm text-black">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav
