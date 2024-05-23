import { X } from 'lucide-react'

const CartItem = () => {
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 overflow-hidden rounded min-w-fit">
            <img src="" alt="" className="absolute object-cover" />
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              Product Name
            </span>
            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              label
            </span>

            <div className="mt-4 text-s text-muted-foreground">
              <button className="flex items-center gap-0.5">
                <X className="w-3 h-4" />
              </button>
              Remove
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">$0.00</span>
        </div>
      </div>
    </div>
  )
}

export default CartItem
