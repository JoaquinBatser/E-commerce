import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, default: 0 },
  owner: { type: String, required: true },
})

productSchema.plugin(paginate)

export const productModel = mongoose.model(productCollection, productSchema)
