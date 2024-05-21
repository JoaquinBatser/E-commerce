'use client'

import { boolean } from 'zod'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'

const AddToCartButton = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 1500)
    return () => clearTimeout(timeout)
  }, [isSuccess])
  return (
    <Button
      onClick={() => {
        setIsSuccess(true)
      }}
      size="lg"
      className="w-full"
    >
      {isSuccess ? 'Added to cart !' : 'Add to cart'}
    </Button>
  )
}

export default AddToCartButton
