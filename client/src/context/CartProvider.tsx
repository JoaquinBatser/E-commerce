'use client'
import { Cart } from '@/payload-types'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider'
import { useContext } from 'react'

interface CartProviderProps {
  children: ReactNode
}

const typeCartContextState = {
  cart: null,
  addToCart: () => {},
  removeFromCart: () => {},
}
interface CartContextType {
  cart: Cart | null
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
}

export const CartContext = createContext<CartContextType>(typeCartContextState)

export const CartProvider = (props: CartProviderProps) => {
  const { user } = useContext(UserContext)
  const [cart, setCart] = useState<Cart | null>(null)

  useEffect(() => {
    if (!user) {
      setCart({
        _id: '',
        user: '',
        products: [],
        createdAt: '',
        updatedAt: '',
        __v: 0,
      })
    } else {
      const fetchCart = async () => {
        const response = await fetch(
          `http://localhost:8000/api/carts/user/${user._id}`
        )
        console.log(response)
        if (response.ok) {
          const data = await response.json()
          setCart(data.cartData.cart)
        }
      }

      fetchCart()
    }
  }, [user])

  const addToCart = async (productId: string) => {
    if (cart) {
      console.log('Adding to cart', productId)
      console.log('Cart', cart)
      const response = await fetch(
        `http://localhost:8000/api/carts/${cart._id}/product/${productId}`,
        {
          method: 'POST',
        }
      )

      if (response.ok) {
        const updatedCart = await response.json()
        console.log('Updated cart', updatedCart)
        setCart(updatedCart)
      }
    } else {
      console.error('No cart found')
    }
  }

  const removeFromCart = async (productId: string) => {
    if (cart) {
      const response = await fetch(
        `http://localhost:8000/api/cart/${productId}`,
        {
          method: 'DELETE',
        }
      )

      if (response.ok) {
        const updatedCart = await response.json()
        setCart(updatedCart)
      }
    } else {
      console.error('No cart found')
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  )
}
