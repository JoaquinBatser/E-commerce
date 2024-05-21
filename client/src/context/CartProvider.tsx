import { Cart } from '@/payload-types'
import { createContext, useState } from 'react'

interface CartProviderProps {
  children: React.ReactNode
}

interface CartContextProps {
  cart: Cart | null
  addToCart: (productId: string) => Promise<void>
  removeFromCart: (productId: string) => Promise<void>
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null)

  const addToCart = async (productId: string) => {
    const response = await fetch(
      `http://localhost:8000/api/cart/${productId}`,
      {
        method: 'POST',
        // Add any necessary headers or body data here...
      }
    )

    if (response.ok) {
      const updatedCart = await response.json()
      setCart(updatedCart)
    }
  }

  const removeFromCart = async (productId: string) => {
    const response = await fetch(
      `http://localhost:8000/api/cart/${productId}`,
      {
        method: 'DELETE',
        // Add any necessary headers or body data here...
      }
    )

    if (response.ok) {
      const updatedCart = await response.json()
      setCart(updatedCart)
    }
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
}

export { CartContext, CartProvider }
