'use client'

import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { UserContext } from '@/context/UserProvider'

const Page = () => {
  const router = useRouter()
  const { user, setUser } = useContext(UserContext)

  const AuthCredentialsValidator = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(3, { message: 'Password must be at least 8 characters long' }),
  })

  type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  })

  const onSubmit = async ({ email, password }: TAuthCredentialsValidator) => {
    try {
      const response = await fetch('http://localhost:8000/api/sessions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        let json = await response.json()
        console.log(json.user)
        setUser(json.user)
        localStorage.setItem('user', JSON.stringify(json.user))
        toast.success('Logged in successfully')
        router.refresh()
        router.push('/')
      } else {
        toast.error('An error occurred')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="w-16 h-16" />
            <h1 className="text-2xl font-bold">Sign in to your account</h1>
            <Link
              href="/sign-up"
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Don&apos;t have an account? Sign up
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder="you@example.com"
                    type="email"
                    id="email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register('password')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder="password123"
                    type="password"
                    id="password"
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button>Sign in</Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  or
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
