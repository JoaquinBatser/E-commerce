import mongoose from 'mongoose'

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userModel',
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: { type: Number, default: 1 },
        _id: false,
      },
    ],
  },
  { timestamps: true }
)

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'products.product',
  })
  next()
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
