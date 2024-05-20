import fs from 'fs/promises'

const FILE_PATH = './src/json/cart.json'

class CartManager {
  constructor() {
    this.path = FILE_PATH
  }

  async getCarts() {
    try {
      const fileContent = await fs.readFile(this.path, 'utf-8')
      const parsedCart = JSON.parse(fileContent)
      return parsedCart
    } catch (error) {
      console.error('Error parsing cart:', error)
      return []
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts()
      const matchingCart = carts.find(cart => cart.id === Number(id))
      return matchingCart
    } catch (error) {
      console.error('Error getting cart by id:', error)
    }
  }
  async newCart() {
    try {
      const carts = await this.getCarts()
      const id = carts.length + 1
      const newCart = {
        id: id,
        products: [],
      }
      carts.push(newCart)
      await this.saveCart(carts)
    } catch (error) {
      console.error('Error creating cart:', error)
    }
  }

  async addProductToCart(cartId, productId) {
    try {
      const cart = await this.getCartById(cartId)
      const { products } = cart
      const productIndex = cart.products.findIndex(product => product.product === Number(productId))

      if (productIndex !== -1) {
        products[productIndex].quantity++
      } else {
        products.push({
          product: Number(productId),
          quantity: 1,
        })
      }
      this.updateCart(cart)
    } catch (error) {
      console.log(error)
    }
  }
  async updateCart(cart) {
    try {
      const { id } = cart
      const carts = await this.getCarts()
      const cartToUpdateIndex = carts.findIndex(cart => cart.id === Number(id))
      carts.splice(cartToUpdateIndex, 1, cart)
      this.saveCart(carts)
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }
  async saveCart(cart) {
    await fs.writeFile(this.path, JSON.stringify(cart, null, 2))
  }
}

export default CartManager
