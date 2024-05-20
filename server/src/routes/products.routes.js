import { Router } from 'express'
import productsController from '../controllers/products.controller.js'
import auth from '../middlewares/auth.js'
import isAllowed from '../middlewares/isAllowed.js'
import uploader from '../middlewares/multer.js'

const productsRouter = Router()

productsRouter.get('/', productsController.getProducts)

productsRouter.get('/:id', productsController.getProductById)

productsRouter.post(
  '/',
  // isAllowed(['admin', 'premium']),
  // uploader.single('file'),
  productsController.addProduct
)

productsRouter.put(
  '/:id',
  isAllowed(['admin']),
  productsController.updateProduct
)

productsRouter.delete(
  '/:id',
  // isAllowed(['admin', 'premium']),
  productsController.deleteProduct
)

export default productsRouter
