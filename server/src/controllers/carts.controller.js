import repositories from '../repositories/index.js'
import CustomError from '../services/CustomError.js'
import CartsManager from '../services/db/carts.service.db.js'
import ProductsManager from '../services/db/products.service.db.js'

const cartsManager = new CartsManager(repositories.carts)
const productsManager = new ProductsManager(repositories.products)

const getCart = async (req, res) => {
  try {
    const carts = await cartsManager.getCarts()
    res.json(carts)
  } catch (error) {
    console.log(error)
  }
}

const getCartById = async (req, res, next) => {
  const { cId } = req.params
  try {
    const cartData = await cartsManager.getCartById(cId)

    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }

    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const getUserCart = async (req, res, next) => {
  const { userId } = req.params
  try {
    const cartData = await cartsManager.getUserCart(userId)

    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }

    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const createCart = async (req, res, next) => {
  try {
    const { userId } = req.body
    const cartData = await cartsManager.newCart(userId)

    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }

    res.status(201).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const addProductToCart = async (req, res, next) => {
  const { cId, pId } = req.params
  console.log(cId, pId)

  try {
    console.log('aca')
    console.log(req.session)
    console.log(req.session.passport.user)
    console.log(req.user)
    if (req.user.user.role == 'premium') {
      const productData1 = await productsManager.getProductById(pId)

      if (productData1.product.owner != req.user.user._id) {
        return res.status(403).json({
          success: false,
          message: 'Forbidden',
        })
      }
    }
    const cartData = await cartsManager.addProductToCart(cId, pId)

    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }

    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const updateProductQuantity = async (req, res, next) => {
  const { cId, pId } = req.params
  const { quantity } = req.body
  try {
    const cartData = await cartsManager.updateProductQuantity(
      cId,
      pId,
      quantity
    )
    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }
    console.log('cartData:', cartData)
    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const deleteProductFromCart = async (req, res, next) => {
  const { cId, pId } = req.params

  try {
    const cartData = await cartsManager.deleteProductFromCart(cId, pId)
    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }

    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const emptyCart = async (req, res, next) => {
  const { cId } = req.params
  try {
    const cartData = await cartsManager.emptyCart(cId)
    if (!cartData.success) {
      throw new CustomError(cartData.message, 404)
    }
    res.status(200).json({
      cartData,
    })
  } catch (error) {
    next(error)
  }
}

const purchaseCart = async (req, res, next) => {
  const { cId } = req.params
  const { purchaser } = req.body
  const code = Math.random().toString(36).substring(2, 15)

  try {
    const cartData = await cartsManager.getCartById(cId)
    const { cart } = cartData

    if (!purchaser) {
      res.status(400).json({
        success: false,
        message: 'Purchaser not found',
      })
      return
    }
    if (!cart) {
      res.status(404).json({
        success: false,
        message: 'Cart not found',
      })
      return
    }
    let totalPrice = 0
    const { products } = cart

    for (let i = 0; i < products.length; i++) {
      const product = products[i].product
      const quantity = products[i].quantity
      const stock = product.stock
      const pId = product._id.toString()

      if (quantity > stock) {
        res.status(400).json({
          success: false,
          message: `Product ${product._id} quantity exceeds stock`,
        })
        return
      }
      const updatedStock = stock - quantity
      const productUpdate = {
        stock: updatedStock,
      }
      const updatedProduct = await productsManager.updateProduct(
        pId,
        productUpdate
      )
      console.log('updatedProduct:', updatedProduct)
    }

    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].product.price * products[i].quantity
    }
    const newTicket = await cartsManager.newTicket({
      purchaser,
      code,
      amount: totalPrice,
    })
    const ticket = {
      newTicket,
      cart,
    }

    res.status(200).json({
      success: true,
      message: `Cart ${cId} purchased by ${purchaser}`,
      ticketData: ticket,
    })

    await cartsManager.emptyCart(cId)
    totalPrice = 0
  } catch (error) {
    console.log(error)
  }
}

export default {
  getCart,
  getCartById,
  getUserCart,
  createCart,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
  emptyCart,
  purchaseCart,
}
