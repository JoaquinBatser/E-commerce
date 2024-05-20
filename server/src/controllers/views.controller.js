import ProductsManager from '../services/db/products.service.db.js'
import CartsManager from '../services/db/carts.service.db.js'
import ChatService from '../services/db/chat.service.db.js'

const getProducts = async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, category } = req.query

    const filter = {
      query: {},
      options: {
        limit,
        page,
      },
    }

    if (sort) {
      filter.options.sort = { price: sort }
    }

    if (category) {
      filter.query.category = category
    }
    const productsManager = new ProductsManager()
    const data = await productsManager.getProducts(filter)
    const { docs, hasPrevPage, prevPage, hasNextPage, nextPage, totalPages } = data
    const products = docs

    const currentPage = data.page

    res.render('products', {
      title: 'Products',
      products,
      hasPrevPage,
      prevPage,
      hasNextPage,
      nextPage,
      totalPages,
      currentPage,
      user: req.session.user,
      role: req.session.role,
      style: 'css/products.css',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const getCartById = async (req, res) => {
  const { cId } = req.params
  try {
    const cartManager = new CartsManager()
    const cart = await cartManager.getCartById(cId)
    const { products } = cart

    res.render('cart', { title: 'Cart', products, style: '/css/cart.css' })
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
}

const getChat = async (req, res) => {
  const chatService = new ChatService()
  const messages = await chatService.findMessages()
  res.render('chat', { title: 'Chat', messages, style: 'css/chat.css' })
}

const login = async (req, res) => {
  res.render('login', { title: 'Login', style: 'css/login.css' })
}

const signup = async (req, res) => {
  res.render('signup', { title: 'Signup', style: 'css/signup.css' })
}

const privatePage = async (req, res) => {
  res.render('private', { title: 'Private', user: req.session.user, style: 'css/private.css' })
}

export default { getProducts, getCartById, getChat, login, signup, privatePage }
