import { cartModel } from '../../models/carts.model.js'
import { ticketModel } from '../../models/ticket.model.js'
import mongoose from 'mongoose'

export default class CartsManager {
  constructor(repo) {
    this.repo = repo
  }

  async getCarts() {
    try {
      const carts = await this.repo.get()

      return carts
    } catch (error) {
      console.log(error)
    }
  }

  async getUserCart(userId) {
    try {
      const cart = await this.repo.getUserCart(userId)
      return !cart
        ? { success: false, message: 'Cart not found' }
        : { success: true, message: 'Cart found', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching a user cart',
        error: error.message,
      }
    }
  }

  async newCart(userId) {
    try {
      const newCart = await this.repo.new(userId)

      return !newCart
        ? { success: false, message: 'Cart not created' }
        : { success: true, message: 'Cart created', cart: newCart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while creating a cart',
        error: error.message,
      }
    }
  }

  async getCartById(cId) {
    try {
      const cart = await this.repo.getById(cId)

      return !cart
        ? { success: false, message: 'Cart not found' }
        : { success: true, message: 'Cart found', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching a cart',
        error: error.message,
      }
    }
  }

  async addProductToCart(cId, pId) {
    try {
      const cart = await this.repo.addToCart(cId, pId)
      return !cart
        ? { success: false, message: 'Product not added to cart' }
        : { success: true, message: 'Product added to cart', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while adding a product to cart',
        error: error.message,
      }
    }
  }

  async updateProductQuantity(cId, pId, quantity) {
    try {
      const cart = await this.repo.updateProductQuantity(cId, pId, quantity)
      return !cart
        ? { success: false, message: 'Product not found in cart' }
        : { success: true, message: 'Product quantity updated', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating product quantity',
        error: error.message,
      }
    }
  }

  async deleteProductFromCart(cId, pId) {
    try {
      const cart = await this.repo.deleteProductFromCart(cId, pId)
      return !cart
        ? { success: false, message: 'Product not found in cart' }
        : { success: true, message: 'Product deleted from cart', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while deleting a product from cart',
        error: error.message,
      }
    }
  }

  async emptyCart(cId) {
    try {
      const cart = await this.repo.emptyCart(cId)
      return !cart
        ? { success: false, message: 'Cart not found' }
        : { success: true, message: 'Cart emptied', cart }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while emptying a cart',
        error: error.message,
      }
    }
  }

  async newTicket(ticketData) {
    try {
      const ticket = await this.repo.newTicket(ticketData)
      return ticket
    } catch (error) {
      console.log(error)
    }
  }
}
