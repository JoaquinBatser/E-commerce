import { productModel } from '../../models/products.model.js'
import mongoose from 'mongoose'
export default class ProductsManager {
  constructor(repo) {
    this.repo = repo
  }
  async getProducts(filter) {
    try {
      filter.options.lean = true
      const products = await this.repo.get(filter)
      return { success: true, message: 'Products found', products }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching products',
        error: error.message,
      }
    }
  }

  async getProductById(id) {
    try {
      const product = await this.repo.getById(id)

      return !product
        ? { success: false, message: 'Product not found' }
        : { success: true, message: 'Product found', product }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while fetching a product',
        error: error.message,
      }
    }
  }

  async addProduct(product) {
    try {
      const newProduct = await this.repo.add(product)
      return { success: true, message: 'Product added', product: newProduct }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while adding the product',
        error: error.message,
      }
    }
  }

  async updateProduct(id, productUpdate) {
    try {
      const product = await this.repo.update(id, productUpdate)
      return { success: true, message: 'Product updated', product }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while updating the product',
        error: error.message,
      }
    }
  }

  async deleteProduct(id) {
    try {
      const product = await this.repo.delete(id)
      console.log('servoce', product)
      return !product
        ? { success: false, message: 'Product not found' }
        : { success: true, message: 'Product deleted' }
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while deleting a product',
        error: error.message,
      }
    }
  }
}
