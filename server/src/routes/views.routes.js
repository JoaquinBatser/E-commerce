import { Router } from 'express'
import { auth } from '../middlewares/index.js'
import viewsController from '../controllers/views.controller.js'

const viewsRouter = Router()

viewsRouter.get('/products', viewsController.getProducts)

viewsRouter.get('/cart/:cId', viewsController.getCartById)

viewsRouter.get('/chat', viewsController.getChat)

viewsRouter.get('/login', viewsController.login)

viewsRouter.get('/signup', viewsController.signup)

viewsRouter.get('/private', auth, viewsController.privatePage)

export default viewsRouter
