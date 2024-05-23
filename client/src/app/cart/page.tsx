import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'
import Link from 'next/link'

const Page = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn(
              'lg:col-span-7',
              'rounded-lg border-2 border-dashed border-zinc-200 p-12'
            )}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {false === false ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 w-40 h-40 text-muted-foreground"
                >
                  <img src="" alt="" loading="eager" />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Nothing to show here yet
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                'divide-y divide-gray-200 border-b border-t border-gray-200':
                  true,
              })}
            >
              return(
              <li className="flex py-6 sm:py-10 ">
                <div className="flex-shirnk-0">
                  <div className="relative h-24 w-24">
                    <img
                      src=""
                      alt=""
                      className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                    />
                  </div>
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            href={`/product/`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          ></Link>
                        </h3>
                      </div>

                      <div className="mt-1 flex text-sm">
                        <p className="text-muted-foreground">Category</p>
                      </div>

                      <p className="mt-1 text-sm font-medium text-gray-900">
                        $0.00
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                      <div className="absolute right-0 top-0">
                        <Button aria-label="remove product" variant="ghost">
                          <X className="h-5 w-5" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                    <Check className="h-5 w-5 flex-shrink-0 text-green-700" />
                    <span>Eligible for fast delivery</span>{' '}
                  </p>
                </div>
              </li>
              )
            </ul>
          </div>

          <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="text-sm font-medium text-gray-900">$10.00</p>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4 ">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="">Flat Transaction Fee</span>
                </div>
                <div className="text-sm font-medium text-gray-900">$1.00</div>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <div className="text-base font-medium text-gray-900">
                  Order Total
                </div>
                <div className="text-base font-medium text-gray-900">
                  $99.99
                </div>
              </div>
            </div>

            <section className="mt-6">
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </section>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page
