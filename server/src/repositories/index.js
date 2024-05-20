import ProductsRepository from './products.repository.js'
import CartsRepository from './carts.repository.js'
import MessagesRepository from './messages.repository.js'
import UsersRepository from './users.repository.js'

import { productModel } from '../models/products.model.js'
import { cartModel } from '../models/carts.model.js'
import { messageModel } from '../models/messages.model.js'
import { userModel } from '../models/user.model.js'

export default {
  products: new ProductsRepository(productModel),
  carts: new CartsRepository(cartModel),
  messages: new MessagesRepository(messageModel),
  users: new UsersRepository(userModel),
}
