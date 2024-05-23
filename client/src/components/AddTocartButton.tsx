'use client'

import { boolean } from 'zod'
import { Button } from './ui/button'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '@/context/CartProvider'
import { Product } from '@/payload-types'

const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { cart, addToCart } = useContext(CartContext)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [isSuccess])

  const handleAddToCart = () => {
    addToCart(product._id)
    setIsSuccess(true)
  }

  return (
    <Button onClick={handleAddToCart} size="lg" className="w-full">
      {isSuccess ? 'Added to cart !' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton
