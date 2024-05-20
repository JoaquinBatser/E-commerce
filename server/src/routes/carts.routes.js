import { Router } from 'express'
import cartsController from '../controllers/carts.controller.js'

const cartRouter = Router()

cartRouter.get('/', cartsController.getCart)

cartRouter.post('/', cartsController.createCart)

cartRouter.get('/:cId', cartsController.getCartById)

cartRouter.delete('/:cId', cartsController.emptyCart)

cartRouter.get('/user/:userId', cartsController.getUserCart)

cartRouter.post('/:cId/purchase', cartsController.purchaseCart)

cartRouter.post('/:cId/product/:pId', cartsController.addProductToCart)

cartRouter.put('/:cId/product/:pId', cartsController.updateProductQuantity)

cartRouter.delete('/:cId/product/:pId', cartsController.deleteProductFromCart)

export default cartRouter
