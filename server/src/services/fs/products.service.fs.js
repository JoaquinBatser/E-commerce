import fs from 'fs/promises'

const FILE_PATH = './src/json/products.json'

class ProductManager {
  constructor() {
    this.path = FILE_PATH
  }
  async getProducts() {
    try {
      const fileContent = await fs.readFile(this.path, 'utf-8')
      const parsedProducts = JSON.parse(fileContent)
      return parsedProducts
    } catch (error) {
      console.error('Error parsing products:', error)
      return []
    }
  }

  async addProduct(newProduct) {
    try {
      const products = await this.getProducts()
      if (products.some(product => product.code === newProduct.code)) {
        throw new Error(`Products with code ${newProduct.code} already exists`)
      }

      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.category ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
      ) {
        throw new Error(
          'Every product must have a title, description, price, thumbnail, code, category and stock'
        )
      }

      const lastProduct = products[products.length - 1]
      const newId = lastProduct ? lastProduct.id + 1 : 1

      newProduct.id = newId

      products.push(newProduct)

      await this.saveProducts(products)

      return { message: 'Product added successfully', newProduct, success: true }
    } catch (error) {
      return { message: error, success: false }
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const products = await this.getProducts()
      const parsedId = parseInt(id)
      const productIndex = products.findIndex(product => product.id === parsedId)
      if (productIndex === -1) {
        throw new Error('Product not found')
      }
      const updatedProductWithId = { id: parsedId, ...updatedProduct }
      products[productIndex] = updatedProductWithId

      await this.saveProducts(products)
    } catch (error) {
      console.log(error)
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2))
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts()
      const parsedId = parseInt(id)
      const productById = products.find(product => product.id === parsedId)
      if (productById) {
        return productById
      } else {
        throw new Error('Product not found')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts()
      const productIndex = products.findIndex(product => product.id === id)
      if (productIndex !== -1) {
        products.splice(productIndex, 1)
        await this.saveProducts(products)
        return { message: 'Product deleted successfully', success: true }
      } else {
        return { message: 'Product not found', success: false }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProductManager
