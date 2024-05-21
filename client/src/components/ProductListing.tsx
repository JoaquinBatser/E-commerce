'use client'

import { Product } from '@/payload-types'
import { Skeleton } from './ui/skeleton'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'

interface ProductListingProps {
  product: Product | null
}

const ProductListing = ({ product }: ProductListingProps) => {
  const [isVisible, setVisible] = useState<boolean>(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (!product || !isVisible) return <ProductPlaceHolder />

  if (isVisible && product) {
    return (
      <Link
        className={cn('invisible h-full w-full cursor-pointer group/main', {
          'visible animate-in fade-in-5': isVisible,
        })}
        href={`/product/${product._id}`}
      >
        <div className="flex flex-col w-full">
          <h3 className="mt-4 font-medium text-sm text-gray-700">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-1 font-medium text-sm text-gray-900">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>
    )
  }

  //   return <p>{product.category}</p>
}

const ProductPlaceHolder = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl">
        <Skeleton className="h-full w-full" />
      </div>
      <Skeleton className="mt-4 w-2/3 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-16 h-4 rounded-lg" />
      <Skeleton className="mt-2 w-12 h-4 rounded-lg" />
    </div>
  )
}

export default ProductListing
